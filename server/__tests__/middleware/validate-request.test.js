/**
 * @jest-environment node
 */

jest.mock('express-validator')

import { validationResult } from 'express-validator'
import validateRequest from '@middleware/validate-request'
import RequestValidationError from '@errors/request-validation'

describe('Validate request middleware', () => {

    describe('when there is no validation errors', () => {

        it('should call next function', () => {

            validationResult.mockReturnValue(
                {
                    isEmpty() {
                        return true
                    }
                }
            )

            const next = jest.fn()

            validateRequest(jest.fn(), jest.fn(), next)

            expect(next.mock.calls.length).toBe(1)
        })
    })

    describe('when there is some validation errors', () => {

        it('should throw RequestValidationError', () => {

            validationResult.mockReturnValue(
                {
                    isEmpty() {
                        return false
                    },
                    array() {
                        return this
                    }
                }
            )

            expect(() => { validateRequest(jest.fn(), jest.fn(), jest.fn()) }).toThrow(RequestValidationError)
        })
    })
})