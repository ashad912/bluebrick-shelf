import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import config from '@config'
import User from '@models/user.model'
import Activity from '@models/activity.model'
import Book from '@models/book.model'
import { connect, disconnect, objectId } from '@testUtils/mongoose'


const RATE_ENDPOINT = '/api/rate'

let app, createdUser, createdBook, createdActivityOne, createdActivityTwo, cookieToken

beforeAll(async () => {
    // Little hack to have loaders invoked, import/export is synchronous
    const server = await require('@loaders/express').default()
    app = () => supertest(server)

    await connect()

    await User.deleteMany({})
    await Activity.deleteMany({})
    await Book.deleteMany({})

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
        bookNo: 1,
        name: 'TypeScript Handbook',
        imageUrl: '9.png',
    })


    cookieToken = `token=${createdUser.tokens[0].token}`

})

describe('Rate route', () => {

    const createdUserReview = 'Amazing position'

    it('should return 401 status without cookie attached', async () => {
        await app()
            .post(RATE_ENDPOINT)
            .send()
            .expect(401)
    })

    it('should create rate and activity properly', async () => {

        const body = {
            bookNo: createdBook.bookNo,
            rate: 8,
            review: createdUserReview,
            strangeAdditionalField: 'field'
        }

        await app()
            .post(RATE_ENDPOINT)
            .set('Cookie', [cookieToken])
            .send(body)
            .expect(200)

        const book = await Book.findOne({ bookNo: createdBook.bookNo })

        expect(book.userRating.length).toBe(1)
        expect(book.userRating[0].rate).toBe(body.rate)
        expect(book.userRating[0].review).toBe(body.review)

        const activities = await Activity.find({})

        expect(activities.length).toBe(1)
        expect(activities[0].user).toEqual(createdUser._id)
        expect(activities[0].book).toEqual(book._id)
        expect(activities[0].rate).toBe(body.rate)
        expect(activities[0].review).toBe(body.review)
    })

    it('should modify only rate and create activity', async () => {

        const body = {
            bookNo: createdBook.bookNo,
            rate: 10,
        }

        await app()
            .post(RATE_ENDPOINT)
            .set('Cookie', [cookieToken])
            .send(body)
            .expect(200)

        const book = await Book.findOne({ bookNo: createdBook.bookNo })

        expect(book.userRating.length).toBe(1)
        expect(book.userRating[0].rate).toBe(body.rate)
        expect(book.userRating[0].review).toBe(createdUserReview)

        const activities = await Activity.find({})

        expect(activities.length).toBe(2)
        expect(activities[1].user).toEqual(createdUser._id)
        expect(activities[1].book).toEqual(book._id)
        expect(activities[1].rate).toBe(body.rate)
        expect(activities[1].review).toBeNull()
    })

    const validationTest = async (body) => {
        const res = await app()
            .post(RATE_ENDPOINT)
            .set('Cookie', [cookieToken])
            .send(body)
            .expect(422)

        expect(res.body.errors[0].field).toBe('bookNo')
        expect(res.body.errors[1].field).toBe('rate')

        return res
    }

    it('should return 422 validation - no body', async () => {
        await validationTest()
    })

    it('should return 422 validation - wrong type', async () => {

        const body = {
            bookNo: `${createdBook.bookNo}`,
            rate: "8",
            review: 31231321
        }

        const res = await validationTest(body)
        expect(res.body.errors[2].field).toBe('review')
    })

    it('should return 422 validation - numbers out of range', async () => {

        const body = {
            bookNo: 11,
            rate: -1,
        }

        await validationTest(body)
    })
})

afterAll(async () => {
    await disconnect()
})