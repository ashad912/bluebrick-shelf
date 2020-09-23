import React from 'react'
import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './FormikSelect.scss'

const FormikFormControl = (props) => {

    const { label, children, value, name, onChange, onBlur, errorString, required } = props
    return (
        <FormControl fullWidth>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
            >
                {children}
            </Select>
            <FormHelperText>{errorString}</FormHelperText>
        </FormControl>
    )
}

FormikFormControl.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
        PropTypes.element.isRequired
    ),
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    errorString: PropTypes.element,
    required: PropTypes.bool.isRequired,
}

const FormikSelect = (props) => {

    const { name, label, items, required = false } = props
    return (
        <div className="FormikSelect">
            <Field
                name={name}
                as={FormikFormControl}
                label={label}
                errorString={<ErrorMessage name={name} />}
                required={required}
            >
                {items.map((item, index) =>
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                )}
            </Field>
        </div>
    )
}

FormikSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })
    ).isRequired,
    required: PropTypes.bool
}

export default FormikSelect