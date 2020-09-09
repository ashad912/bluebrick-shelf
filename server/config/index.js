import dotenv from 'dotenv';

let options = {}

if (process.env.ATLAS === 'true') {
  options = { path: 'cloud.env' }
}

dotenv.config(options);

export default {
  nodeEnv: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bbshelf',
  mongoUrlTests: process.env.MONGO_URL_TESTS || 'mongodb://127.0.0.1:27017/bbshelf-test',
  jwtSecret: process.env.JWT_SECRET || 'devJwtSecret'
}