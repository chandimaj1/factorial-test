// keys object is used to make sure of a constant variable used to avoid mistakes when using the values in other functions (ie, retrieve, insert, etc.)
const KEYS = {
    metrics:'metric',
    metricId:'metricId'
}

// Getting Metrics Names
export const getDefaultMetrics = ()=>([
    {title:"Metric A", value:0},
    {title:"Metric B", value:1},
    {title:"Metric C", value:2},
    {title:"Metric D", value:3},
])

// Inserting Metrics
export function insertMetric(data){
    //Get existing Metrics records
    let metrics = getAllMetrics();

    //Assigning new id for the inserting record
    data['id'] = generateMetricId();

    metrics.push(data);

    //When using local storage to store data, use of json string for the object is adviced to avoid any changes to data
    localStorage.setItem(KEYS.metrics, JSON.stringify(metrics))
}

//Updating Metrics
export function updateMetrics(data){
    let metrics = getAllMetrics(); // all current metrics records
    let recordIndex = metrics.findIndex(x => x.id === data.id); // Get index for the record relavant to the record to update
    metrics[recordIndex] = { ...data} // update data for the record
    localStorage.setItem(KEYS.metrics, JSON.stringify(metrics)); // Save updated metrics in local storage
}

//Delete metric
export function deleteMetric(id){
    let metrics = getAllMetrics();
    metrics = metrics.filter(x => x.id !== id); // Filter all metrics except having the id to delete
    localStorage.setItem(KEYS.metrics, JSON.stringify(metrics));
}

// Generate Unique id for the new metric entry
export function generateMetricId(){
    // Incrementing the current ID value to generate new ID, store back to the local storage 
    let id = parseInt(localStorage.getItem(KEYS.metricId));
    localStorage.setItem(KEYS.metricId, (++id).toString())

    return id;
}

// Retrieve all Metrics Records
export function getAllMetrics(){
    //Create new metrics local storage object if not exist
    if ( localStorage.getItem(KEYS.metrics ) == null){
        localStorage.setItem(KEYS.metrics, JSON.stringify([]));
        localStorage.setItem(KEYS.metricId,'0');
    }

    return JSON.parse(localStorage.getItem(KEYS.metrics))
}

