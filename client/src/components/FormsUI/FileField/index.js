import React from 'react'
import { TextField } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
const TextfieldWrapper = ({
    name,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const handleChange = event => {
        console.log(event.target.value)
        console.log("chwcking")
        const val = event.target.files;
        const { value } = event.currentTarget.files[0];
        console.log(value);
        window.alert(value);
        setFieldValue(name, value);
    };
    const [field, meta] = useField(name);

    const configTextField = {
        ...field,
        ...otherProps,
        // type: 'file',
        fullWidth: true,
        variant: 'outlined',
        onchange: handleChange
    };

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <TextField type={"file"} {...configTextField} />
    )
}

export default TextfieldWrapper;