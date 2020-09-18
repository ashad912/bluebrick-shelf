import { SIGNUP_SUCCESS, SIGNUP_ERROR, AUTH_SUCCESS, NO_AUTH } from 'store/actions'

export const initState = {
    uid: null,
    authError: null
}

export const SINGUP_FAILED_MSSG = 'Signup failed'

export default (state = initState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                uid: action.uid
            }
        }
        case SIGNUP_ERROR: {
            return {
                ...state,
                authError: SINGUP_FAILED_MSSG
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
    }
}