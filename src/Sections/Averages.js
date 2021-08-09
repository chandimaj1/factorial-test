import React from 'react';
import { makeStyles, Typography, Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
//import CountUp from 'react-countup';


const useStyles =  makeStyles(theme =>({
    averages:{
        position:'relative',
        width:'100%',
        left:'0',
        height:'250px',
        backgroundColor:'#cceeff',
        zIndex:'-1',
        padding:theme.spacing(2),
        '& .MuiPaper-root ':{
            margin:theme.spacing(1),
            paddingBottom:theme.spacing(2),
        }
    },

    metricTitle:{
        textAlign:'center',
        padding:'16px',
        color:theme.pr,
        fontSize: '1.2em'
    },

    counter:{
        textAlign:'center',
    }
}));
  

export default function Averages() {

    const classes = useStyles();

    return (
        <div className={classes.averages}>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" className={classes.metricTitle}>
                        Metric
                    </Typography>
                </Grid>
                <Grid item xs={4} md={3}>
                    <Paper>
                        <Typography variant="h6" className={classes.metricTitle}>
                            Avg. / Minute
                        </Typography>
                        <Typography variant="h3" className={classes.counter}>
                            00
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} md={3}>
                    <Paper>
                        <Typography variant="h6" className={classes.metricTitle}>
                            Avg. / Hour
                        </Typography>
                        <Typography variant="h3" className={classes.counter}>
                            00
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} md={3}>
                    <Paper>
                        <Typography variant="h6" className={classes.metricTitle}>
                            Avg. / Day
                        </Typography>
                        <Typography variant="h3" className={classes.counter}>
                            00
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
