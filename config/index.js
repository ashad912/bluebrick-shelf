import dotenv from 'dotenv';

const envFound = dotenv.config();

if (!process.env.COMPOSE && envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
    nodeEnv: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 4000,
    mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bbshelf',
    mongoUrlTests: process.env.MONGO_URL_TESTS || 'mongodb://127.0.0.1:27017/bbshelf-test',
    jwtSecret: process.env.JWT_SECRET || 'devJwtSecret'
}