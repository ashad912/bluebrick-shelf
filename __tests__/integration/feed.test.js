import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import config from '@config'
import User from '@models/user.model'
import Activity from '@models/activity.model'
import Book from '@models/book.model'
import { connect, disconnect, objectId } from '@testUtils/mongoose'
import NotAuthorizedError from '@errors/not-authorized'

const FEED_ENDPOINT = '/api/feed'

let app, createdUser, createdBook, createdActivityOne, createdActivityTwo, cookieToken

beforeAll(async () => {
    // Little hack to have loaders invoked, import/export is synchronous
    const server = await require('@loaders/express').default()
    app = () => supertest(server)

    await connect()

    await User.deleteMany({})
    await Activity.deleteMany({})

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

    createdBook = await Book.create({
        bookNo: 9,
        name: 'TypeScript Handbook',
        imageUrl: '9.png',
    })

    createdActivityOne = await Activity.create({
        book: createdBook._id,
        user: objectId(),
        rate: 8,
        review: 'Very good'
    })

    createdActivityTwo = await Activity.create({
        book: createdBook._id,
        user: objectId(),
        rate: 7,
        review: 'It was ok'
    })

    cookieToken = `token=${createdUser.tokens[0].token}`

})




describe('Feed route', () => {
    it('should return 401 status without cookie attached', async () => {
        await app()
            .get(FEED_ENDPOINT)
            .send()
            .expect(401)
    })

    it('should fetch two elements feed array and add it to seen array', async () => {
        const res = await app()
            .get(FEED_ENDPOINT)
            .set('Cookie', [cookieToken])
            .send()
            .expect(200)

        expect(res.body.length).toBe(2)

        const user = await User.findById(createdUser._id)

        expect(user.seen)
    })

    it('should fetch empty array', async () => {
        const res = await app()
            .get(FEED_ENDPOINT)
            .set('Cookie', [cookieToken])
            .send()
            .expect(200)

        expect(res.body.length).toBe(0)
    })
})

afterAll(async () => {
    await disconnect()
})