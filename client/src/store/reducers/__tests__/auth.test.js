import authReducer, { initState } from 'store/reducers/auth'
import {
    AUTH_ERROR,
    SIGNOUT_SUCCESS,
    SIGNIN_SUCCESS,
    AUTH_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED_MSSG,
    SIGNIN_FAILED_MSSG,
    NO_AUTH
} from 'store/actions/types'

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

it('handles actions of type AUTH_ERROR with SIGNUP_FAILED_MSSG', () => {
    const action = {
        type: AUTH_ERROR,
        error: SIGNUP_FAILED_MSSG
    }

    const newState = authReducer(initState, action)
    expect(newState.authError).toEqual(SIGNUP_FAILED_MSSG)
    expect(newState.uid).toEqual(null)
})

it('handles actions of type AUTH_ERROR with SIGNIN_FAILED_MSSG', () => {
    const action = {
        type: AUTH_ERROR,
        error: SIGNIN_FAILED_MSSG
    }

    const newState = authReducer(initState, action)
    expect(newState.authError).toEqual(SIGNIN_FAILED_MSSG)
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
