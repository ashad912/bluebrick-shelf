/**
 * @jest-environment node
 */

import jwt from 'jsonwebtoken'
import config from '@config'
import User from '@models/user.model'
import BadRequestError from '@errors/bad-request'
import NotAuthorizedError from '@errors/not-authorized'
import userService from '@services/user.service'
import { connect, disconnect, objectId } from '@testUtils/mongoose'

beforeAll(async () => {
    await connect()
    await User.deleteMany({})
})

describe('The User service', () => {


    describe('signUp method', () => {
        

        it('should register new user and save him to db', async () => {
            const user = await userService.signUp('user1@test.com', 'useruser')

            expect(user).toBeDefined()

            const fetchedUser = await User.findOne({_id: user._id})
            expect(fetchedUser.email).toBe('user1@test.com')

        })

        it('should not register user with the same email', async () => {
            await expect(userService.signUp('user1@test.com', 'useruser'))
                .rejects
                .toEqual(new BadRequestError('Email is in use'))  
        })
    })



    describe('signIn method', () => {
        beforeAll(async () => {
            await User.deleteMany({})
            await User.create({
                email: 'user2@test.com',
                password: 'useruser'
            })
        })

        it('should add token to tokens array and save it to db', async () => {
            const { user, token } = await userService.signIn('user2@test.com', 'useruser')

            expect(user).toBeDefined()
            expect(token).toBeDefined()

            const fetchedUser = await User.findOne({_id: user._id})
            expect(fetchedUser.tokens[0].token).toBe(token) 
        })

        it('should not sign in not existing user', async () => {
            await expect(userService.signIn('notuser2@test.com', 'useruser'))
                .rejects
                .toEqual(new BadRequestError('Unable to login'))  
        })

        it('should not sign in user with invalid credentials', async () => {
            await expect(userService.signIn('user2@test.com', 'Useruser'))
                .rejects
                .toEqual(new BadRequestError('Unable to login'))  
        })
    })

    describe('getUserFromToken', () => {
        let token, createdUser
        beforeAll(async () => {
            await User.deleteMany({})
            const userId = objectId()
            token = jwt.sign({ _id: userId.toString() }, config.jwtSecret)
            createdUser = await User.create({
                _id: userId,
                email: 'user5@test.com',
                password: 'useruser', 
                tokens: [
                    {
                        token
                    }
                ]
            })  
        })

        it('should return user for valid token', async () => {
            const user = await userService.getUserFromToken(token)

            expect(user._id).toEqual(createdUser._id)
        })

        it('should not return user for invalid token', async () => {
            const invalidToken = jwt.sign({ _id: objectId().toString() }, config.jwtSecret)

            await expect(userService.getUserFromToken(invalidToken))
                .rejects
                .toEqual(new NotAuthorizedError)
        })
    })

    describe('addToSeen method', () => {

        const activities = [objectId(), objectId()]
        let createdUser
        beforeAll(async () => {
            await User.deleteMany({})
            createdUser = await User.create({
                email: 'user4@test.com',
                password: 'useruser', 
                seen: [activities[0]]
            })
        })

        it('should add activities without duplicates', async () => {
            await userService.addToSeen(createdUser, activities)

            const user = await User.findById(createdUser._id)
            
            expect(user.seen.length).toBe(2)
            expect(user.seen[0]).toEqual(activities[0])
            expect(user.seen[1]).toEqual(activities[1])
        })

    })


    describe('signOut method', () => {

        let createdUser
        beforeAll(async () => {
            await User.deleteMany({})
            createdUser = await User.create({
                email: 'user3@test.com',
                password: 'useruser', 
                tokens: [{
                    token: 'sometoken'
                }]
            })
        })

        it('should remove token from tokens array and save it to db', async () => {
            const signedInUser = await User.findOne({_id: createdUser._id})
            const user = await userService.signOut(signedInUser, 'sometoken')

            expect(user).toBeDefined()

            const fetchedUser = await User.findOne({_id: user._id})
            expect(fetchedUser.tokens.toObject()).toEqual([])       
        })
    })




})


afterAll(async () => {
    await disconnect()
})