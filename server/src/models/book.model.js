import mongoose from 'mongoose'
import RatingSchema from '@schemas/rating'

const BookSchema = new mongoose.Schema({
    bookNo: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userRating: [RatingSchema]
})

export default mongoose.model('book', BookSchema)