import React from 'react';
import {Page, Document, StyleSheet} from '@react-pdf/renderer';
import PDFCurrentWeather from './PDFComponents/PDFCurrentWeather';
import PDFDays from './PDFComponents/PDFDays';
import PDFDailyBreakdown from './PDFComponents/PDFDailyBreakdown';
import PDFExtraMetrics from './PDFComponents/PDFExtraMetrics';

const styles = StyleSheet.create({});

const PDFForecast = ({WeatherData, HourWeatherData, getWeatherIcon, Settings}) => {
    const daysData = [] //array for hourly and weather metrics for each day
    const unit = Settings.Farenhight ? 'F' : 'C'; //get right unit

    for(let i = 1; i<7; i++){
        daysData.push(
            <Page size='A4' style={{backgroundColor: '#cbdbf4'}}>
                <PDFDailyBreakdown hrdata = {HourWeatherData} Index = {i} getWeatherIcon={getWeatherIcon}></PDFDailyBreakdown>
                <PDFExtraMetrics data={WeatherData} index={i}></PDFExtraMetrics>
            </Page>
        )
    }

 return(
    // Page 1: Current day data; Subsequent pages: each day - separate day of the week data
    <Document>
        <Page size="A4">
            {WeatherData && <PDFCurrentWeather data ={WeatherData} unit={unit}></PDFCurrentWeather>}
            {WeatherData && <PDFDays data = {WeatherData} unit={unit}></PDFDays>}
            {WeatherData && HourWeatherData !== null  && <PDFDailyBreakdown hrdata = {HourWeatherData} Index = {0} getWeatherIcon={getWeatherIcon}></PDFDailyBreakdown> }
        </Page>
        {daysData}
    </Document>
 )
};

export default PDFForecast;