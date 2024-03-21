import React from "react";
import { Text, View, StyleSheet, Image} from "@react-pdf/renderer";
import DailyBlock from "../forecast/DailyBlock";



const styles = StyleSheet.create({
    /* Styling the box containing the days */
    Block:{ 
        textAlign: 'center',
        display: 'inline-block', 
        width: '17vw', 
        marginTop: 20,
        height: '17vw',
        backgroundColor: '#333333', 
        fontSize: '3vw',
        borderRadius: '30%',
        marginRight: 10, 
        marginBottom: 10,
        paddingVerical: 10,
        paddingHorizontal: 1,
        justifyContent: 'center',
        alignItems:'center',
    },

    /*Inner parent styling */
    InnerParent:{
        display: 'flex',
        height: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems:'center',
    },

    /*Icon and temperature placement styling */
    IconAndTemp:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
    },

    /*Icon styling */
    icon:{
        justifyContent:'center',
        width: '50%'
    },

    /*Text Styling*/ 
    Text:{
        paddingTop: 2,
        fontFamily:'Roboto',
        color:'white',
        textAlign:'center'
    }

})

/*DailyBlock.js but with react-pdf elements: View, Text, Image */
const PDFDailyBlock = ({day,icon, summary, unit}) => {
    return (
    <View style={styles.Block}>
        <View style={styles.InnerParrent}>
            <Text style={styles.Text}>{day}</Text>
        <View style={styles.IconAndTemp}> 
            <Image alt="icon" style={styles.icon} src={process.env.PUBLIC_URL + `/icons/${icon}.png`} onError = {DailyBlock.handleImageError}/>
            <Text style={styles.Text}>{summary}°{unit}</Text>
        </View>
        </View>
    </View>

    )
}

export default PDFDailyBlock;