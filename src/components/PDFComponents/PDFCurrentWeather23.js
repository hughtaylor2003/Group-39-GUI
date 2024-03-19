import React from "react";
import { Text, View,Font, StyleSheet, Image} from "@react-pdf/renderer";
Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
  });

const styles = StyleSheet.create({
    
    Weather: {
        width: '40 vw',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        //color: white,
        marginTop: -20,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 0,
        paddingTop: 5,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        color: 'white',
        backgroundColor: '#333333',
        display:'flex',
        flexDirection: "column"
    },
    bottom: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    bottomRight: {
        paddingRight: 20,
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    topLeft: {
        justifyContent: 'left',
    },
    city: {
        fontWeight: 600,
        fontSize: 18,
        lineHeight: 1,
        margin: 0,
        letterSpacing: 1,
    },
    weatherDescription: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1,
        textAlign: 'left',
        margin: 0,
    },
    //a
    weatherIcon: {
        width: 100,
    },
    temperature: {
        fontWeight: 600,
        fontSize: 70,
        width: 'auto',
        letterSpacing: 3,
        marginVertical: 0,
        marginHorizontal: 10,
    },
    details: {
        width: '100%',
        paddingLeft: 20,
    },
    parameterRow: {
        display: 'flex',
        justifyContent: "space-between",
    },
    parameterLabel: {
        textAlign: 'left',
        fontWeight: 400,
        fontSize: 12,
    },
    parameterValue: {
        textAlign: 'right',
        fontWeight: 600,
        fontSize: 12,
    },
    parameterLabel: {
        fontWeight: 800,
    },
    NewContent:{
        display: 'grid',
        //margin-top: 0.8rem,
        //grid-template-columns: repeat(2, 1fr),
        //gap: 2rem 0rem,
        //box-sizing: border-box,
    },
    mainContent:{
        width: '18.75 rem',
        borderRight: 1,
        borderStyle: 'solid',
        borderColor: '#ffffff56',
        paddingRight: '1.9vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
    },
    FeelSlot:{
        display: 'flex',
        //verticalAlign: "baseline",
        //box-sizing: border-box,
    },
    TopHalf:{
        display: 'flex',
        //gap:1rem,
        paddingBottom: 10,
        borderBottom: 1,
        borderStyle: 'solid',
        borderColor: '#ffffff56',
    },
    smallIcon:{
        height:85,
    },
    Data:{
        fontSize: 12,
        alignSelf: 'center',
    },
    Text:{
        fontFamily: "Roboto",
    }
    
});

const PDFCurrentWeather = ({ data }) => {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();


    const currDate = date + ' ' + months[month];
    const currTime = new Date().toLocaleTimeString();
 


    return (
        <View style={styles.Weather}>
            <View style={styles.TopHalf}>
                <View style ={styles.mainContent}> 
                    <View style={styles.top}>
                        <View style={styles.topLeft}>
                            <Text style={styles.city}>{data.city}</Text>
                            <Text style={styles.weatherDescription}>{data.current.weather[0].description}</Text>
                        </View>
                        <View style={styles.topLeft}>
                            <Text style={styles.city}>{currDate}</Text>
                            <Text style={styles.weatherDescription}>{currTime}</Text>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.bottomLeft}>
                            <Text style={styles.temperature}>{`${Math.round(data.current.temp)}˚`}</Text>
                        </View>
                        <View style={styles.bottomRight}>
                            <View style={styles.details}>
                                <Image alt="weather" style={styles.weatherIcon} src={process.env.PUBLIC_URL + `/icons/${data.current.weather[0].icon}.png`} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.NewContent}>
                    <View style={styles.FeelSlot}>   
                        <Image style={styles.smallIcon} src={process.env.PUBLIC_URL + '/icons/wi_thermometer.svg'} />
                        <View style={styles.Data}>
                            <Text>   
                                Feels Like
                            </Text>
                            <Text>
                                {`${Math.round(data.current.feels_like)}˚C`}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.FeelSlot}>   
                        <Image style={styles.smallIcon} src={process.env.PUBLIC_URL + '/icons/wi_thermometer.svg'} />
                        <View style={styles.Data}>
                            <Text>   
                                Wind
                            </Text>
                            <Text>
                                {`${Math.round(data.current.wind_speed)} m/s`}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.FeelSlot}>   
                        <Image style={styles.smallIcon} src={process.env.PUBLIC_URL + '/icons/humidity.svg'} />
                        <View style={styles.Data}>
                            <Text>   
                                Humidity
                            </Text>
                            <Text>
                                8.2
                            </Text>
                        </View>
                    </View>
                    <View style={styles.FeelSlot}>   
                        <Image style={styles.smallIcon} src={process.env.PUBLIC_URL + '/icons/wi_thermometer.svg'} />
                        <View style={styles.Data}>
                            <Text>   
                                Visibility
                            </Text>
                            <Text>
                               8.2
                            </Text>
                        </View>
                    </View>
                </View>    
            </View>
            <Text>
                Alerts and Advice
            </Text>
            <Text>
                Recommend rain-proof equipment or rain-proof covers for equipment.
                Make sure to bring heating packs to keep hands warm. 
            </Text>
        </View>

        

    );
}


export default PDFCurrentWeather;