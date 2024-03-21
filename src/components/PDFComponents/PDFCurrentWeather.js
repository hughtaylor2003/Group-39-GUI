import React from "react";
import { Text, View, StyleSheet, Image, Font} from "@react-pdf/renderer";

//register font
Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
  });

//styling
const styles = StyleSheet.create({
    //style weather section - the wrapper div to the whole section
    Weather: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        color: 'white',
        marginTop: 5,
        marginVertical: 10,
        marginHorizontal: 5,
        marginBottom: 0,
        paddingTop: 5,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        Opacity: 0.4,
        backgroundColor: '#333333',
        display:'flex',
        flexDirection: "column",
        fontFamily:"Roboto",
    },
    //style bottom, top sections
    bottomRight: {
        paddingRight: 20,
    },
    top: {
        display:'flex',
        justifyContent: "space-between",
        textAlign:"space-between",
        paddingTop: 5,
        flexDirection: 'row',
        flexFlow: 'column wrap',
    },
    topLeft: {
        justifyContent: 'space-between',
    },
    topRight:{
        justifySelf: 'end',
    },
    //style city section
    city: {
        fontWeight: 600,
        fontSize: 18,
        lineHeight: 1,
        margin: 0,
        letterSpacing: 1,
    },
    //style weather description
    weatherDescription: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1,
        textAlign: 'left',
        margin: 0,
    },
    //style weather condition icon
    weatherIcon: {
        width: 100,
    },
    //style current temperature
    temperature: {
        fontWeight: 600,
        fontSize: 50,
        width: 'auto',
        letterSpacing: 3,
        marginVertical: 0,
        marginHorizontal: 10,
    },
    //style details section
    details: {
        width: '100%',
        paddingLeft: 20,
    },
    //style a parameter row - a row with a metric and a value
    parameterRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignContent:'center',
        flexDirection:'row'
    },
    //styling a metric and its image in a column
    parameterLabelAndIcon:{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent:'center',
        flexDirection:'column'
    },
    //metric name styling
    parameterLabel: {
        textAlign: 'left',
        fontWeight: 800,
        fontSize: 15,
    },
    //metric value styling
    parameterValue: {
        textAlign: 'right',
        fontWeight: 400,
        fontSize: 15,
        fontFamily: 'Roboto',
    },
    //metric icon styling
    smallIcon:{
        width:'100%',
    },
});

const PDFCurrentWeather = ({ data, unit}) => {

    //get current date, time, month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const currDate = date + ' ' + months[month];
    const currTime = new Date().toLocaleTimeString();

    //alert info
    let adviceString = '';
    if (unit === 'C'){
        if (data.current.temp > 24){
            adviceString += 'Bring lots of water to stay hydrated. Have cooling stations along with cold pack and set up water breaks. '
        }

        else if (data.current.temp < 13){
            adviceString += 'Layer up and wear warm clothing. Bring heat packs to warm up hands so handling equipment like cameras is not uncomfortable. '
        }
    }
    else{
        if (data.current.temp > 75){
            adviceString += 'Bring lots of water to stay hydrated. Have cooling stations along with cold pack and set up areas for shade to avoid direct sunlight '
        }

        else if (data.current.temp < 55){
            adviceString += 'Layer up and wear warm clothing. Bring heat packs to warm up hands so handling equipment like cameras is not uncomfortable. '
        }
    }
    
    if(data.current.weather[0].icon === '10d' || data.current.weather[0].icon === '10n' || data.current.weather[0].icon === '09n' || data.current.weather[0].icon === '09d'){
        adviceString += 'Wear waterproof gear and consider bring towels. Use water proof equipment or use protective shields/covers for equipment. '
    }

    if (adviceString === ''){
        adviceString += 'No alerts or advice needed currently'
    }

    //file using view,Text, image
    return (
        <View style={styles.Weather}>
            <View style={styles.top}>
                {//<Image src=""/>
                }
                <View style={styles.topLeft}>
                    <Text style={styles.city}>{data.city}</Text>
                    <Text style={styles.weatherDescription}>{data.current.weather[0].description}</Text>
                    <Image alt="weather" style={styles.weatherIcon} src={process.env.PUBLIC_URL + `/icons/${data.current.weather[0].icon}.png`} />
                </View>
                <View style={styles.topRight}>
                    <Text style={styles.city}>{currDate}</Text>
                    <Text style={styles.weatherDescription}>{currTime}</Text>
                </View>  
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottomLeft}>
                    <Text style={styles.temperature}>{`${Math.round(data.current.temp)}˚` + unit}</Text>
                </View>
                <View style={styles.bottomRight}>
                    <View style={styles.details}>
                        <View style={styles.parameterRow}>
                            <Text style={styles.parameterLabel}>Details</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <View style={styles.parameterLabelAndIcon}>
                                <Text style={styles.parameterLabel}>Feels like</Text>
                                <Image alt="weather" style={styles.smallIcon} src={process.env.PUBLIC_URL + '/icons/wi_thermometer.png'} />
                            </View>
                            <Text style={styles.parameterValue}>{`${Math.round(data.current.feels_like)}˚` + unit}</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <View style={styles.parameterLabelAndIcon}>
                                <Text style={styles.parameterLabel}>Wind</Text>
                                <Image alt="win" style={styles.smallIcon} src={process.env.PUBLIC_URL + '/icons/wi_wind.png'} />
                            </View>
                            <Text style={styles.parameterValue}>{`${Math.round(data.current.wind_speed)} m/s`}</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <View style={styles.parameterLabelAndIcon}>
                                <Text style={styles.parameterLabel}>Humidity</Text>
                                <Image alt="hum" style={styles.smallIcon} src={process.env.PUBLIC_URL + '/icons/humidity.png'} />
                            </View>
                            <Text style={styles.parameterValue}>{`${Math.round(data.current.humidity)}%`}</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <View style={styles.parameterLabelAndIcon}>
                                <Text style={styles.parameterLabel}>Visibility</Text>
                                <Image alt="vis" style={styles.smallIcon} src={process.env.PUBLIC_URL + '/icons/wi_dust-day.png'} />
                            </View>
                            <Text style={styles.parameterValue}>{`${Math.round(data.current.visibility)/1000} km`}</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <Text style={styles.parameterValue}>{adviceString} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}


export default PDFCurrentWeather;