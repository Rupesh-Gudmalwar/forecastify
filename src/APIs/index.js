import axios from "axios";

export const geoCodingApi = (searchKey) => {
  return axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchKey}&limit=5&appid=${process.env.REACT_APP_GEO_KEY}`
  );
};

export const geoCodingByZipApi = (zipCode, countryCode = "IN") => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.REACT_APP_GEO_KEY}`
  );
};

export const fetchWeatherApi = (lat, lon, unit) => {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_GEO_KEY}&units=${unit}`
  );
};
