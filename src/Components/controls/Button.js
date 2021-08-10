import React from 'react';
import {Button as MuiButton, makeStyles} from '@material-ui/core';

const useStyles = makeStyles( theme=>({
    root:{
        margin:theme.spacing(1),
    }
}))

export default function Button(props) {
    const {label, variant, color, size, onClick, ...other} = props;
    const classes = useStyles();
    return (
        <MuiButton 
        className={classes.root}
        variant={variant || "contained"}
        size={size || "large"}
        color={color || "primary"}
        onClick={onClick}
        {...other}
        >
            { 
                props.children ? props.children : label
                // If has inner html, show inner html, if not show label
            }
        </MuiButton>
    )
}
