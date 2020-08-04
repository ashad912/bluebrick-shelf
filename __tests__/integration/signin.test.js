import supertest from 'supertest'
import User from '@models/user.model'
import { connect, disconnect, objectId } from '@testUtils/mongoose'

const SIGNIN_ENDPOINT = '/api/signin'

let app, createdUser

beforeAll(async () => {
    // Little hack to have loaders invoked, import/export is synchronous
    const server = await require('@loaders/express').default()
    app = () => supertest(server)

    await connect()

    await User.deleteMany({})

    const userId = objectId()
    createdUser = await new User({
        _id: userId,
        email: 'integration@test.com',
        password: 'integration',
    }).save()

})

describe('Signin route', () => {
    it('should sign existing user and return 200 status with cookie token', async () => {
        const body = {
            email: 'integration@test.com',
            password: 'integration',
        }

        const res = await app()
            .post(SIGNIN_ENDPOINT)
            .send(body)
            .expect(200)

        const user = await User.findById(createdUser._id)
        expect(res.header['set-cookie'][0]).toMatch(user.tokens[0].token)

    })

    it('should return 400 status - email not found', async () => {


        const body = {
            email: 'integration123@test.com',
            password: 'integration',
        }


        await app()
            .post(SIGNIN_ENDPOINT)
            .send(body)
            .expect(400)
    })

    it('should return 400 status - incorrect password', async () => {
        const body = {
            email: 'integration@test.com',
            password: 'integration123',
        }

        await app()
            .post(SIGNIN_ENDPOINT)
            .send(body)
            .expect(400)

    })

    it('should return 422 status - invalid email', async () => {
        const body = {
            email: 'integrationtest2.com',
            password: 'integration',
        }

        const res = await app()
            .post(SIGNIN_ENDPOINT)
            .send(body)
            .expect(422)

        expect(res.body.errors[0].field).toBe('email')
    })


    it('should return 422 status - password too short', async () => {
        const body = {
            email: 'integration@test.com',
            password: 'test',
        }

        const res = await app()
            .post(SIGNIN_ENDPOINT)
            .send(body)
            .expect(422)

        expect(res.body.errors[0].field).toBe('password')


    })
})

afterAll(async () => {
    await disconnect()
})
