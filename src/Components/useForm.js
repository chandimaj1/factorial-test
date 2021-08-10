import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core';

/**
 * form related fucntions
 * 
 * initialFormValues - values to take upon form initiation
 * validateOnChange - (true/false) for forms that needs validation on change
 * 
 */
export function useForm(initialFormValues, validateOnChange=false, validate) {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({}); // For error handling (Validation)

    //Common function to handle all input changes
    const handleInputChange = e => {

        const {name,value} = e.target;  //Getting name and values from event target
        
        //Setting values (Updating initial values)
        setValues({
            ...values,
            [name]:value
        });

        if(validateOnChange)
            validate({[name]:value})
    }

    //Return the related function
    return {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
    }
}



/**
 * 
 * Form
 */

//Form Related styles
const useStyles = makeStyles(theme =>({
    root:{

        //Form root
        padding: theme.spacing(2),

        //Form Title
        '& .MuiTypography-root ':{
            padding: theme.spacing(1)
        },

        //Form Text fields
        '& .MuiFormControl-root':{
            margin:theme.spacing(1),
            width:'90%'
        }

    }
}));

export function Form(props) {
    const classes = useStyles();
    const {children, ...other} = props; //Seperator operator for other props to be used seperately (ie, onSubmit event)
    return (
        <form className={classes.root} autoComplete="off" { ...other}>
            {
                children
                // Passed child elements via props parameter
            }
        </form>
    )
}
