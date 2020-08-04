/**
 * @jest-environment node
 */

import auth from '@middleware/auth'
import userService from '@services/user.service'
import User from '@models/user.model'


describe('Auth middleware', () => {
    const req = {
        cookies: { token: 'sometoken'}
    }

    const user = new User()
    const expectedUserId = user._id

    const spy = jest.spyOn(userService, 'getUserFromToken')
    spy.mockReturnValue(user)
    
    const next = jest.fn()
    
    it('should modify req object with user and token, and call next() once', async () => {
        
        await auth(req, jest.fn(), next)
        
        expect(next.mock.calls.length).toBe(1)
        expect(req.token).toBe('sometoken')
        expect(req.user._id).toBe(expectedUserId)
    })
})

