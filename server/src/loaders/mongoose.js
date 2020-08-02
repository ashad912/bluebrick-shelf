import mongoose from 'mongoose';
import config from '@config'

export default async () => {
    mongoose.Promise = global.Promise;

    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }


    await mongoose.connect(config.mongoURL, options);
    console.log('DB connected')

};