import { Router } from 'express'
import { body, matchedData } from 'express-validator';
import auth from '@middleware/auth'
import validateRequest from '@middleware/validate-request'
import bookService from '@services/book.service';
import activityService from '@services/activity.service';

const router = Router()

router.post(
    '/rate',
    auth,
    [
        body('bookNo')
            .isInt({ min: 1, max: 5 })
            .custom(value => {
                if(typeof value != 'number'){
                    return false
                }
                return true
            })
            .withMessage('Book number must be integer between 1 and 5'),
        body('rate')
            .isInt({ min: 1, max: 10 })
            .custom(value => {
                if(typeof value != 'number'){
                    return false
                }
                return true
            })
            .withMessage('Rate must be integer between 1 and 10'),
        body('review')
            .isLength({ max: 200 })
            .custom(value => {
                if(value && typeof value != 'string'){
                    return false
                }
                return true
            })
            .optional()
            .withMessage('Review must be string up to 200 characters long'),
    ],
    validateRequest,
    async (req, res) => {


        const body = req.body
        const bookNo = body.bookNo

        // express-validator does not provide this functionality conveniently
        // Clear additional keys
        for(const field in body){
            if(!['rate', 'review'].includes(field)){
                delete body[field]
            }
        }

        // Prepare rate object like the schema
        /*
            {
                user: string,
                rate: number,
                review: string
            }
        */

        const rateObject = {
            user: req.user._id,
            ...body
        }

        // Rates are pernamently saved in db. It is not neccessary for activities system.
        const book = await bookService.addRate(bookNo, rateObject)

        await activityService.createActivity(book._id, rateObject) 

        res
        .status(200)
        .send({
            message: 'Rate added'
        })
    }
)


export default router