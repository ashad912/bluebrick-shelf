import authReducer, { initState } from 'store/reducers/auth'
import { AUTH_ERROR, SIGNOUT_SUCCESS, SIGNIN_SUCCESS, SIGNUP_SUCCESS, SINGUP_FAILED_MSSG } from 'store/actions/types'

it('handles actions of type SIGNUP_SUCCESS', () => {
    const action = {
        type: SIGNUP_SUCCESS,
        uid: 'something'
    }

    const newState = authReducer(initState, action)
    //expect(newState.uid).toEqual(action.uid)
    expect(newState.authError).toEqual(null)
})

it('handles actions of type SIGNIN_SUCCESS', () => {
    const action = {
        type: SIGNIN_SUCCESS,
        uid: 'something'
    }

    const newState = authReducer(initState, action)
    expect(newState.uid).toEqual(action.uid)
    expect(newState.authError).toEqual(null)
})

it('handles actions of type AUTH_ERROR', () => {
    const action = {
        type: AUTH_ERROR,
    }

    const newState = authReducer(initState, action)
    expect(newState.authError).toEqual(SINGUP_FAILED_MSSG)
    expect(newState.uid).toEqual(null)
})

it('handles actions of type AUTH_SUCCESS', () => {
    const action = {
        type: AUTH_SUCCESS,
        uid: 'something'
    }

    const newState = authReducer(initState, action)
    expect(newState.uid).toEqual(action.uid)
    expect(newState.authError).toEqual(null)
})

it('handles actions of type NO_AUTH', () => {
    const action = {
        type: NO_AUTH
    }

    const newState = authReducer(initState, action)
    expect(newState.uid).toEqual(null)
    expect(newState.authError).toEqual(null)
})

it('handles actions of type SIGNOUT_SUCCESS', () => {
    const action = {
        type: SIGNOUT_SUCCESS
    }

    const newState = authReducer(initState, action)
    expect(newState.uid).toEqual(null)
    expect(newState.authError).toEqual(null)
})

it('handles action with unknown type', () => {

    const newState = authReducer(initState, { type: 'dasdacozi' })

    expect(newState).toEqual(initState)

})
