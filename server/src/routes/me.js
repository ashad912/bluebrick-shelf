import { Router } from 'express'
import auth from '@middleware/auth'

const router = Router()

router.get(
    '/me',
    auth,
    async (req, res) => {
        res
            .status(200)
            .send(req.user)
    }
)

export default router