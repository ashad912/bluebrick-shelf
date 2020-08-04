import { Router } from 'express'
import auth from '@middleware/auth'
import activityService from '@services/activity.service';
import userService from '@services/user.service';

const router = Router()

router.get(
    '/feed',
    auth,
    async (req, res) => {

        const activities = await activityService.getFeed(req.user)
        
        await userService.addToSeen(req.user, activities)

        // Here, if server crashes or client closes the browser this feed will never can be seen...
        // But it protects from semi-concurrently fetch

        // User (rate author) info is not required to send...
        const feed = activities.map((el) => {
            return {
                createdAt: el.createdAt, // Added to show sort order easily
                bookName: el.book.name,
                imageUrl: el.book.imageUrl,
                rate: el.rate,
                review: el.review
            }
        })

        res
        .status(200)
        .send(feed)
    }
)

export default router