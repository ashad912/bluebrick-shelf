import Activity from '@models/activity.model'

const createActivity = async (bookId, rateObject) => {
    const activity = await Activity.create({
        book: bookId,
        ...rateObject
    })

    return activity._id
}

const getFeed = async (user) => {
    return (
        await Activity.find({
            _id: { $not: { $in: user.seen } },
            user: { $ne: user._id },
            createdAt: { $gte: user.createdAt } // Activities after specific user registration date
        }, {
            _id: 1,
            book: 1,
            rate: 1,
            review: 1,
            createdAt: 1
        })
        .sort({ createdAt: -1 })
        .populate({
            path: 'book',
            select: 'name imageUrl'
        })
    )
}

const deleteAll = async () => {
    await Activity.deleteMany({})
}

export default {
    getFeed,
    createActivity,
    deleteAll
}