/**
 * API settings
 * 
 */

let content_type_json = new Headers().append("Content-Type", "application/json");
let content_body = JSON.stringify({});

//API Host
const api_host = 'http://localhost:3000';

//API End points
const apiEndPoints = {

    api_host: api_host,

    /**
     * Metric Names related endpoints
     */

    //GET all metric names and including metrics
    metric_names:api_host + '/api/v1/metric_names',

    //GET all metric names without including metrics
    metric_names_list: api_host + '/api/v1/metric_names_list',

    //GET non empty metric names
    non_empty_metric_names:api_host + '/api/v1/non_empty_metric_names',


    //GET singe metric name (including child metrics)  by Id
    //pass id with the url at the end (/api/v2/metric_names/1)
    single_metric_name:api_host + '/api/v1/metric_names/',

    //GET specific metric name without including metrics  by Id
    //pass id with the url at the end (/api/v2/metric_names/1)
    metric_names_by_id:{
        url: api_host + '/api/v2/metric_names/',
        requestOptions: {
            method: 'GET',
            redirect: 'follow'
        }
    },

    //GET all metrics with parent metric name information
    metrics_list: api_host+'/api/v2/metrics_list/',

    //GET all metrics for specific parent metric name (requires: id parameter)
    metrics_for_metric_name: api_host+'/api/v2/metrics_for_metric_name',

    //metrics_for_metric_name

    //POST new metric name
    new_metric_name:{
        url: api_host + '/api/v2/metric_names/',
        requestOptions: {
            method: 'POST',
            headers: content_type_json,
            body: content_body,
            redirect: 'follow'
        }
    },


    //Insert new metric
    insert_new_metric: api_host + '/api/v2/metrics',

    //Update metric expects the metric id at the end and json { value: }
    update_metric: api_host + '/api/v2/metrics/',

    //Delete Metric expects the metric id at the end
    delete_metric: api_host + '/api/v2/metrics/'



}

export default apiEndPoints;