/**
 * Sample Metrics Generator
 * 
 */
import defaultMetricNames from "./defaultMetricNames";
const defaultMetrics = defaultMetricNames;


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

const sampleDataset = [];

export default function sampleMetrics(){
    
    const currentTimestamp = toTimeStamp( new Date() );

    for (let i=0; i<250; i++ ){
        let randomMetricNameId = randomNumber(0,4,1);
        sampleDataset.push({
            id:i,
            metricName: defaultMetrics.find( x=>x.id===randomMetricNameId),
            metricValue: Math.floor(Math.random() * 25 + 1),
            //Current timestamp - 7 Days(10080 miniutes) + random minutes from 0 to 10080(7 Days)
            timestamp: currentTimestamp - (10080 + randomNumber(1,10080,20)) * 60 * 1000,
            
        })
    }


    //return Ordered based on timeline
    return sampleDataset.sort((a,b) => (a.timestamp>b.timestamp)?1:-1);
}
 