import React from 'react'
import { Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import './FormikField.scss'

import TextField from '@material-ui/core/TextField';




const FormikField = props => {
    const { name, label, type = 'text', required = false } = props
    // as={TextField} takes all props passed to Field, and uses as key-value pairs
    return (
        <div className="FormikField">
            <Field
                color="secondary"
                autoComplete="off"
                name={name}
                as={TextField}
                label={label}
                type={type}
                fullWidth
                helperText={<ErrorMessage name={name} />}
                required={required}
            />
        </div>
    )
}

FormikField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool
}

export default FormikField