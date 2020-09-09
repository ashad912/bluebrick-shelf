import mongoose from 'mongoose'

export default new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
        validate(value) {
            if (!Number.isInteger(value)) {
                throw Error(`${value} is not an integer value!`)
            }
        },
    },
    review: {
        type: String,
        default: null
    }
})