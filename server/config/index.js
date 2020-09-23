import dotenv from 'dotenv';
import constants from '@utils/constants'

let options = {}

if (process.env.ATLAS === constants.TRUE) {
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