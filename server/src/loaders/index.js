import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async () => {
    await mongooseLoader()
    return expressLoader()
}