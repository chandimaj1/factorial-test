/**
 * 
 * Notification custom react component
 *  by chandimaj@icloud.com
 * params: 
 * notify{
 *  isOpen: bool,
 *  type: ref: Alert severity
 *  message: string, ref: message to show
 * }
 * 
 * setNotify: set state method for notify
 * 
 */

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react'

export default function Notification(props) {

    const {notify, setNotify} = props;


    //Close Notification
    const handleClose = (event, reason) =>{

        //Avoid close on clickings outside notification
        if (reason==='clickaway') 
            return;

        setNotify({
            ...notify,
            isOpen: false,
        })
    }

    return (
       <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{vertical:'top', horizontal:'right'}}
        onClose={handleClose}
       >
           <Alert
                onClose={handleClose}
                severity={notify.type}
            >
            {notify.message}
           </Alert>
       </Snackbar>
    )
}
