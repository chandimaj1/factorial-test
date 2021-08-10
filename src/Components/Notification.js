import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react'

export default function Notification(props) {

    const {notify, setNotify} = props;

    const handleClose = (event, reason) =>{

        // don't close on focus out
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
