import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {useForm, Form} from '../Components/useForm';
import { useEffect } from 'react';

// all custom form Control components
import Controls from '../Components/controls/Controls';

// Services related to metrics
import * as metricService  from '../Services/metricServices';

//timestamp from datetime object
const toTimestamp = (dateTime) => {
    return Date.parse(dateTime)/1000;
}

// Object containing initial metric values
const initalMetricValues = {
    id:0,
    metricName:metricService.getDefaultMetrics()[0],
    metricValue:0,
    timestamp:new Date(),
}

export default function MetricForm(props) {

    const {addOrEdit, recordForEdit} = props; 

    //Validations
    const validate = (fieldValues = values) => {
        let temp = {...errors} // Existing errors are not cleared upon each validation.
        if ('metricName' in fieldValues) // If only the property name exists in field values, validation for the particular property name is called.
            temp.metricName = fieldValues.metricName!==null? "":"This field is required. Please use Add <Metric Name> to create new metric name"; //Field values are used instead of values is because it takes some time (asynchronous) to update values, so delay may occur
        if ('metricValue' in fieldValues)
            temp.metricValue = (/[+-]?([0-9]*[.])?[0-9]+/).test(fieldValues.metricValue)? "":"Metric value is not valid";
        if ('timestamp' in fieldValues)
        temp.timestamp = (new Date(fieldValues.timestamp)).getTime() > 0 ? "":"Invalid Time Stamp";

        setErrors({
            ...temp
        })

        //Return an object with true or false values based on the condition for every element in an array. Ref: javascript mdn for every function
        if (fieldValues === values) // Only return when handleSubmit is called
            return Object.values(temp).every(x => x === "");
    }
    
    //Get the relavent functions from useForm custom hook component
    const {
        values, 
        setValues,
        handleInputChange,
        errors,
        setErrors,
    } = useForm(initalMetricValues, true, validate);

    //Form resets
    const resetForm = ()=>{
        initalMetricValues.timestamp = new Date();
        setValues(initalMetricValues);
        setErrors({});
    }

    //Handle form submit
    const handleSubmit = e => {
        e.preventDefault(); // Prevent page reload by default
        
        if(validate())
            addOrEdit(values, resetForm);
            //metricService.insertMetric(values);
    }

    // Edit function to call when record for edit value changed
    useEffect(()=>{
        if(recordForEdit !== null)
            setValues({
                ...recordForEdit
            })

    }, [recordForEdit])


    return (
       <Form onSubmit={ handleSubmit }>
           <Grid container>
               <Grid item xs={12}>
                    <Controls.Autocomplete
                    value = {values.metricName}
                    name="metricName"
                    label="Metric Name"
                    onChange={handleInputChange}
                    options={metricService.getDefaultMetrics()}
                    error={errors.metricName}
                    />
               </Grid>
               <Grid item xs={12}>
                    <Controls.Input 
                    label="Metric Value"
                    name="metricValue"
                    value={values.metricValue}
                    onChange={handleInputChange}
                    error={errors.metricValue}
                   />
               </Grid>
               <Grid item xs={12}>
                    <Controls.Input 
                    label="Timestamp"
                    name="timestamp"
                    disabled
                    value={values.timestamp}
                    onChange={handleInputChange}
                    error={errors.timestamp}
                   />
               </Grid>
               <Grid item>
                    <Controls.Button
                    type="submit"
                    >
                        <CheckCircleIcon style={{marginRight:'4px'}} />
                       Save
                   </Controls.Button>
                   <Controls.Button
                    type="reset"
                    color="default"
                    onClick={resetForm}
                    >
                        <CancelIcon style={{marginRight:'4px'}} />
                       Reset
                   </Controls.Button>
               </Grid>
           </Grid>
        </Form>
    )
}
