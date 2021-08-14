/**
 * 
 * Services related to Metrics records
 * -- Modify component for connecting backend services to the application
 */

//Default metric names
import defaultMetricNames from "../Settings/defaultMetricNames";

//Sample Metrics
import sampleMetrics from "../Settings/sampleMetrics";

//Services
import * as timeService from './timeService';


/**
*   Constant variables
*   (to avoid mistakes using variables)
*/
const KEYS = {
    metrics:'metric',
    metricId:'metricId',
    metricNames:'metricNames',
    metricNameId:'metricNameId',
}


/**
 * 
 * Metrics Backend CRUD Operations
 * (using Local Storage)
 */


//Fetch All
export function getAllMetrics(){
    
    //Create new metrics local storage object if not exist
    if ( localStorage.getItem(KEYS.metrics ) == null){
        let generatedMetrics = sampleMetrics();
        localStorage.setItem(KEYS.metrics, JSON.stringify(generatedMetrics));
        localStorage.setItem(KEYS.metricId, generatedMetrics.length.toString() );
    }

    return JSON.parse(localStorage.getItem(KEYS.metrics))
}



//Fetch Metrics By Name
export function getMetricsByName(metricToShow){

    if (metricToShow !== null && metricToShow.id !== null && parseInt(metricToShow.id) !== 999){
        return getAllMetrics().filter(x => x.metricName.id===metricToShow.id);
    }else{
        return getAllMetrics();
    }
}




//Fetch Datapoints by Name & Interval
export function getDataPointsByNameAndTimeframe(metricToShow, selectedInterval){

    let metrics = getMetricsByName(metricToShow);

    //If metricName is set
    if(metricToShow !== null && metricToShow.id !== null && parseInt(metricToShow.id) !== 999){
        return {noSets:0, metricSets:getAveragedDataPoints(metrics, selectedInterval)};  
    }else{
        // All metricNames called

        //Get metricNames in record
        const metricNames = getAllMetricNamesFrmRecords();
        
        const averagedAllMetrics = {noSets:0, metricSets:[]};
        averagedAllMetrics.noSets = metricNames.length;

        metricNames.forEach((metricName) => {
            let tempMetrics = getMetricsByName(metricName);
            averagedAllMetrics.metricSets.push( getAveragedDataPoints(tempMetrics, selectedInterval) )
        })

        return averagedAllMetrics;
    }
}

function getAveragedDataPoints(metrics, selectedInterval){
    if(selectedInterval.interval === 0){
        return metrics.map(item=>({x:timeService.toDateTime(item.timestamp), y:parseInt(item.metricValue) }));
    }else{
        return createAveragedDataPoints(metrics, selectedInterval);
    } 
}

function createAveragedDataPoints(metrics, selectedInterval){
    //Grouped Array
    let interval = selectedInterval.interval*1000;
    let groupedDataPoints = [];
    let p=metrics.map(item=>({x:parseInt(item.timestamp), y:parseInt(item.metricValue)}));

    for (let i=p[0].x;  i < p[p.length-1].x;  i+=interval){
        let arr = p.filter((d) => ((i+interval) > d.x && d.x >= i));

        if (arr.length>0){
            let timestampMedian = i+interval/2;
            groupedDataPoints.push({x:timestampMedian, y:arr});   
        }
    }

    //dataPoints array from grouped array
    let averagedDataPoints = [];

    groupedDataPoints.forEach((arr)=> {
        let total = 0;
        arr.y.forEach( (a)=>{
            total += a.y
        });

        averagedDataPoints.push({x:timeService.toDateTime(arr.x), y:(total/arr.y.length) })
    });

    return averagedDataPoints;
}




//Generate new id to insert records
export function generateMetricId(){
    let id = parseInt(localStorage.getItem(KEYS.metricId));
    localStorage.setItem(KEYS.metricId, (++id).toString())
    return id;
}

//Insert
export function insertMetric(data){
    let metrics = getAllMetrics();
    data['id'] = generateMetricId(); //New Id
    data['timestamp'] = timeService.toTimeStamp( data['timestamp'] ); //Convert datetime to timestamp
    metrics.push(data);
    localStorage.setItem(KEYS.metrics, JSON.stringify(metrics))
}


//Update
export function updateMetrics(data){
    let metrics = getAllMetrics();

    //Find index for the record relavant to the record to update
    let recordIndex = metrics.findIndex(x => x.id === data.id);

    //update record
    metrics[recordIndex] = { ...data}

    localStorage.setItem(KEYS.metrics, JSON.stringify(metrics)); 
}


//Delete
export function deleteMetric(id){
    let metrics = getAllMetrics();

    // Filter all metrics except having the id to delete
    metrics = metrics.filter(x => x.id !== id); 

    localStorage.setItem(KEYS.metrics, JSON.stringify(metrics));
}


/**
 * 
 * Metric Names Backend CRUD Operations
 * (using Local Storage)
 */


//Get all metric names
export function getAllMetricNames(){

    //Create metric names if local storage object does not exist
    if ( localStorage.getItem(KEYS.metricNames ) == null){
        localStorage.setItem(KEYS.metricNames, JSON.stringify(defaultMetricNames));
        localStorage.setItem(KEYS.metricNameId, (defaultMetricNames.length).toString());
    }

    return (JSON.parse(localStorage.getItem(KEYS.metricNames)));
}

//Fetch Metric Names having values
export function getAllMetricNamesFrmRecords(){
    let unsorted = [...new Map( getAllMetrics().map(item => [item.metricName['id'], item.metricName]) ).values()];
    return unsorted.sort((a,b) => (a.id > b.id)?1:-1);
}

