import React,{useState, useEffect} from 'react';
import { Button, Grid,makeStyles,TextField, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const initalMetricValue = {
    id:0,
    name:'',
    value:''
}

const useStyles = makeStyles(theme =>({
    textFields:{
        margin:theme.spacing(1),
        width:'90%'
    },

    popupTitle:{
        padding: theme.spacing(1)
    },

    form:{
        padding: theme.spacing(2),
    }

}));

export default function AddMetrics() {

    const classes = useStyles();

    const [values, setValues] = useState(initalMetricValue);


    return (
       <form className={classes.form}>
           <Grid container>
               <Grid item>
                   <Typography
                    variant="h6"
                    className={classes.popupTitle}
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
                   <TextField
                    variant="outlined"
                    label="Metric Name"
                    value={values.name}
                    className={classes.textFields}
                   />
               </Grid>
               <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    label="Metric Value"
                    value={values.value}
                    className={classes.textFields}
                   />
               </Grid>
               <Grid item>
                   <Button size="large">
                        <CheckCircleIcon style={{marginRight:'4px'}} />
                       Save
                   </Button>
                   <Button size="large">
                        <CancelIcon style={{marginRight:'4px'}} />
                        Cancel
                   </Button>
               </Grid>
           </Grid>

       </form>
    )
}
