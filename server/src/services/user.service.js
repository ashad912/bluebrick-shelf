import jwt from 'jsonwebtoken'
import config from '@config'
import User from '@models/user.model'
import NotAuthorizedError from '@errors/not-authorized'
import BadRequestError from '@errors/bad-request'

const signUp = async (email, password) => {

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new BadRequestError('Email is in use')
    }

    const user = await User.create({
        email,
        password
    })

    return user
}

const signIn = async (email, password) => {

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken()

    return { user, token }
}

const getUserFromToken = async (token) => {
    const decoded = jwt.verify(token, config.jwtSecret)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) {
        throw new NotAuthorizedError()
    }

    return user
}

const addToSeen = async (user, activities) => {
    // $addToSet ensures that there are no duplicate items added
    await User.updateOne({
        _id: user._id
    }, {
        $addToSet: {
            seen: { $each: activities }
        }
    })
}

const signOut = async (user, token) => {

    user.tokens = user.tokens.filter(el => {
        return el.token !== token;
    });
    await user.save();

    return user
}

export default {
    signUp,
    signIn,
    getUserFromToken,
    addToSeen,
    signOut,
}