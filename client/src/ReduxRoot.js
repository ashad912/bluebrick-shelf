import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' //for asynchronous things
import rootReducer from 'store/reducers'


export default ({ children, initialState = {} }) => {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}