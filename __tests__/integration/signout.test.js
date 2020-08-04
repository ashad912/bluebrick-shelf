import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import config from '@config'
import User from '@models/user.model'
import { connect, disconnect, objectId } from '@testUtils/mongoose'



const SIGNOUT_ENDPOINT = '/api/signout'

let app, createdUser, cookieToken

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
        tokens: [
            {
                token: jwt.sign({ _id: userId }, config.jwtSecret)
            }
        ]
    }).save()

    cookieToken = `token=${createdUser.tokens[0].token}`

})

describe('Signout route', () => {
    it('should sign out signed in user and return 200', async () => {

        await app()
            .post(SIGNOUT_ENDPOINT)
            .set('Cookie', [cookieToken])
            .send()
            .expect(200)
    })

    it('should return 401 status - user not signed in', async () => {

        await app()
            .post(SIGNOUT_ENDPOINT)
            .send()
            .expect(401)
    })
    
})

afterAll(async () => {
    await disconnect()
})
