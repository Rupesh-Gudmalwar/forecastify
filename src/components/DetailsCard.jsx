import React from "react";
import styled from "styled-components";
import RadioBtn from "./common/RadioBtn";
import { ICON_URL } from "./utils/constants";
import { CircularProgress } from "@mui/material";

export default function DetailsCard({
  currentWeather,
  unit,
  setUnit,
  loading,
  selectedCity,
}) {
  return (
    <Card>
      <h4>Today's Weather ({selectedCity?.name})</h4>

      {loading?.details && !currentWeather ? (
        <div className='m-1'>
          <CircularProgress />
        </div>
      ) : currentWeather ? (
        <>
          <section className='switch-unit'>
            <RadioBtn unit={unit} setUnit={setUnit} name={"temp-unit"} />
          </section>

          <h5>Temperature</h5>
          <p className='temperature'>
            <span>Current : </span>
            <span>
              {currentWeather?.main?.temp} {unit === "imperial" ? "F" : "°C"}
            </span>{" "}
            |<span>Feels Like : </span>
            <span>
              {currentWeather?.main?.feels_like}{" "}
              {unit === "imperial" ? "F" : "°C"}
            </span>{" "}
            |<span>Maximum : </span>
            <span>
              {currentWeather?.main?.temp_max}{" "}
              {unit === "imperial" ? "F" : "°C"}
            </span>{" "}
            |<span>Minimum : </span>
            <span>
              {currentWeather?.main?.temp_min}{" "}
              {unit === "imperial" ? "F" : "°C"}
            </span>{" "}
          </p>
          <h5>Weather</h5>
          <p className='temperature'>
            <h6>
              Description :{" "}
              <span className='ml-6'>
                {currentWeather?.weather?.[0]?.description}
              </span>
            </h6>
            <img
              src={ICON_URL(currentWeather?.weather?.[0]?.icon)}
              alt={currentWeather?.weather?.[0]?.main}
            />
            |
            <h6>
              Humidity :
              <span className='ml-6'>{currentWeather?.main?.humidity} %</span>
            </h6>
          </p>
          <h5>Wind</h5>
          <p className='temperature'>
            <span>Speed :</span>
            <span>{currentWeather?.wind?.speed} km/hr</span> |
            <span>Degree :</span>
            <span>{currentWeather?.wind?.deg} °</span>
          </p>
        </>
      ) : (
        <p className='text-center m-1'>No Data for now! Try fetching.</p>
      )}
    </Card>
  );
}

const Card = styled.div`
  width: 60vw;
  max-width: 50rem;
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 10px;
  position: relative;
  h4,
  .text-center {
    text-align: center;
  }
  .temperature {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;
  }
  .switch-unit {
    border-radius: 4px;
    position: absolute;
    top: 1rem;
    right: 2rem;
  }
  h5 {
    margin-top: 1rem;
  }
  h6 {
    span {
      color: gray;
    }
  }
  .weather-flex {
    display: flex;
    justify-content: start;
    align-content: center;
  }
  .ml-6 {
    margin-left: 6px;
  }
  .m-1 {
    margin: 1rem;
  }
`;
