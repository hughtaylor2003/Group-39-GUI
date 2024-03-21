import React from 'react';
import {Page, Document} from '@react-pdf/renderer';
import PDFCurrentWeather from './PDFComponents/PDFCurrentWeather';
import PDFDays from './PDFComponents/PDFDays';
import PDFDailyBreakdown from './PDFComponents/PDFDailyBreakdown';
import PDFExtraMetrics from './PDFComponents/PDFExtraMetrics';

//Weather Forecast as PDF document

//React PDF elements:
//View - similar to html div tag
//Page - a page in the pdf
//Text - any text, similar to p tag, h1,h2..
//Image - equivalent to img tag

//Styling is more limited than regular css, no grid support, no transform
//It is done directly in the js file using StyleSheet objects from the module react-pdf

const PDFForecast = ({WeatherData, HourWeatherData, getWeatherIcon, Settings}) => {
    const daysData = [] //array for hourly and weather metrics for each day
    const unit = Settings.Farenhight ? 'F' : 'C'; //get right unit

    //create the pages with the details of days: hourly weather and other metrics
    for(let i = 0; i<7; i++){
        daysData.push(
            <Page size='A4' style={{backgroundColor: '#cbdbf4'}}>
                <PDFDailyBreakdown hrdata = {HourWeatherData} Index = {i} getWeatherIcon={getWeatherIcon}></PDFDailyBreakdown>
                <PDFExtraMetrics data={WeatherData} index={i}></PDFExtraMetrics>
            </Page>
        )
    }

 return(
    // Page 1: Current day data; 
    //Subsequent pages: each day - separate day of the week data
    <Document>
        <Page size="A4">
            {WeatherData && <PDFCurrentWeather data ={WeatherData} unit={unit}></PDFCurrentWeather>}
            {WeatherData && <PDFDays data = {WeatherData} unit={unit}></PDFDays>}
        </Page>
        {daysData}
    </Document>
 )
};

export default PDFForecast;