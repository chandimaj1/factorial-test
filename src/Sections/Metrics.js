/**
 *  Metrics Section
 */

import React, { useState, useEffect } from 'react';
import { makeStyles, TableBody, TableCell, TableRow, Paper, Grid, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { EditOutlined } from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Moment from 'react-moment';

//Custom Reusable Components
import Controls from '../Components/controls/Controls';
import Popup from '../Components/Popup';
import Notification from '../Components/Notification';

//Section Components
import MetricForm from './MetricForm';

//Reusable Service Components
import { useTable } from '../Components/serviceComponents/useTable';
import SplineChart from '../Components/SplineChart';

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
    },

    smallBtn:{
        fontSize:'1em',
        padding:'2px 10px',
        position:'relative',
        float:'right'
    }
}))



//Configurations

//Table head cells
const headCells = [
    {id:'metricName', label:'Metric Name'},
    {id:'metricValue', label:'Metric Value'},
    {id:'timestamp', label:'Timestamp'},
    {id:'actions', label:'Actions'},
]

//Timing Filters
// interval in seconds
const intervalsObject = [
    {id:0, title:'Show All', interval:0},
    {id:1, title:'per Day', interval:86400},
    {id:2, title:'per Hour', interval:3600}, 
    {id:3, title:'per Minute', interval:60}, 
]


//Default Plot Values
const plotValues = {
    chartTitle: "",
    yAxisTitle: "",

    valueFormatString:"DD/hh:mm",
    yValueFormatString: "#,###",
    xValueFormatString: "mm",

    dataPoints:[]
}


//Export Functions
export default function MetricsTable() {

    //Styles Object
    const classes = useStyles();

    //State Objects
    const [records, setRecords] = useState( metricService.getAllMetrics() );
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [metricToShow, setMetricToShow] = useState({id:999, title:'Show All'});
    const [selectedInterval, setSelectedInterval] = useState(intervalsObject[1]);
    const [plotRecords, setPlotRecords] = useState(plotValues);


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


    //handle metric select
    const handleMetricChange = e=>{
            setMetricToShow(e.target.value);
            setRecords(metricService.getMetricsByName( e.target.value, selectedInterval ));
            handlePlot(e.target.value,selectedInterval);
    }

    //handle timeframe select
    const handleTimeframeChange = e=>{
        let interval = intervalsObject.find(item => item.id === e.target.value)
        setSelectedInterval( interval );
        handlePlot(metricToShow,interval);
    }

    //Handle Plot
    const handlePlot  = (metricToShow, selectedInterval) => {
        let metricSetsData = metricService.getDataPointsByNameAndTimeframe( metricToShow, selectedInterval );
        
        const dataDefinitions =  {
            yValueFormatString: plotValues.yValueFormatString,
            xValueFormatString: plotValues.xValueFormatString,
            type: "spline",
        }

        let data = [];

        if (metricSetsData.noSets===0){
            let dataPoints = metricSetsData.metricSets;
            data.push({dataPoints, ...dataDefinitions})
        }else{
            metricSetsData.metricSets.forEach((dataPoints)=>{
                data.push({dataPoints, ...dataDefinitions})
            })
        }

        setPlotRecords({
            ...plotRecords,
            dataPoints:data
        })

        setSelectedInterval(selectedInterval);
    }

    
    useEffect(()=>{
        handlePlot(metricToShow, intervalsObject[1])
        }, [records, metricToShow])
        //Use Effect Method: call setValues method when state for recordForEdit value changed (or if setValues method changes)

    return (
        <>
        <Paper className={classes.container}>
            <Grid container>
                <Grid item xs={7} md={4}>
                    <Controls.Autocomplete
                    value = {metricToShow}
                    name="selectedMetricName"
                    label="Sort by Metric"
                    onChange={handleMetricChange}
                    options={metricService.getAllMetricNamesFrmRecords()}
                    isSolo={true}
                    errors={{}}
                    />
                </Grid>
                <Grid item xs={5} md={3}>
                    <Controls.Select
                    name="timeframe"
                    label="Plot Averages"
                    value={selectedInterval.id}
                    onChange={handleTimeframeChange}
                    options={intervalsObject}
                    errors={{}}
                    />
                </Grid>
                <Grid item md />
                <Grid item xs={12} md={3}>
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

                <Grid item xs={12}>
                    <Controls.Button
                        className={classes.smallBtn}
                        color="secondary"
                        onClick={()=>{
                                localStorage.removeItem('metric');
                                localStorage.removeItem('metricId');
                                window.location.reload(false);
                        }}
                    >
                        Generate New Sample Dataset
                    </Controls.Button>
                </Grid>
            </Grid>
        </Paper>

        <Paper className={classes.container}>
             <Typography variant="h6" style={{margin:'15px', fontSize:'12pt', position:'relative'}}>
                Select data range to Zoom
            </Typography>
            <SplineChart plotRecords={plotRecords} />
        </Paper>

        <Paper className={classes.container}>
            <TblContainer className={classes.table}>
                <TblHead> </TblHead>
                <TableBody>
                    {
                        // Populate table rows based on records
                        recordsAfterPaging().map( item =>{

                            return(
                            <TableRow key={item.id}>
                                <TableCell>{item.metricName.title}</TableCell>
                                <TableCell>{item.metricValue}</TableCell>
                                <TableCell><Moment format="YYYY/MM/DD HH:mm:ss">{item.timestamp}</Moment></TableCell>
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
                        )})
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
