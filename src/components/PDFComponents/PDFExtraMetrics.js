import React from "react";
import { Text, View, StyleSheet, Image} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    title :{
        fontSize: 23,
        fontWeight: 700,
        Margin:50,
        padding:50
    },

    Top:{
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        color: 'black',
        fontFamily:'Roboto',
        justifyContent:'center',
    },

    PanelWidgetsRow:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'stretch',
        justifyContent:'space-between',
        margin:5,
        flex:1
        
    },

    PanelSlot:{
        backgroundColor:'rgba(255, 255, 255, 0.514)',
        borderTopRightRadius:17.6,
        borderBottomLeftRadius:17.6,
        flexDirection:'column',
        display:'flex',
        marginRight: 10,
        marginTop:7,
        justifyContent:'center',
        textAlign:'center',
        minWidth: 120,
        minHeight: 96,
        flex:1
    },

    IconContent:{
        flexDirection: 'inline-block',
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //flexWrap: 'wrap',
    },

    text:{
        textAlign:'center',
    },

    Icon:{
        width:'40%'
    },

    SunIcon:{
        width:'30%'
    },
    
    WindIcon:{
        width:'30%'
    }
    

})

const PDFExtraMetrics = ({data, index}) => {
    const WEEK_DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayInAWeek = new Date().getDay();
    const forecastDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
   
    const sunriseTime = ({data, index}) => {
        const sunrise  = data.daily[index].sunrise;
        const timezone_offset  = data.timezone_offset;
        const sunriseTimestamp = (sunrise + timezone_offset) * 1000;
        const sunriseDate = new Date(sunriseTimestamp);
        const hours = sunriseDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunriseDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunriseDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    
    };

    const sunsetTime = ({data, index}) => {
        const sunset  = data.daily[index].sunset;
        const timezone_offset  = data.timezone_offset;
        const sunsetTimestamp = (sunset + timezone_offset) * 1000;
        const sunsetDate = new Date(sunsetTimestamp);
        const hours = sunsetDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunsetDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunsetDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    
    };

    const UviIcons = ({data}) =>{
        const uvi = Math.round(data.daily[index].uvi)
        return uvi
    };

    let deg = data.daily[index].wind_deg ? data.daily[index].wind_deg : null
    
    return (
        <View style={styles.Top}>
            <Text style ={styles.title}>
            Extra Metrics for {index === 0 ? 'Today' : forecastDay[index]}
            </Text>
            <View style={styles.PanelWidgetsRow}>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Sunrise</Text>
                        <View style={styles.IconContent}>
                            <Image alt="weather" style={styles.SunIcon} src={process.env.PUBLIC_URL + '/icons/sunrise.png'}/>
                            <Text style={styles.text}>{sunriseTime({data, index})}</Text>
                        </View>
                </View>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Sunset</Text>
                    <View style={styles.IconContent}>
                        <Image alt="weather" style={styles.SunIcon} src={process.env.PUBLIC_URL + '/icons/sunset.png'}/>
                        <Text style={styles.text}>{sunsetTime({data, index})}</Text>
                    </View>
                </View>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Highest Temp</Text>
                    <View style={styles.IconContent}>
                        <View style={styles.SunIcon}>
                            <Image alt="weather" style={styles.WeatherIcon} src={process.env.PUBLIC_URL + '/icons/thermometer-warmer.png'}/>
                        </View>
                        <Text style={styles.text}>{data.daily[index].temp.max}° </Text>
                    </View>
                </View>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Lowest Temp</Text>
                    <View style={styles.IconContent}>
                        <View style={styles.SunIcon}>
                            <Image alt="weather" style={styles.WeatherIcon} src={process.env.PUBLIC_URL + '/icons/thermometer-colder.png'}/>
                        </View>
                        <Text style={styles.text}>{data.daily[index].temp.min}° </Text>
                    </View>
                </View>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>UV Index</Text>
                    <View style={styles.IconContent}>
                        <View style={styles.Icon}>
                        <Image alt="weather" style={styles.WeatherIcon} src={process.env.PUBLIC_URL + '/icons/uv-index-' + UviIcons({data}) + '.png'}/>
                        </View>
                    </View>
                </View>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Wind Dir</Text>
                    <View style={styles.IconContent}>
                        <View style={styles.WindIcon}>
                            <Image style={{transform:'Rotate:(`${deg}deg`)'}} src={process.env.PUBLIC_URL + '/icons/arrow.png'} alt="Sunrise"></Image>
                        </View>
                        <Text style={styles.text}>{deg}°</Text>
                    </View>
                </View>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Humidity</Text>
                    <View style={styles.IconContent}>
                        <View style={styles.SunIcon}>
                        <Image alt="weather" style={styles.WeatherIcon} src={process.env.PUBLIC_URL + '/icons/humidity.png'}/>
                        </View>
                        <Text style={styles.text}>{data.daily[index].humidity}%</Text>
                    </View>
                </View>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Wind Speed</Text>
                    <View style={styles.IconContent}>
                        <View style={styles.SunIcon}>
                        <Image alt="weather" style={styles.WeatherIcon} src={process.env.PUBLIC_URL + '/icons/wind.png'}/>
                        </View>
                        <Text style={styles.text}>{data.daily[index].wind_speed} m/s</Text>
                    </View>
                </View>
               
            
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Probability Of Precipitation</Text>
                    <View style={styles.IconContent}>
                        <View style={styles.Icon}>
                        <Image alt="weather" style={styles.WeatherIcon} src={process.env.PUBLIC_URL + '/icons/raindrop.png'}/>
                        </View>
                        <Text style={styles.text}>{data.daily[index].pop}%</Text>
                    </View>
                </View>
                <View style={styles.PanelSlot}>
                    <Text style={styles.text}>Total Precipitation</Text>
                    <View style={styles.IconContent}>
                        <View style={styles.Icon}>
                        <Image alt="weather" style={styles.WeatherIcon} src={process.env.PUBLIC_URL + '/icons/raindrops.png'}/>
                        </View>
                        <Text style={styles.text}>{data.daily[index].rain ? data.daily[index].rain: '0'}mm</Text>
                    </View>
                </View>
            </View>
        </View>
        
    );

}

export default PDFExtraMetrics;