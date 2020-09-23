import React from 'react'
import { signIn as signInAction } from 'store/actions'
import SignSchema from './SignSchema'

const SignIn = () => {
    return (
        <SignSchema
            title="Sign In"
            submitAction={signInAction}
        //callbackAction={() => history.push('/')}
        />
    )
}

export default SignIn