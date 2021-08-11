import React, {useEffect} from 'react';
import {Grid } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

//Custom reusable components
import Controls from '../Components/controls/Controls';

//Reusable Service Components
import {useForm, Form} from '../Components/serviceComponents/useForm';

//Services
import * as metricService  from '../Services/metricServices';
import * as timeService from '../Services/timeService';


//Configurations
const initialMetricValues = {
    id:0,
    metricName: metricService.getAllMetricNames()[0],
    metricValue:0,
    timestamp: new Date(),
}





//Export Functions
export default function MetricForm(props) {

    //Style Objects
    //
    //State Objects
    //


    const {addOrEdit, recordForEdit} = props; // Retrieve required parameters from passed parameters props (ref: JS destructive syntax)

    
    //Validation Method
    const validate = (fieldValues = values) => {
        let temp = {...errors} // Existing errors are not cleared upon each validation.

        if ('metricName' in fieldValues)
            temp.metricName = fieldValues.metricName!==null? "":"This field is required. Please use Add <Metric Name> to create new metric name";
        if ('metricValue' in fieldValues)
            temp.metricValue = (/[+-]?([0-9]*[.])?[0-9]+/).test(fieldValues.metricValue)? "":"Metric value is not valid";
        if ('timestamp' in fieldValues)
        temp.timestamp = (new Date(fieldValues.timestamp)).getTime() > 0 ? "":"Invalid Time Stamp";

        setErrors({
            ...temp
        })

        
        if (fieldValues === values) // true for handleSubmit()
            return Object.values(temp).every(x => x === ""); //true if all elements in array meets condition. Ref: javascript mdn for every function
    }
    


    /**
     *  Retrieved Methods
     */
    const {
        values, 
        setValues,
        handleInputChange,
        errors,
        setErrors,
    } = useForm(initialMetricValues, true, validate);



     //Handle Edit Record request
     useEffect(()=>{
        if(recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
        }, [setValues, recordForEdit])
        //Use Effect Method: call setValues method when state for recordForEdit value changed (or if setValues method changes)



    //Reset Form
    const resetForm = ()=>{
        setValues(initialMetricValues);
        setErrors({});
    }


    //Handle Form Submit
    const handleSubmit = e => {
        e.preventDefault(); // Prevent page reload by default

        if(validate())
            addOrEdit(values, resetForm);
            //metricService.insertMetric(values);
    }





    return (
       <Form onSubmit={ handleSubmit }>
           <Grid container>
               <Grid item xs={12}>
                    <Controls.Autocomplete
                    value = {values.metricName}
                    name="metricName"
                    label="Metric Name"
                    onChange={handleInputChange}
                    options={metricService.getAllMetricNames()}
                    error={errors.metricName}
                    isSolo={true}
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
                    value={timeService.toDateTime(values.timestamp)}
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
