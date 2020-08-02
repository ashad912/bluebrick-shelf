import mongoose from 'mongoose'
import config from '@config'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

//mongo connection in setup file is not preferred due to integration tests application

const connect = () => mongoose.connect(config.mongoURLTests, options)

const disconnect = () => mongoose.connection.close()

export default {
    connect,
    disconnect
}