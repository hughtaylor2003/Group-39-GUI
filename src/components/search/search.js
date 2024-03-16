import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoAPIOptions } from "../../api";
import './search.css'



const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=750000&namePrefix=${inputValue}`,
            geoAPIOptions
        )
        .then((response) => response.json())
        .then((response) => {
            return{
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`
                    }
                })
            }
        })
        .catch((err) => console.error(err));
    };

    const handleOnChange = (searchData) => {
        console.log('Search Data:', searchData);
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            className="searchbar"
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
