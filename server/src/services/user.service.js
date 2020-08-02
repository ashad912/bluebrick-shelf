import jwt from 'jsonwebtoken'
import config from '@config'
import User from '@models/user.model'
import NotAuthorizedError from '@errors/not-authorized'

const getUserFromToken = async (token) => {
        const decoded = jwt.verify(token, config.jwtSecret)   
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token}) //finding proper user with proper token
        if(!user) {
            throw NotAuthorizedError()
        }

        return user
}

const signUp = () => {}

const signIn = () => {}

const signOut = () => {}

const rate = () => {}

export default {
    getUserFromToken,
    signUp,
    signIn,
    signOut,
    rate
}