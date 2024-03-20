import React from "react";
import { Text, View, StyleSheet, Image, Font} from "@react-pdf/renderer";
import PDFDailyBlock from "./PDFDailyBlock";

const styles = StyleSheet.create({
    /*margins*/
    DaysBox:{
        marginHorizontal: 20,
        marginVertical: 0,
    },

    /*display the days in one row*/
    InnerDaysBox:{
        display:'flex',
        flexDirection: 'row',
    }
    
}) 

/*forecast.js but for pdf use -> display the simple information about temperature and weather condition for each day */
const PDFDays =({data}) => {

    function unixTimestampToDay(timestamp) {
        const milliseconds = timestamp * 1000;
        const date = new Date(milliseconds);
        const dayOfWeek = date.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayOfWeek];
    }

    /*get 7 days of data from the array and display 7 PDFDailyBlock's */
    const arr = data.daily.slice(0, 7).map((dailyData, i) => (
        <PDFDailyBlock 
            key={i} // Use i as the key
            day={unixTimestampToDay(dailyData.dt)}
            icon={dailyData.weather[0].icon.toString()} 
            summary={Math.round(dailyData.temp['day'])}
        />
    ));

    /*Display the daily blocks array */
    return (
        <>
        <View style={styles.DaysBox}>
            <View style={styles.InnerDaysBox}>
            {arr}
            </View>
            </View>
        </>
    );
}

export default PDFDays;