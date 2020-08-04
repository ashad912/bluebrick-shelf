import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async () => {
    await mongooseLoader()
    console.log('DB connected')
    
    const app = expressLoader()
    console.log('Express loaded')

    return app
}