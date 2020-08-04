/**
 * @jest-environment node
 */
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '@config'
import User from '@models/user.model'
import BadRequestError from '@errors/bad-request'
import { connect, disconnect } from '@testUtils/mongoose'

beforeAll(async () => {
    await connect()
    await User.deleteMany()
})

describe('The User model', () => {

    const user = {
        email: 'user@test.com',
        password: 'useruser'
    }

    let createdUser

    beforeAll(async () => {
        createdUser = await User.create(user)
    })

    describe('toJSON method', () => {
        it('should return user without email, password, tokens, seen and __v fields', async () => {
            const user = (await User.findById(createdUser._id)).toJSON()

            expect(user.email).not.toBeDefined()
            expect(user.password).not.toBeDefined()
            expect(user.tokens).not.toBeDefined()
            expect(user.seen).not.toBeDefined()
            expect(user.__v).not.toBeDefined()
        })
    })

    describe('generateAuthToken method', () => {

        let token

        beforeAll(async () => {
            token = await createdUser.generateAuthToken()
        })

        it('should generate a valid jwt for the user', () => {
            const { _id } = jwt.verify(token, config.jwtSecret)
            expect(_id).toEqual(createdUser._id.toString())
        })

        it('should add token to user tokens array', async () => {
            const user = await User.findOne({ _id: createdUser._id, 'tokens.token': token })
            expect(user._id).toEqual(createdUser._id)
        })
    })

    describe('findByCredentials static', () => {
        it('should find the user', async () => {

            const fetchedUser = await User.findByCredentials(user.email, user.password)

            expect(createdUser._id).toEqual(fetchedUser._id)
        })

        it('should not find the user', async () => {

            await expect(User.findByCredentials('notuser@test.com', user.password))
                .rejects
                .toEqual(new BadRequestError('Unable to login'))

            await expect(User.findByCredentials(user.email, 'Useruser'))
                .rejects
                .toEqual(new BadRequestError('Unable to login'))
        })
    })

    describe('pre save hook', () => {

        it('should hash the user password before saving to the db', async () => {

            expect(bcrypt.compareSync(user.password, createdUser.password)).toBe(true)

        })
    })

})

afterAll(async () => {
    await disconnect()
})