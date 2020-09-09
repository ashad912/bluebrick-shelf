/**
 * @jest-environment node
 */

import errors from '@errors'

describe('Invoking abstract CustomError', () => {

    it('should throw TypeError with specific message', () => {
        expect(() => { new errors.CustomError() }).toThrow(new TypeError('Abstract class cannot be instantiated'))
    })
})


describe("Invoking BadRequestError with message 'Bad request'", () => {
    const err = new errors.BadRequestError('Bad request')

    it('should return message output and 400 status code', () => {
        expect(err.serializeErrors()).toEqual([{ message: 'Bad request' }])
        expect(err.statusCode).toBe(400)
    })
})

describe('Invoking NotAuthorizedError', () => {
    const err = new errors.NotAuthorizedError()

    it("should return 'Not authorized' output and 401 status code", () => {
        expect(err.serializeErrors()).toEqual([{ message: 'Not authorized' }])
        expect(err.statusCode).toBe(401)
    })
})

describe('Invoking NotFoundError', () => {
    const err = new errors.NotFoundError()

    it("should return 'Not found' output and 404 status code", () => {
        expect(err.serializeErrors()).toEqual([{ message: 'Not found' }])
        expect(err.statusCode).toBe(404)
    })
})

describe('Invoking RequestValidationError with two-element array (email and password field)', () => {
    const errArray = [
        {
            msg: 'Email is not valid',
            param: 'email'
        },
        {
            msg: 'Password is too short',
            param: 'password'
        }
    ]

    const err = new errors.RequestValidationError(errArray)

    it("should return expected array output and 400 status code", () => {
        expect(err.serializeErrors()).toEqual([
            {
                message: 'Email is not valid',
                field: 'email'
            },
            {
                message: 'Password is too short',
                field: 'password'
            }
        ])
        expect(err.statusCode).toBe(422)
    })
})