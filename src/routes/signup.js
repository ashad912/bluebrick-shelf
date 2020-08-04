import { Router } from 'express'
import { body } from 'express-validator';
import validateRequest from '@middleware/validate-request'
import userService from '@services/user.service';

const router = Router()

router.post(
    '/signup',
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
        const user = await userService.signUp(req.body.email, req.body.password)

        res
        .status(201)
        .send({
            data: {
                user
            },
            message: 'Account registered'
        })
    }
)


export default router