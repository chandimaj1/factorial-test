import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';


export default function Autocomplete(props) {
    
    const {name, label, value, options} = props;
    
    return (
        <MuiAutocomplete
        options={options}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => <MuiTextField {...params} name={name} label={label} variant="outlined" />}
        defaultValue={value}
        />
    )
}
