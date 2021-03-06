import CustomError from '@errors/custom-error';
import config from '@config'

export default (err, req, res, next) => {

  if (config.nodeEnv === 'dev') {
    console.log(err)
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err.name === 'MongooseServerSelectionError' || err.name === 'MongoError') {
    return res.status(500).send({ errors: [{ message: 'Internal server error' }] })
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};