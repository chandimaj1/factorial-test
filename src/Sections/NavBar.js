/**
 *  App Navigation bar section ()
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { Grid } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';


//Styles
const useStyles = makeStyles(theme =>({
    menuButton:{
        flexDirection:'right'
    },

    title:{
        display:'inline-block'
    },

    addButton:{
        backgroundColor:'#fff',
        color:'#0cf'
    },

    addButtonText:{
        marginLeft:theme.spacing(1)
    },

    githubButton:{
        backgroundColor:'#ccc',
        marginLeft:theme.spacing(2),
        color:'#666'
    },
    
    githubIcon:{
        marginRight:theme.spacing(1)
    },

    appBar:{
        backgroundColor:'#fff'
    }
}));


//Export Functions
export default function NavBar() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Grid container>
                    <Grid item>
                        <IconButton edge="start" className={classes.menuButton} color="inherit">
                            <AssessmentIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Metrics App - Factorial Test
                        </Typography>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <Button 
                        className={classes.githubButton}
                        onClick={()=> window.open("https://github.com/chandimaj1/factorial-test", "_blank")}
                        >
                            <GitHubIcon className={classes.githubIcon} />
                            Project Repo
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
