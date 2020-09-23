import React from 'react'
import { useHistory } from 'react-router-dom'

import { signUp as signUpAction } from 'store/actions'
import SignSchema from './SignSchema'

const SignUp = () => {
    const history = useHistory()

    return (
        <SignSchema
            title="Sign Up"
            submitAction={signUpAction}
            callbackAction={() => {
                history.push('/signin')
            }}
        />
    )
}

export default SignUp