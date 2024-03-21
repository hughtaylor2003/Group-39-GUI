import React from "react";
import { Text, View, StyleSheet} from "@react-pdf/renderer";
import dayjs from 'dayjs'
import * as isBetween from 'dayjs/plugin/isBetween';
import * as customParseFormat  from 'dayjs/plugin/customParseFormat';
import PDFHourlyBlock from "./PDFHourlyBlock";
dayjs.extend(isBetween);
dayjs.extend(customParseFormat )

//display the weather data for the day hourly

const styles = StyleSheet.create({
    //main container with the hourly cells styling
    DailyParent:{
        display:'flex',
        flexDirection: 'row',
        flexFlow: 'row wrap',
        overflow: 'hidden',
        alignItems:'center',
        },
    //wrapper container of the whole breakdown styling
    OuterParent:{
        backgroundColor: '#F9F9F9',
        borderStyle: 'solid',
        borderColor: '#333333',
        borderRadius: '30%',
        borderWidth: '2',
        justifyContent: 'center',
        height:210,
        marginHorizontal: 5,
        marginVertical: 0,
        marginTop:10,

    },
    /*Title styling*/
    Title:{
        fontFamily: 'Roboto',
        textAlign: 'center'
    }
});

const PDFDailyBreakdown = ({hrdata, Index, getWeatherIcon}) => {
    //get hour in format HH:mm
    function getHour(date) {
        return dayjs(date).format("HH:mm");
    }
 
    const start = Index * 24
    const end = start + 24
    const hrArr = []
    let iconTime = 'd'
    const dayTime = dayjs('6:00', 'HH:mm');
    const nightTime = dayjs('17:00', 'HH:mm');

    for(let j = start; j<end; j++) {
        // Check if the hour is between 6:00 and 18:00
        if (dayjs(getHour(hrdata.hourly.time[j]), 'HH:mm').isBetween(dayTime, nightTime, null, '[]')) {
            iconTime = 'd'; // Set to daytime if between 6:00 and 18:00
        } else {
            iconTime = 'n'; // Otherwise, it's nighttime
        }
        hrArr.push(
            <PDFHourlyBlock 
            hour={getHour(hrdata.hourly.time[j])}
            icon={getWeatherIcon(hrdata.hourly.weather_code[j]) + iconTime} 
            summary={Math.round(hrdata.hourly.temperature_2m[j])}
            ></PDFHourlyBlock>
            
        )
    }

    //display the right weekly day and date
    const WEEK_DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayInAWeek = new Date().getDay();
    const forecastDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const currDate = date + ' ' + months[month];
    
    /*forecast.js with react-PDF elements*/ 
  return (
    <>
    <View style={styles.OuterParent}>
        <Text style={styles.Title}>Hourly Forecast for {Index == 0 ? 'Today' : forecastDay[Index] + ' ' + currDate}</Text>
        <View style={styles.DailyParent}>
            {/*arr*/}
            {hrArr}
        </View>
    </View>
    </>
  )
};

export default PDFDailyBreakdown;