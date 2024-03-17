import React from 'react';
import {Page, Text, Image, View, Document, StyleSheet} from '@react-pdf/renderer';
import PDFCurrentWeather from './PDFComponents/PDFCurrentWeather';

const styles = StyleSheet.create({});

const PDFForecast = ({WeatherData}) => {
 return(
    <Document>
        <Page>
            <View>
               {WeatherData && <PDFCurrentWeather data ={WeatherData}></PDFCurrentWeather>}
            </View>
        </Page>
    </Document>
 )
};

export default PDFForecast;