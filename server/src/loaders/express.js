import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import path from "path";
import cors from "cors";

import config from '@config'
import constants from '@utils/constants'


import feedRouter from '@routes/feed'
import meRouter from '@routes/me'
import rateRouter from '@routes/rate'
import signInRouter from '@routes/signin'
import signOutRouter from '@routes/signout'
import signUpRouter from '@routes/signup'

import NotFoundError from '@errors/not-found'
import errorHandler from '@middleware/error-handler'

const CLIENT_BUILD_PATH = path.join(__dirname, "../../../client/build")

export default (() => {
    const app = express()

    app.use(json())
    app.use(cookieParser())

    if (config.nodeEnv === constants.PRODUCTION) {
        app.use(express.static(CLIENT_BUILD_PATH))
        app.use(cors());
    }

    app.use('/api', feedRouter)
    app.use('/api', meRouter)
    app.use('/api', rateRouter)
    app.use('/api', signInRouter)
    app.use('/api', signOutRouter)
    app.use('/api', signUpRouter)

    app.all('*', async () => {
        throw new NotFoundError()
    })

    app.use(errorHandler)


    return app
})