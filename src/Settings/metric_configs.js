/*
 * Configurations on Sections/Metrics
 */

//Table head cells
const headCells = [
    {id:'metricName', label:'Metric Name'},
    {id:'metricValue', label:'Metric Value'},
    {id:'timestamp', label:'Timestamp'},
    {id:'actions', label:'Actions'},
]

//Timing Filters
// interval in seconds
const filterIntervals = [
    {id:0, title:'Show All', interval:0},
    {id:1, title:'per Day', interval:86400},
    {id:2, title:'per Hour', interval:3600}, 
    {id:3, title:'per Minute', interval:60}, 
]


//Default Chart plot values
const plotRecords = {
    chartTitle: "",
    yAxisTitle: "",

    valueFormatString:"DD/hh:mm",
    yValueFormatString: "#,###",
    xValueFormatString: "mm",

    dataPoints:[]
}

const metric_configs = {headCells, filterIntervals, plotRecords}
export default metric_configs;