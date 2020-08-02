import { Router } from 'express'
import auth from '@middleware/auth'

const router = Router()

router.get('/feed', auth, async (req, res) => {
    res.send('Hello from feed')
})

export default router