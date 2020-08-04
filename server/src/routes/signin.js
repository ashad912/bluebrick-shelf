import { Router } from 'express'
import { body } from 'express-validator';
import validateRequest from '@middleware/validate-request'
import userService from '@services/user.service';

const router = Router()

router.post(
    '/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 7 })
            .withMessage('Password must have at least 7 characters')
    ],
    validateRequest,
    async (req, res) => {
        const { user, token } = await userService.signIn(req.body.email, req.body.password)

        res
        .cookie(
            "token",
            token,
            {
                maxAge: 2592000000,
                httpOnly: true
            }
        )
        .status(200)
        .send({
            data: {
                user,
                token
            },
            message: 'You are signed in'
        })
    }
)


export default router