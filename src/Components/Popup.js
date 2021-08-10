import { Dialog as MuiDialog, DialogContent, DialogTitle, Typography, Grid, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';

export default function Popup(props) {

    const {title, children, openPopup, setOpenPopup} = props;
    
    return (
        <MuiDialog open={openPopup} >
            <DialogTitle>
                <Grid container>
                    <Grid item>
                        <Typography
                            variant="h6"
                        >
                            {title}
                            </Typography>
                    </Grid>
                    <Grid item xs></Grid>
                    <Grid item>
                        <Button 
                            size="large"
                            onClick={()=>setOpenPopup(false)}
                        >
                                Close
                            <CancelIcon style={{marginLeft:'4px'}} />
                        </Button>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </MuiDialog>
    )
}
