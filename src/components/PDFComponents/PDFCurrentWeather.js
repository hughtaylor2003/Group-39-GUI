import React from "react";
import { Text, View, StyleSheet, Image} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    Weather: {
        width: 300,
        border: 6,
        color: 0,
        margin: -20,
        padding: 5
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



    return (
        <View className="weather">
            <View className="top">
                {//<Image src=""/>
                }
                <View className="top-left">
                    <Text className="city">{data.city}</Text>
                    <Text className="weather-description">{data.current.weather[0].description}</Text>
                </View>
                {//<Image alt="weather" className="weather=icon" src={"/icons/${data.current.weather[0].icon}.png"} />
                }
            </View>
            <View className="bottom">
                <View className="bottom-left">
                    <Text className="temperature">{`${Math.round(data.current.temp)}˚`}</Text>
                </View>
                <View className="bottom-right">
                    <View className="details">
                        <View className="parameter-row">
                            <Text className="parameter-label top">Details</Text>
                        </View>
                        <View className="parameter-row">
                            <Text className="parameter-label">Feels like</Text>
                            <Text className="parameter-value">{`${Math.round(data.current.feels_like)}˚`}</Text>
                        </View>
                        <View className="parameter-row">
                            <Text className="parameter-label">Wind</Text>
                            <Text className="parameter-value">{`${Math.round(data.current.wind_speed)} m/s`}</Text>
                        </View>
                        <View className="parameter-row">
                            <Text className="parameter-label">Humidity</Text>
                            <Text className="parameter-value">{`${Math.round(data.current.humidity)}%`}</Text>
                        </View>
                        <View className="parameter-row">
                            <Text className="parameter-label">Sunrise</Text>
                            <Text className="parameter-value">{sunriseTime({data})}</Text>
                        </View>
                        <View className="parameter-row">
                            <Text className="parameter-label">Sunset</Text>
                            <Text className="parameter-value">{sunsetTime({data})}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}


export default PDFCurrentWeather;