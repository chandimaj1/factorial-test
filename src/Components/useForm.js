import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core';


/**
 * 
 * Form Hooks
 */
export function useForm(initialMetricValues) {
    const [values, setValues] = useState(initialMetricValues);

    //Common function to handle all input changes
    const handleInputChange = e => {

        const {name,value} = e.target;  //Getting name and values from event target
        
        //Setting values (Updating initial values)
        setValues({
            ...values,
            [name]:value
        })
    }

    //Return the related function
    return {
        values,
        setValues,
        handleInputChange,
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
    return (
        <form className={classes.root} autoComplete="off">
            {
                props.children
                // Passed child elements via props parameter
            }
        </form>
    )
}
