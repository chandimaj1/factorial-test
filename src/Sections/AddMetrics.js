import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {useForm, Form} from '../Components/useForm';

// all custom form Control components
import Controls from '../Components/controls/Controls';

// Services related to metrics
import * as metricService  from '../Services/metricServices';

// Object containing initial metric values
const initalMetricValues = {
    id:0,
    metricName:metricService.getDefaultMetrics()[0],
    metricValue:0,
    timestamp: new Date(),
}

export default function AddMetrics() {
    
    //Get the relavent functions from useForm custom hook component
    const {
        values, 
        setValues,
        handleInputChange 
    } = useForm(initalMetricValues);

    return (
       <Form>
           <Grid container>
               <Grid item>
                   <Typography
                    variant="h6"
                   >
                       Insert New Metric
                    </Typography>
               </Grid>
               <Grid item xs></Grid>
               <Grid item>
                   <Button size="large">
                        Close
                       <CancelIcon style={{marginLeft:'4px'}} />
                   </Button>
               </Grid>
           </Grid>

           <Grid container>
               <Grid item xs={12}>
                    <Controls.Autocomplete
                    value = {values.metricName}
                    name="metricName"
                    label="Metric Name"
                    onChange={handleInputChange}
                    options={metricService.getDefaultMetrics()}
                    />
               </Grid>
               <Grid item xs={12}>
                    <Controls.Input 
                    label="Metric Value"
                    name="metricValue"
                    value={values.metricValue}
                    onChange={handleInputChange}
                   />
               </Grid>
               <Grid item>
                    <Controls.Button>
                        <CheckCircleIcon style={{marginRight:'4px'}} />
                       Save
                   </Controls.Button>
                   <Button size="large">
                        <CancelIcon style={{marginRight:'4px'}} />
                        Cancel
                   </Button>
               </Grid>
           </Grid>
        </Form>
    )
}
