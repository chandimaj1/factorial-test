import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';


export default function Autocomplete(props) {
    
    const {name, label, value, options, onChange, error=null, isSolo} = props;
    
    /*
    * Preformatting the passed values for the onChange event (default event parameters) in the expected format (ie, name:value)
    * format which is accepted at the handleInputChange method 
    */
    const formatDefEventPara = (name,option)=>({
        target:{
            name:name, value:option
        }
    });
    
    return (
        <MuiAutocomplete
        name={name}
        value={value}
        options={options}
        getOptionLabel={(option) => option.title}
        defaultValue={{title:"Select Metric", value:999}}
        renderInput={
            (params) => <MuiTextField 
                            {...params}  
                            label={label} 
                            variant="outlined"
                            
                            {
                                // If error is passed, set error and helperText parameters
                                ...(error && {error:true, helperText:error})
                            }
                            />
            }
        freeSolo={isSolo}
        onChange={(e,T)=>onChange( formatDefEventPara(name, T) )}
        />
    )
}
