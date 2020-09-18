import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';

import "./SignUp.css"

import FormikField from '../FormikField'

import singUp from 'components/actions'

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, "Too Short!")
        .required('Required')
        .email('Must be a valid email!'),
    password: Yup.string()
        .min(8, "Too Short!")
        .required('Required'),
})

const SignUp = () => {
    const authError = useSelector(state => state.auth.authError)

    const dispatch = useDispatch()


    const handleSubmit = (values) => {
        //alert(JSON.stringify(values))
        console.log(values)
        dispatch(singUp(values))
    }

    return (
        <div className="SignUp">
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={SignUpSchema}
            >
                {props => {
                    // <Form> === <form onSubmit={props.handleSubmit}>

                    const { dirty, isValid } = props

                    return (
                        <Form>
                            <FormikField
                                name="email"
                                label="Email"
                            />
                            <FormikField
                                name="password"
                                label="Password"
                                type="password"
                            />
                            { authError && (
                                <Paper className='ErrorPaper'>
                                    <ErrorIcon className='ErrorIcon' />
                                    <Typography>{authError}</Typography>
                                </Paper>
                            )}
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={!dirty || !isValid}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default SignUp