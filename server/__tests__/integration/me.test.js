import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import config from '@config'
import User from '@models/user.model'

import { connect, disconnect, objectId } from '@testUtils/mongoose'

const ME_ENDPOINT = '/api/me'

let app, createdUser, cookieToken

beforeAll(async () => {
    // Little hack to have loaders invoked, import/export is synchronous
    const server = await require('@loaders/express').default()
    app = () => supertest(server)

    await connect()

    await User.deleteMany({})

    const userId = objectId()
    createdUser = await User.create({
        _id: userId,
        email: 'integration@test.com',
        password: 'integration',
        tokens: [
            {
                token: jwt.sign({ _id: userId }, config.jwtSecret)
            }
        ]
    })

    cookieToken = `token=${createdUser.tokens[0].token}`

})




describe('Feed route', () => {
    it('should return 401 status if cookie not attached', async () => {
        await app()
            .get(ME_ENDPOINT)
            .send()
            .expect(401)
    })

    it('should return 200 if cookie attached', async () => {
        await app()
            .get(ME_ENDPOINT)
            .set('Cookie', [cookieToken])
            .send()
            .expect(200)

    })

})

afterAll(async () => {
    await disconnect()
})