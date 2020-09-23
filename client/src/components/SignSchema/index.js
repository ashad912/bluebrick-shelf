import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';

import "./SignSchema.scss"

import FormikField from '../FormikField'


const SignSchemaValidation = Yup.object().shape({
    email: Yup.string()
        .min(2, "Too Short!")
        .required('Required')
        .email('Must be a valid email!'),
    password: Yup.string()
        .min(8, "Too Short!")
        .required('Required'),
})

const SignSchema = (props) => {

    const { title, submitAction, callbackAction } = props

    const authError = useSelector(state => state.auth.authError)

    const dispatch = useDispatch()


    const handleSubmit = async (values) => {
        //alert(JSON.stringify(values))
        console.log(values)

        try {
            await dispatch(submitAction(values))
            if (callbackAction) {
                callbackAction()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="SignSchema">
            <h1>{title}</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={SignSchemaValidation}
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
                                className="SubmitButton"
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

SignSchema.propTypes = {
    title: PropTypes.string.isRequired,
    submitAction: PropTypes.func.isRequired,
    callbackAction: PropTypes.func,
}

export default SignSchema