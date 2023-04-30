import "./App.css";
import Search from "./components/Search";
import { useState } from "react";
import styled from "styled-components";
import DetailsCard from "./components/DetailsCard";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"a7432967c0ae30ff5130f08f07cff108"}&units=metric`
    );
    const forecastFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${"a7432967c0ae30ff5130f08f07cff108"}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <AppContainer>
      <Search onSearchChange={handleOnSearchChange} />
      <DetailsCard />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.main`
  padding: 1rem;
`;
