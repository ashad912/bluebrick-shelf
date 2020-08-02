import mongoose from 'mongoose'
import RatingSchema from '@schemas/rating'

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    userRating: [RatingSchema]
})

export default mongoose.model('book', BookSchema)