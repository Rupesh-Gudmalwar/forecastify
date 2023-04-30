import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchWeatherApi, geoCodingApi } from "../APIs";
import styled from "styled-components";

export default function Asynchronous() {
  const [options, setOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState({ details: false });

  console.log("selectedCity", selectedCity);

  useEffect(() => {
    selectedCity?.lat &&
      selectedCity?.lon &&
      fetchWeatherApi(selectedCity?.lat, selectedCity?.lon).then(({ data }) =>
        console.log("details", data)
      );
  }, [selectedCity?.lat, selectedCity?.lon]);

  const handleSearch = (e) => {
    e.preventDefault();
    // setSearchKey(e);
    geoCodingApi(e.target.value).then(({ data }) => {
      const optData = data?.map((each) => ({
        title: `${each?.name}, ${each?.state}, ${each?.country}`,
        value: `${each?.name}, ${each?.state}, ${each?.country}`,
        lat: each?.lat,
        lon: each?.lon,
      }));
      setOptions(optData);
      console.log("data", data);
    });
  };

  return (
    <AutocompleteCustom
      id='asynchronous-demo'
      //   open={open}
      //   onOpen={() => {
      //     setOpen(true);
      //   }}
      //   isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      //   value={searchKey}
      options={options}
      onChange={(e, newValue) => {
        console.log("asd", e, newValue);
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
  width: 60vw;
  max-width: 50rem;
  margin: auto;
`;
