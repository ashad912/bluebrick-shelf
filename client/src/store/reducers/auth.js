import { SIGNUP_SUCCESS, AUTH_ERROR, SIGNIN_SUCCESS, AUTH_SUCCESS, NO_AUTH, SIGNOUT_SUCCESS } from 'store/actions/types'

export const initState = {
    uid: null,
    authError: null
}

export const SIGNUP_FAILED_MSSG = 'Sign up failed'
export const SIGNIN_FAILED_MSSG = 'Sign in failed'

export default (state = initState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                authError: null
            }
        }
        case SIGNIN_SUCCESS: {
            return {
                ...state,
                uid: action.uid,
                authError: null
            }
        }
        case AUTH_ERROR: {
            return {
                ...state,
                authError: action.error
            }
        }
        case AUTH_SUCCESS: {
            return {
                ...state,
                uid: action.uid
            }
        }
        case NO_AUTH: {
            return { ...initState }
        }
        case SIGNOUT_SUCCESS: {
            return { ...initState }
        }
        default:
            return state
    }
}