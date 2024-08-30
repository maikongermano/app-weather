import axios from "axios";

const API_KEY = 'd9868234df657848f0c6e9930f3c1de9';

export const fetchWeather = async (city: string) => {
  const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });

  return response.data;
};
