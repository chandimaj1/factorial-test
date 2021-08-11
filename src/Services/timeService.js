
//timestamp from datetime object
export function toTimeStamp(dateTime){
    return Date.parse(dateTime);
}

//Date Time from Timestamp
export function toDateTime(timestamp){
    return new Date(parseInt(timestamp));
}
