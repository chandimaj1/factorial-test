/**
 * All related to data table for Metrics records
 */

import React, { useState } from 'react';
import { makeStyles, TableBody, TableCell, TableRow, Paper, Grid } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import { EditOutlined } from '@material-ui/icons';

//Custom Reusable Components
import Controls from '../Components/controls/Controls';
import Popup from '../Components/Popup';
import Notification from '../Components/Notification';

//Section Components
import MetricForm from '../Sections/MetricForm';

//Reusable Service Components
import { useTable } from '../Components/serviceComponents/useTable';

//Services
import * as metricService from '../Services/metricServices';



//Styles
const useStyles = makeStyles( theme=> ({
    container:{
        padding:theme.spacing(1),
        margin:theme.spacing(3)
    },

    BtnAddMetric:{
        float:'right',
        marginBottom: theme.spacing(1)
    }
}))



//Configurations
const headCells = [
    {id:'metricName', label:'Metric Name'},
    {id:'metricValue', label:'Metric Value'},
    {id:'timestamp', label:'Timestamp'},
    {id:'actions', label:'Actions'},
]


//Export Functions
export default function MetricsTable() {

    //Styles Object
    const classes = useStyles();

    //State Objects
    const [records, setRecords] = useState( metricService.getAllMetrics() );
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})



    /**
     *  Retrieved Methods
     */
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging,

    } = useTable(records, headCells);



    /**
     *  Component Methods
     */
    
    
    // Add or Edit employee functions
    const addOrEdit = (metric, resetForm) =>{

        if (metric.id === 0){
            metric.timestamp = new Date(); // new timestamp
            metricService.insertMetric(metric); // save
        }else{
            metricService.updateMetrics(metric); // update
        }

        resetForm(); // reset form
        setRecordForEdit(null); // reset record for edit
        setOpenPopup(false); // Close popup
        setRecords(metricService.getAllMetrics()); // Get updated results

        //Show Notification
        setNotify({
            isOpen:true,
            message:'Metric saved successfully',
            type:'success'
        })
    }




    //Edit item (in popup)
    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }



    //Delete item
    const onDelete = id => {
        if( window.confirm('Are you sure to delete this record?') ){
            metricService.deleteMetric(id);
            setRecords(metricService.getAllMetrics());

            setNotify({
                isOpen:true,
                message:'Metric deleted successfully',
                type:'error'
            })
        }
    }




    return (
        <>
        <Paper className={classes.container}>
            <Grid container>
                <Grid item xs={6}>
                    
                </Grid>
                <Grid item xs={6}>
                    <Controls.Button 
                        className={classes.BtnAddMetric}
                        onClick={() => {
                                        setRecordForEdit(null); // To clear if edit record clicked and closed 
                                        setOpenPopup(true);
                                        }}
                    >
                        <AddCircleOutlineIcon style={{marginRight:'5px'}}/>
                        Add Metric
                    </Controls.Button>
                </Grid>
            </Grid>
            <TblContainer className={classes.table}>
                <TblHead> </TblHead>
                <TableBody>
                    {
                        // Populate table rows based on records
                        recordsAfterPaging().map(item =>(
                            <TableRow key={item.id}>
                                <TableCell>{item.metricName.title}</TableCell>
                                <TableCell>{item.metricValue}</TableCell>
                                <TableCell>{item.timestamp}</TableCell>
                                <TableCell>
                                    <Controls.Button 
                                        color="primary"
                                        size="small"
                                        onClick={() => {openInPopup(item)}}
                                    >
                                        <EditOutlined fontSize="small" />
                                    </Controls.Button>
                                    <Controls.Button 
                                        color="secondary"
                                        size="small"
                                        onClick={()=>onDelete(item.id)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </Controls.Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer> 
            <TblPagination/>
        </Paper>

        <Popup 
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title="Insert New Metric"
        >
            <MetricForm 
                addOrEdit = {addOrEdit}
                recordForEdit = {recordForEdit}
            />
        </Popup>
        <Notification
            notify={notify}
            setNotify={setNotify}
        />
        </>
    )
}
