/**
 * Sample Metrics Generator
 * 
 */


//timestamp from datetime object
function toTimeStamp(dateTime){
    return Date.parse(dateTime);
}

function randomNumber(min, max, inc) {
    min = min || 0;
    inc = inc || 1;
    if(!max) { return new Error('need to define a max');}

    return Math.floor(Math.random() * (max - min) / inc) * inc + min;
}

 const defaultMetrics = [
    {id:0, title:"Metric A"},
    {id:1, title:"Metric B"},
    {id:2, title:"Metric C"},
    {id:3, title:"Metric D"},
]

const sampleDataset = [];

/*
[
    {
        "id": 3, "metricName": {"id": 0,"title": "Metric A"}, "metricValue": "5", "timestamp": 1628657733112
    }
]
*/

export default function sampleMetrics(){
    
    const currentTimestamp = toTimeStamp( new Date() );

    for (let i=0; i<50; i++ ){
        let randomMetricNameId = randomNumber(0,4,1);
        sampleDataset.push({
            id:i,
            metricName: defaultMetrics.find( x=>x.id===randomMetricNameId),
            metricValue: Math.floor(Math.random() * 25 + 1),
            timestamp: currentTimestamp - 86400000 + randomNumber(1,1440)*60000,
        })
    }

    return sampleDataset;
}
 