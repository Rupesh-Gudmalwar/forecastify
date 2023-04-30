import axios from "axios";

export const geoCodingApi = (searchKey) => {
  return axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchKey}&limit=5&appid=${process.env.REACT_APP_GEO_KEY}`
  );
};

export const fetchWeatherApi = (lat, lon) => {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_GEO_KEY}`
  );
};
