import React from "react";
import { Text, View, StyleSheet, Image} from "@react-pdf/renderer";

/*Display the hourly temperature and weather condition in a day*/ 

/*styling*/ 
const styles = StyleSheet.create({
    /*block border*/
    HourlyBlock:{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '20%'
    },

    /*icon styling*/
    hourlyIcon:{
        marginTop: 30,
        marginBottom: 30,
        width: '90%'
    },
    /*apply font to text */
    Text:{
        textAlign: 'center',
        fontFamily:'Roboto',
        fontSize:8
    }
});

/*the HourlyBlock.js but with react-pdf elements*/
const PDFHourlyBlock = ({hour,icon, summary}) => {
    return(
    <View style={styles.HourlyBlock}>
            <Text style={styles.Text}>{hour}</Text>
            <Image alt = "icon" style={styles.hourlyIcon} src={process.env.PUBLIC_URL + `/icons/${icon}.png`} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src=process.env.PUBLIC_URL + `/icons/unknown.png`;}}/>
            <Text style={styles.Text}>{summary}°</Text>
    </View>
    );
}

export default PDFHourlyBlock;