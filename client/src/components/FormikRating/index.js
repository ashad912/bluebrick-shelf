import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import Rating from '@material-ui/lab/Rating';


const FormikRating = (props) => {


    const { name } = props
    return (
        <div>
            <Field
                name={name}
                as={Rating}
                defaultValue={2.5}
                precision={0.5}
            />
        </div>
    )
}

FormikRating.propTypes = {
    name: PropTypes.string.isRequired,
}

export default FormikRating