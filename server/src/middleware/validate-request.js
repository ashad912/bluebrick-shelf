import { validationResult } from 'express-validator';
import RequestValidationError from '@errors/request-validation';

export default (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array({ onlyFirstError: true }));
    }

    next();
}