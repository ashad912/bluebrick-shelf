import { Router } from 'express'
import auth from "@middleware/auth"
import NotFoundError from '../errors/not-found'
import User from '@models/user.model'

const router = Router()

router.post('/signup', async (req, res, next) => {
    await User.find({})
    throw new NotFoundError()
    res.send('Hi there!')
})

export default router