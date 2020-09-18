import axios from 'axios'
import {
    FETCH_ACTIVITIES,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR, NO_AUTH
} from './types'

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
            dispatch({ type: SIGNUP_SUCCESS, uid: res.data._id })

        } catch (e) {
            dispatch({ type: SIGNUP_ERROR })
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
        }
    }
}