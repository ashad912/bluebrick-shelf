import { Router } from 'express'
import auth from '@middleware/auth'
import userService from '@services/user.service';

const router = Router()

router.post(
    '/signout',
    auth,
    async (req, res) => {
        const user = await userService.signOut(req.user, req.token)

        res
        .clearCookie("token")
        .status(200)
        .send({
            data: {
                user
            }, 
            message: 'You are signed out'   
        })
    }
)
    

export default router