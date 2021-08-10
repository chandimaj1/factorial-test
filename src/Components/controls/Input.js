import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const {name, label, value, onChange, error=null, ...other} = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {
                //If error is passed, set paramers error and helper text
                ...(error && {error:true, helperText:error})
            }
        />
    )
}
