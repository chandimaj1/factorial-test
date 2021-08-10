/**
 * 
 * Services related to Metrics records
 * -- Modify component for connecting backend services to the application
 */

/**
*   Constant variables
*   (to avoid mistakes using variables)
*/
const KEYS = {
    metrics:'metric',
    metricId:'metricId'
}



//Get metrics names
export const getDefaultMetrics = ()=>([
    {title:"Metric A", value:0},
    {title:"Metric B", value:1},
    {title:"Metric C", value:2},
    {title:"Metric D", value:3},
])



/**
 * 
 * Metrics Backend CRUD Operations
 * (using Local Storage)
 */


//Fetch All
export function getAllMetrics(){
    
    //Create new metrics local storage object if not exist
    if ( localStorage.getItem(KEYS.metrics ) == null){
        localStorage.setItem(KEYS.metrics, JSON.stringify([]));
        localStorage.setItem(KEYS.metricId,'0');
    }

    return JSON.parse(localStorage.getItem(KEYS.metrics))
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
    data['id'] = generateMetricId();
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

