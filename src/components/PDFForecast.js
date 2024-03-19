import React from 'react';
import {Page, Text, Image, View, Document, StyleSheet} from '@react-pdf/renderer';
import PDFCurrentWeather from './PDFComponents/PDFCurrentWeather';
import PDFDays from './PDFComponents/PDFDays';

const styles = StyleSheet.create({});

const PDFForecast = ({WeatherData}) => {
 return(
    <Document>
        <Page size="A4">
            <View>
               {WeatherData && <PDFCurrentWeather data ={WeatherData}></PDFCurrentWeather>}
               {WeatherData && <PDFDays data = {WeatherData}></PDFDays>}
            </View>
        </Page>
    </Document>
 )
};

export default PDFForecast;