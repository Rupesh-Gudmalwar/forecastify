import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import DetailsCard from "./components/DetailsCard";
import SearchAuto from "./components/Search";
import { fetchWeatherApi } from "./APIs";
import ForcastCard from "./components/ForcastCard";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [searchType, setSearchType] = useState([
    {
      name: "city",
      isActive: true,
    },
    {
      name: "zip",
      isActive: false,
    },
  ]);
  const [loading, setLoading] = useState({ details: false });

  // api call to  fetch weather data
  const fetchWeather = () => {
    setLoading({ ...loading, details: true });
    selectedCity?.lat &&
      selectedCity?.lon &&
      fetchWeatherApi(selectedCity?.lat, selectedCity?.lon, unit)
        .then(({ data }) => {
          setCurrentWeather(data?.list?.[0]);
          setForecast(data?.list?.slice(0));
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading({ ...loading, details: false });
        });
  };

  return (
    <AppContainer>
      <div className='type-select'>
        {searchType?.map((type) => (
          <Types
            isActive={type?.isActive}
            onClick={() => {
              setSearchType(() =>
                searchType?.map((each) => ({
                  ...each,
                  isActive: !each?.isActive,
                }))
              );
            }}
          >
            {type?.name}
          </Types>
        ))}
      </div>

      <div class='flex'>
        {searchType?.map(
          (item) =>
            item?.isActive && (
              <SearchAuto
                setCurrentWeather={setCurrentWeather}
                forecast={forecast}
                setForecast={setForecast}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                unit={unit}
                setUnit={setUnit}
                type={item?.name}
              />
            )
        )}
        <Button onClick={fetchWeather}>Fetch</Button>
      </div>

      <DetailsCard
        currentWeather={currentWeather}
        unit={unit}
        setUnit={setUnit}
        loading={loading}
        selectedCity={selectedCity}
      />
      <h2>Forcast</h2>

      <div class='forecast'>
        {Boolean(forecast?.length) &&
          forecast?.map((eachCast) => (
            <ForcastCard eachCast={eachCast} unit={unit} />
          ))}
      </div>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.main`
  padding: 1rem;

  .forecast {
    display: flex;
    justify-content: center;
    align-item: center;
    flex-wrap: wrap;
  }
  .type-select {
    display: flex;
    justify-content: center;
    margin-bottom: 2px;
  }
  .flex {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  h2 {
    text-align: center;
  }
`;

const Types = styled.section`
  width: 5rem;
  padding: 12px;
  background: ${({ isActive }) => (isActive ? "#018800" : "")};
  color: ${({ isActive }) => (isActive ? "#fff" : "")};
  border: ${({ isActive }) =>
    isActive ? "1px solid green" : "1px solid gray"};
  cursor: pointer;
  border-radius: 0 8px 0 8px;
`;

const Button = styled.button`
  background-color: #008cba;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
`;
