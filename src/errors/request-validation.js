import CustomError from './custom-error'

export default class RequestValidationError extends CustomError {

    statusCode = 422;

    constructor(errors) {
        super('Invalid request parameters')
        this.errors = errors

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(error => {
            return {
                message: error.msg,
                field: error.param
            }
        });
    }

}