import React from "react";
import { Text, View,Font, StyleSheet, Image} from "@react-pdf/renderer";
import DailyBlock from "../forecast/DailyBlock";

const styles = StyleSheet.create({
    /* Styling the box containing the days */
    Block:{ 
        textAlign: 'center',
        display: 'inline-block', 
        width: '15vw', 
        marginTop: 20,
        height: '15vw',
        backgroundColor: '#333333', 
        fontSize: '2vw',
        borderTopLeftRadius: '30%',
        borderTopRightRadius: '30%',
        borderBottomRightRadius: '30%',
        borderBottomLeftRadius: '30%',
        marginRight: 10, 
        marginBottom: 10,
        padding: 10,
    },

    /*Inner parent styling */
    InnerParent:{
        display: 'flex',
        height: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },

    /*Icon and temperature placement styling */
    IconAndTemp:{
        display: 'flex',
        justifyContent: 'center',
    },

    /*Icon styling */
    icon:{
        width: '50%'
    }

})

const PDFDailyBlock = ({day,icon, summary}) => {
    return (
    <View style={styles.Block}>
        <View style={styles.InnerParrent}>
            <Text>{day}</Text>
        <View style={styles.IconAndTemp}> 
            <Image alt="icon" style={styles.icon} src={process.env.PUBLIC_URL + `/icons/${icon}.png`} onError = {DailyBlock.handleImageError}/>
            <Text>{summary}°C</Text>
        </View>
        </View>
    </View>

    )
}

export default PDFDailyBlock;