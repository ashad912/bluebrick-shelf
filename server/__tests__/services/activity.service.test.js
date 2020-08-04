
import { connect, disconnect, objectId } from '@testUtils/mongoose'
import Activity from '@models/activity.model'
import User from '@models/user.model'
import Book from '@models/book.model'
import activityService from '@services/activity.service'

beforeAll(async () => {
    await connect()
})

describe('The Activity service', () => {
    describe('createActivity method', () => {
        const rateObject = {
            user: objectId(),
            rate: 8,
            review: 'Very good'
        }

        it('should create new Activity with review', async () => {
            const bookId = objectId()
            const {_id} = await activityService.createActivity(bookId, rateObject)

            const activity = await Activity.findOne({ _id })

            expect(activity._id).toEqual(_id)
            expect(activity.book).toEqual(bookId)
            expect(activity.rate).toBe(rateObject.rate)
            expect(activity.review).toBe(rateObject.review)
        })

        it('should create new Activity without review', async () => {

            const newRateObject = {...rateObject}
            delete newRateObject.review
            
            const bookId = objectId()
            const {_id} = await activityService.createActivity(bookId, newRateObject)

            const activity = await Activity.findOne({ _id })

            expect(activity._id).toEqual(_id)
            expect(activity.book).toEqual(bookId)
            expect(activity.rate).toBe(newRateObject.rate)
            expect(activity.review).toBeNull()
        })
    })

    describe('getFeed method', () => {
        let createdUserOne, createdUserTwo, createdActivityOne 
        let createdActivityTwo, createdActivityThree, createdBook
        let createdActivityFourId, createdActivityFour

        beforeAll(async () => {

            await Activity.deleteMany({})
            await User.deleteMany({})
            
            createdBook = await Book.create({
                bookNo: 8,
                name: 'JavaScript Handbook',
                imageUrl: '8.png',
            })

            createdUserOne = await User.create({
                email: 'testfeed@test.com',
                password: 'testtest'
            })

        
            createdActivityOne = await Activity.create({
                book: createdBook._id,
                user: createdUserOne._id,
                rate: 7,
                review: 'Good from userOne'
            })

            
            createdActivityFourId = objectId()

            createdUserTwo = await User.create({
                email: 'testfeed2@test.com',
                password: 'testtest',
                seen: [createdActivityFourId]
            })

            createdActivityFour = await Activity.create({
                _id: createdActivityFourId,
                book: createdBook._id,
                user: createdUserOne._id,
                rate: 9,
                review: 'Excellent from userOne'
            })

            createdActivityTwo = await Activity.create({
                book: createdBook._id,
                user: createdUserTwo._id,
                rate: 8,
                review: 'Very good from userTwo'
            })

            createdActivityThree = await Activity.create({
                book: createdBook._id,
                user: createdUserTwo._id,
                rate: 8,
                review: 'Very good from userTwo'
            })

            
        })

        it('should return two populated and sorted activities (performed by another after user)', async () => {
            const activities = await activityService.getFeed(createdUserOne)

            expect(activities.length).toBe(2)
            expect(new Date(activities[0].createdAt).getMilliseconds())
                .toBeGreaterThan(new Date(activities[1].createdAt).getMilliseconds())
            expect(activities[0]._id).toEqual(createdActivityThree._id)
            expect(activities[0].book.name).toEqual(createdBook.name)
            expect(activities[0].book.imageUrl).toEqual(createdBook.imageUrl)
        })

        it('should not return any activity for user two', async () => {
            const activities = await activityService.getFeed(createdUserTwo)
            expect(activities.length).toBe(0)
        })
    })

    describe('deleteAll method', () => {
        beforeAll(async () => {
            await Activity.create({
                book: objectId(),
                user: objectId(),
                rate: 7,
                review: 'Good from userOne'
            })
        })

        it('should delete all documents from collection', async () => {
            await activityService.deleteAll()

            const activites = await Activity.find({})

            expect(activites.length).toBe(0)
        })
    })
})


afterAll(async () => {
    await disconnect()
})