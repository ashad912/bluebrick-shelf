import { combineReducers } from 'redux'
import activitiesReducer from './activities'
import authReducer from './auth'

export default combineReducers({
    activities: activitiesReducer,
    auth: authReducer
})