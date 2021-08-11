import React from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';

export default function Select(props) {
    const {name, label, value=0, options, onChange} = props;

    return (
        <FormControl variant="outlined" style={{width:'90%'}}>
        <InputLabel>{label}</InputLabel>
            <MuiSelect
            value={value}
            onChange={onChange}
            label={label}
            name={name}
            >
                {
                    options.map(item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>))
                }
            </MuiSelect>
      </FormControl>
    )
}
