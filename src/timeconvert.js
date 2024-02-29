function unixTimestampTo12Hour(unixTimestamp) {
    let date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let timeOfDay = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + timeOfDay;
    return formattedTime;
}
