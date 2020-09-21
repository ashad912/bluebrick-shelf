import axios from 'axios'
import {
    FETCH_ACTIVITIES,
    AUTH_ERROR,
    AUTH_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNIN_SUCCESS,
    NO_AUTH
} from './types'

import {
    SIGNUP_FAILED_MSSG,
    SIGNIN_FAILED_MSSG
} from 'store/reducers/auth'

axios.defaults.baseURL = '/api/'

export const fetchActivities = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/feed')
            dispatch({ type: FETCH_ACTIVITIES, feed: res.data })

        } catch (e) {
            dispatch({ type: NO_AUTH })
        }
    }
}


export const signUp = (body) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/signup', body)
            dispatch({ type: SIGNUP_SUCCESS })

        } catch (e) {
            dispatch({ type: AUTH_ERROR, error: SIGNUP_FAILED_MSSG })
            throw e
        }

    }
}

export const signIn = (body) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/signin', body)
            dispatch({ type: SIGNIN_SUCCESS, uid: res.data.user._id })

        } catch (e) {
            dispatch({ type: AUTH_ERROR, error: SIGNIN_FAILED_MSSG })
            throw e
        }

    }
}


export const authCheck = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/me')
            dispatch({ type: AUTH_SUCCESS, uid: res.data._id })

        } catch (e) {
            dispatch({ type: NO_AUTH })
            throw e
        }
    }
}