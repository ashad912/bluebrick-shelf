module.exports = {
    port: process.env.PORT || 4000,
    mongoURL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bbshelf',
    mongoURLTests: process.env.MONGO_URL_TEST || 'mongodb://127.0.0.1:27017/bbshelf-test',
    jwtSecret: process.env.JWT_SECRET || 'devJwtSecret'
}