import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '@config'
import BadRequestError from '@errors/bad-request'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Email is invalid'
        ]
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
    seen: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity',
    }]
}, { timestamps: true })


UserSchema.methods.toJSON = function () {
    const userObject = this.toObject()

    delete userObject.email
    delete userObject.password
    delete userObject.tokens
    delete userObject.seen
    delete userObject.__v

    return userObject
}


UserSchema.methods.generateAuthToken = async function () { //on instances
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret)

    user.tokens = user.tokens.concat({ token: token })

    await user.save()

    return token
}



UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new BadRequestError('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new BadRequestError('Unable to login')
    }

    return user
}


UserSchema.pre('save', async function (next) {//middleware, working with static User.create!!

    const user = this

    if (user.isModified('password')) { //mongoose method
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})

const User = new mongoose.model('user', UserSchema)

export default User 