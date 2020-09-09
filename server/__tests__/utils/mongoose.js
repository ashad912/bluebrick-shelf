import mongoose from 'mongoose'
import config from '@config'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}


export const connect = () => {
    console.log(config.mongoUrlTests)
    return mongoose.connect(config.mongoUrlTests, options)
}

export const disconnect = () => mongoose.connection.close()

export const objectId = () => new mongoose.Types.ObjectId()
