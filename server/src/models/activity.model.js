import mongoose from 'mongoose'
import RatingSchema from '@schemas/rating'

const ActivitySchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
    },
    seenBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }]
    ...RatingSchema.obj
}, { timestamps: true })


export default mongoose.model('activity', ActivitySchema)