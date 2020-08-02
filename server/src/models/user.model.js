import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

export default mongoose.model('user', UserSchema)