import React from "react";
import { Text, View, StyleSheet, Image, Font} from "@react-pdf/renderer";

Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
  });

const styles = StyleSheet.create({
    Weather: {
        //width: '40 vw',
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
        fontFamily: 'Roboto',
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
        fontFamily: 'Roboto',
    },
    
});

const PDFCurrentWeather = ({ data }) => {
    console.log(data.current.weather[0].icon)

    const sunriseTime = ({data}) => {
        const sunrise  = data.current.sunrise;
        const timezone_offset  = data.timezone_offset;
        const sunriseTimestamp = (sunrise + timezone_offset) * 1000;
        const sunriseDate = new Date(sunriseTimestamp);
        const hours = sunriseDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunriseDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunriseDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    
    };

    const sunsetTime = ({data}) => {
        const sunset  = data.current.sunset;
        const timezone_offset  = data.timezone_offset;
        const sunsetTimestamp = (sunset + timezone_offset) * 1000;
        const sunsetDate = new Date(sunsetTimestamp);
        const hours = sunsetDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunsetDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunsetDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();


    const currDate = date + ' ' + months[month];
    const currTime = new Date().toLocaleTimeString();

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
                    <Text style={styles.temperature}>{`${Math.round(data.current.temp)}˚C`}</Text>
                </View>
                <View style={styles.bottomRight}>
                    <View style={styles.details}>
                        <View style={styles.parameterRow}>
                            <Text style={styles.parameterLabel}>Details</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <Text style={styles.parameterLabel}>Feels like</Text>
                            <Text style={styles.parameterValue}>{`${Math.round(data.current.feels_like)}˚C`}</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <Text style={styles.parameterLabel}>Wind</Text>
                            <Text style={styles.parameterValue}>{`${Math.round(data.current.wind_speed)} m/s`}</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <Text style={styles.parameterLabel}>Humidity</Text>
                            <Text style={styles.parameterValue}>{`${Math.round(data.current.humidity)}%`}</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <Text style={styles.parameterLabel}>Sunrise</Text>
                            <Text style={styles.parameterValue}>{sunriseTime({data})}</Text>
                        </View>
                        <View style={styles.parameterRow}>
                            <Text style={styles.parameterLabel}>Sunset</Text>
                            <Text style={styles.parameterValue}>{sunsetTime({data})}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}


export default PDFCurrentWeather;