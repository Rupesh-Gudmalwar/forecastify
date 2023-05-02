import React from "react";
import styled from "styled-components";
import { ICON_URL } from "./utils/constants";

export default function ForcastCard({ eachCast, unit }) {
  return (
    <Card>
      <p className='flex'>
        <h5>Date and time : </h5>
        <span>{eachCast?.dt_txt}</span>
      </p>
      <p className='flex mt-1'>
        <h5>Temperature : </h5>
        <span>
          {eachCast?.main?.temp} {unit === "imperial" ? "F" : "°C"}
        </span>
      </p>
      <p className='flex mt-1'>
        <h5>Wind speed : </h5>
        <span>{eachCast?.wind?.speed} km/hr</span>
      </p>
      <p className='flex'>
        <h5>Weather : </h5>
        <span>{eachCast?.weather?.[0]?.description}</span>
        <img
          src={ICON_URL(eachCast?.weather?.[0]?.icon)}
          alt={eachCast?.weather?.[0]?.main}
        />
      </p>
    </Card>
  );
}

const Card = styled.div`
  width: 25vw;
  max-width: 18rem;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid skyblue;
  border-radius: 10px;
  .flex {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;
  }
  span {
    color: gray;
  }
  .weather-flex {
    display: flex;
    justify-content: start;
    align-content: center;
  }
  .mt-1 {
    margin-top: 1rem;
  }
`;
