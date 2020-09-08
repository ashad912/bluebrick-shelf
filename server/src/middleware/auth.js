import userService from '@services/user.service'
import NotAuthorizedError from '@errors/not-authorized'

export default async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        throw new NotAuthorizedError()
    }

    req.token = token
    req.user = await userService.getUserFromToken(token)

    next()
}