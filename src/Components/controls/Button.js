import React from 'react';
import {Button as MuiButton} from '@material-ui/core';

export default function Button(props) {
    const {label, variant, color, size, onClick} = props;

    return (
        <MuiButton 
        variant={variant || "contained"}
        size={size || "large"}
        color={color || "primary"}
        onClick={onClick}
        >
            { 
                props.children ? props.children : label
                // If has inner html, show inner html, if not show label
            }
        </MuiButton>
    )
}
