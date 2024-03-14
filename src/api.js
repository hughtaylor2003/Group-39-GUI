{/*************Open Weather API***************/}

export const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/3.0';
export const OPEN_WEATHER_KEY = '1648041e6f58356be2fc481bbf3e2e93';










{/*************GEO API***************/}
export const geoAPIOptions = {
        method: 'GET',
        types: 'CITY',
        params: {sort: 'population | name'},
        headers: {
            'X-RapidAPI-Key': '5ecb1b25c9mshc6ff46ea5c11ab2p13aa75jsn2de515e2ce94',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };
export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';




