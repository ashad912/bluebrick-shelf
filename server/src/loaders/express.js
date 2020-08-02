import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import cookieParser from 'cookie-parser'

import feedRouter  from '@routes/feed'
import rateRouter from '@routes/rate'
import signInRouter from '@routes/signin'
import signOutRouter from '@routes/signout'
import signUpRouter from '@routes/signup'

import NotFoundError from '@errors/not-found'
import errorHandler from '@middleware/error-handler'

export default(() => {
    const app = express()

    app.use(json())
    app.use(cookieParser())

    app.use('/api', feedRouter)
    // app.use('/api', rateRouter)
    // app.use('/api', signInRouter)
    // app.use('/api', signOutRouter)
    app.use('/api', signUpRouter)

    app.all('*', async () => {
        throw new NotFoundError()
    })
    
    app.use(errorHandler)

    console.log('Express loaded')

    
    return app
})