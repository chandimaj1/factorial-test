/**
 * API settings
 * 
 */

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

    //GET all metrics for specific parent metric name (requires: id parameter)
    metrics_for_metric_name: api_host+'/api/v2/metrics_for_metric_name',

    //GET all metrics with parent metric name information
    metrics_list: api_host+'/api/v2/metrics_list/',

    //Insert new metric
    insert_new_metric: api_host + '/api/v2/metrics',

    //Update metric expects the metric id at the end and json { value: }
    update_metric: api_host + '/api/v2/metrics/',

    //Delete Metric expects the metric id at the end
    delete_metric: api_host + '/api/v2/metrics/'
}

export default apiEndPoints;