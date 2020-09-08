
import supertest from 'supertest'
import User from '@models/user.model'
import { connect, disconnect } from '@testUtils/mongoose'

const SIGNUP_ENDPOINT = '/api/signup'

let app

beforeAll(async () => {
    // Little hack to have loaders invoked, import/export is synchronous
    const server = await require('@loaders/express').default()
    app = () => supertest(server)

    await connect()

    await User.deleteMany({})
})

describe('Signup route', () => {
    it('should return 201 status', async () => {
        const body = {
            email: 'integration@test.com',
            password: 'integration',
        }

        await app()
            .post(SIGNUP_ENDPOINT)
            .send(body)
            .expect(201)
    })

    it('should return 400 status - email in use', async () => {
        const body = {
            email: 'integration@test.com',
            password: 'integration',
        }

        await app()
            .post(SIGNUP_ENDPOINT)
            .send(body)
            .expect(400)
    })

    it('should return 422 status - invalid email', async () => {
        const body = {
            email: 'integrationtest2.com',
            password: 'integration',
        }

        const res = await app()
            .post(SIGNUP_ENDPOINT)
            .send(body)
            .expect(422)

        expect(res.body.errors[0].field).toBe('email')
    })


    it('should return 422 status - password too short', async () => {
        const body = {
            email: 'integration2@test.com',
            password: 'test',
        }

        const res = await app()
            .post(SIGNUP_ENDPOINT)
            .send(body)
            .expect(422)

        expect(res.body.errors[0].field).toBe('password')

    })
})

afterAll(async () => {
    await disconnect()
})