import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchWeatherApi, geoCodingApi, geoCodingByZipApi } from "../APIs";
import styled from "styled-components";

export default function SearchAuto({
  setCurrentWeather,
  setForecast,
  selectedCity,
  setSelectedCity,
  type,
}) {
  const [options, setOptions] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (type === "city") {
      geoCodingApi(e.target.value)
        .then(({ data }) => {
          const optData = data?.map((each) => ({
            title: `${each?.name}, ${each?.state}, ${each?.country}`,
            value: `${each?.name}, ${each?.state}, ${each?.country}`,
            name: each?.name,
            lat: each?.lat,
            lon: each?.lon,
          }));
          setOptions(optData);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      geoCodingByZipApi(e.target.value)
        .then(({ data }) => {
          console.log("asd", data);
          const zipCity = {
            lat: data?.coord?.lat,
            lon: data?.coord?.lon,
            name: data?.name,
          };
          setSelectedCity(zipCity);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <AutocompleteCustom
      id='asynchronous-demo'
      getOptionLabel={(option) => option.title}
      options={options}
      onChange={(e, newValue) => {
        setSelectedCity(newValue);
      }}
      onInputChange={(e) => handleSearch(e)}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Search weather of any city'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

const AutocompleteCustom = styled(Autocomplete)`
  width: 40vw;
  max-width: 50rem;
`;
