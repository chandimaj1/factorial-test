/**
 * 
 *  All api and related services hook
 */
import { useState } from 'react';
import axios from "axios";

//Service methods
import * as timeService from '../../Services/timeService';

//Configurations
import apiEndPoints from '../../Settings/apiSettings';


/*
  Export Methods
*/
export function useMetricApiService(setNotify, plotRecords, setPlotRecords) {

  /**
   * State objects
   */  
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [nonEmptyMetricNamesList, setNonEmptyMetricNamesList] = useState([]);
  const [interval, setInterval] = useState({id:1, title:'per Day', interval:86400});


  //Configurations
  
  //Chart Set Definitions
  const dataDefinitions =  {
    yValueFormatString: plotRecords.yValueFormatString,
    xValueFormatString: plotRecords.xValueFormatString,
    type: "spline",
  }



  /**
   * 
   * API callers
   */


  //Get All Metrics including parent

  const getAllMetrics = () => {
    axios.get(apiEndPoints.metrics_list).then((response) => {
      const formatted_response = formatResponseForRecords(response);
      setSelectedRecords(formatted_response)
      setNotify({
        isOpen:true, 
        type:'success', 
        message:'Metrics data fetched'
      })
    }).catch((error) => {
      console.log(error);
      setNotify({
        isOpen:true, 
        type:'error', 
        message:'Error. Couldn not fetch data from server'
      })
    })
  }



  //Non-empty metric names list

  const getNonEmptyMetricNamesList = () => {
    axios.get(apiEndPoints.non_empty_metric_names).then((response) => {
      const formatted_response = response.data;
      setNotify({
        isOpen:true, 
        type:'success', 
        message:'Metrics data fetched'
      })
      setNonEmptyMetricNamesList(formatted_response);
    }).catch((error) => {
      console.log(error);
      setNotify({
        isOpen:true, 
        type:'error', 
        message:'Error. Couldn not fetch data from server'
      })
    })
  }



  //Insert new metric

  const insertNewMetric = (metric) => {
    const params = {
      metric_name_id: metric.metricName.id,
      value: metric.metricValue
    }
    //Api Call
    axios.post(apiEndPoints.insert_new_metric, params).then((response) => {
      setNotify({isOpen:true, type:'success', message:'New metric inserted'})
    }).catch((error) => {
      console.log(error);
      setNotify({isOpen:true, type:'error', message:'Error. could not insert new metric'
      })
    })
  }



  //Update metric

  const updateMetric = (metric) => {
    const params = {
      value: metric.metricValue
    }
    axios.put(apiEndPoints.update_metric + metric.id, params).then((response) => {
      setNotify({
        isOpen:true, 
        type:'success', 
        message:'Metric for id:'+metric.id+' updated'
      })
    }).catch((error) => {
      console.log(error);
      setNotify({
        isOpen:true, 
        type:'error', 
        message:'Error. could not insert new metric'
      })
    })
  }


  
  //Delete metric

  const deleteMetric = (id) => {
    axios.delete(apiEndPoints.delete_metric + id).then((response) => {
      setNotify({
        isOpen:true, 
        type:'success', 
        message:'Metric for id:'+id+' deleted'
      })
    }).catch((error) => {
      console.log(error);
      setNotify({
        isOpen:true, 
        type:'error', 
        message:'Error. could not delete metric'
      })
    })
  }



  // Update on metric name change

  const updateRecordsForMetricName = (metric_name_id) =>{

    //set end point
    let apiEndPoint = apiEndPoints.metrics_for_metric_name; //Specific metric name
    if (!metric_name_id){ //If false passed (for all or reset)
      apiEndPoint = apiEndPoints.metrics_list
    }

    const params = {
      id:metric_name_id
    }
    //Api call
    axios.get(apiEndPoint, { params: params }).then((response) => {
      const formatted_response = formatResponseForRecords(response);
      setNotify({
        isOpen:true, 
        type:'success', 
        message:'Metrics data fetched for name id:' + metric_name_id
      })
      setSelectedRecords(formatted_response)
      
      //plot chart
      const metricSetsData = {
        noSets:0, 
        metricSets:getAveragedDataPoints(formatted_response, interval)
      }
      plotChart(metricSetsData)
      
    }).catch((error) => {
      console.log(error);
      setNotify({
        isOpen:true, 
        type:'error', 
        message:'Error. Couldn not fetch data from server for id:'+metric_name_id
      })
    })
  }



  // Update on interval change

  const updateRecordsForInterval = (interval) => {
    const metricSetsData = {
      noSets:0,
      metricSets:getAveragedDataPoints(selectedRecords, interval)
    }
    plotChart(metricSetsData, interval)
  }


  


  /**
   *  Private Functions
   */


  //Format api return response
  const formatResponseForRecords = (response) => {
    return response.data.map(item => {
      const newItem = {
        id:item.id, 
        metricName:{
          id: item.metric_name.id,
          title: item.metric_name.title
        },
        metricValue: item.value,
        timestamp: item.created_at
      };

      return newItem;
    });
  }



  /**
   * Chart related methods
   */
    
  //Get Averaged Datapoints
  const getAveragedDataPoints = (records, interval) => {
    if (interval.interval === 0 || !interval){
      return records.map(item=>({
                x:timeService.toTimeStamp(item.timestamp), 
                y:parseInt(item.metricValue) 
              }));

    }else{
      //Grouping by interval
      const t = interval.interval*1000; //miliseconds
      let groupedDataPoints = [];
      let p=records.map(item=>({
          x:timeService.toTimeStamp(item.timestamp), 
          y:parseInt(item.metricValue)
        }));

      for (let i=p[0].x;  i < p[p.length-1].x;  i+=t){
          let arr = p.filter((d) => ((i+t) > d.x && d.x >= i));
          if (arr.length>0){
              let timestampMedian = i+t/2;
              groupedDataPoints.push({x:timestampMedian, y:arr});   
          }
      }

      //Averaging
      let averagedDataPoints = [];
      groupedDataPoints.forEach((arr)=> {
          let total = 0;
          
          arr.y.forEach( (a)=>{ total += a.y });

          averagedDataPoints.push({
            x:timeService.toDateTime(arr.x),
              y:(total/arr.y.length) 
          })
      });
      return averagedDataPoints;
    }
  }

  //Plot chart
  const plotChart = (metricSetsData) => {
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
      dataPoints: data
    })
  }




  /*
  * Run once on init
  */
  useState(()=>{
    getAllMetrics();
    getNonEmptyMetricNamesList();
    updateRecordsForMetricName(false);
  },[])



  return {
    interval,
    setInterval,
    selectedRecords,
    setSelectedRecords,
    getAllMetrics,
    updateRecordsForMetricName,
    updateRecordsForInterval,
    nonEmptyMetricNamesList,
    getNonEmptyMetricNamesList,
    insertNewMetric,
    updateMetric,
    deleteMetric,
  }
}




//Export function

export function useFormApiService(){
  const [metricNamesList, setMetricNamesList] = useState([]);

  //Unfiltered Metric Names List

  const updateMetricNamesList = () => {
    //api call
    axios.get(apiEndPoints.metric_names_list).then((response) => {
      const formatted_response = response.data;
      setMetricNamesList(formatted_response)
    }).catch((error) => {
      console.log(error);
    })
  }



  /*
  * Run once on init
  */
  useState(()=>{
    updateMetricNamesList();
  },[])


  return ({
    metricNamesList,
    updateMetricNamesList
  })
}
