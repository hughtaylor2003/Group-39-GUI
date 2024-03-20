import React from 'react';
import {Page, Document, StyleSheet} from '@react-pdf/renderer';
import PDFCurrentWeather from './PDFComponents/PDFCurrentWeather';
import PDFDays from './PDFComponents/PDFDays';
import PDFDailyBreakdown from './PDFComponents/PDFDailyBreakdown';

const styles = StyleSheet.create({});

const PDFForecast = ({WeatherData, HourWeatherData, getWeatherIcon}) => {
    const daysData = []

    for(let i = 1; i<7; i++){
        daysData.push(
            <Page>
                <PDFDailyBreakdown hrdata = {HourWeatherData} Index = {i} getWeatherIcon={getWeatherIcon}></PDFDailyBreakdown>
            </Page>
        )
    }

 return(
    // Page 1: Current day data; Subsequent pages: each day - separate day of the week data
    <Document>
        <Page size="A4">
            {WeatherData && <PDFCurrentWeather data ={WeatherData}></PDFCurrentWeather>}
            {WeatherData && <PDFDays data = {WeatherData}></PDFDays>}
            {WeatherData && HourWeatherData !== null  && <PDFDailyBreakdown hrdata = {HourWeatherData} Index = {0} getWeatherIcon={getWeatherIcon}></PDFDailyBreakdown> }
        </Page>
        {daysData}
    </Document>
 )
};

export default PDFForecast;