import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import PDFForecast from './PDFForecast';

const generatePDF = async(data) => {
    const blob = await pdf((
        <PDFForecast 
         title='Forecast'
         WeatherData={data}
         />
    )).toBlob();
    saveAs(blob,'forecast');
}

export default generatePDF;