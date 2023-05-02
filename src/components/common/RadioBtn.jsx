import React from "react";
import styled from "styled-components";

export default function RadioBtn({ unit, setUnit, name }) {
  const handleTempUnit = (val) => {
    setUnit(val);
  };

  return (
    <RadioWrapper>
      <label htmlFor='metric'>°C</label>
      <input
        type='radio'
        name={name}
        id='metric'
        value={unit}
        onChange={() => handleTempUnit("metric")}
        checked={unit === "metric"}
      />

      <label htmlFor='imperial'>F</label>
      <input
        type='radio'
        name={name}
        id='imperial'
        value={unit}
        onChange={() => handleTempUnit("imperial")}
        checked={unit === "imperial"}
      />
    </RadioWrapper>
  );
}

const RadioWrapper = styled.div`
  label {
    margin-right: 4px;
  }
  input {
    margin-right: 12px;
    cursor: pointer;
  }
`;
