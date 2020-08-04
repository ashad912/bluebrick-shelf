/**
 * @jest-environment node
 */

import errorHandler from '@middleware/error-handler'
import NotFoundError from '@errors/not-found'


describe('Error handler middleware', () => {

    describe('when NotFound instance is thrown', () => {

        const err = new NotFoundError()

        jest.spyOn(err, 'serializeErrors')

        const res = {
            send: jest.fn(),
            status: jest.fn(() => res) // Able chaining
        };

        it('should call serializeErrors method once and send 404 status', async () => {
            

            await errorHandler(err, jest.fn(), res, jest.fn())
            
            expect(res.status).toHaveBeenCalledWith(404)
            expect(err.serializeErrors).toHaveBeenCalledTimes(1)
        })
    })

    describe('when MongoError instance is thrown', () => {

        const err = new Error()
    
        err.name = 'MongoError'
        err.serializeErrors = jest.fn()
    
        const res = {
            send: jest.fn(),
            status: jest.fn(() => res)
        };
    
        it('should not call serializeErrors method and send 500 status', async () => {
            
            await errorHandler(err, jest.fn(), res, jest.fn())
            expect(res.status).toHaveBeenCalledWith(500)
            expect(err.serializeErrors).not.toHaveBeenCalled()
        })
    })

    describe('when other error instance is thrown', () => {

        const err = new Error()
    
        err.serializeErrors = jest.fn()
    
        const res = {
            send: jest.fn(),
            status: jest.fn(() => res)
        };
    
        it('should not call serializeErrors method and send 400 status', async () => {
            
            await errorHandler(err, jest.fn(), res, jest.fn())
            expect(res.status).toHaveBeenCalledWith(400)
            expect(err.serializeErrors).not.toHaveBeenCalled()
        })
    })
})



