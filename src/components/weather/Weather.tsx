import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";

import "./Weather.css";

interface WeatherData {
  temp?: number;
  feels_like?: number;
  pressure?: number;
}

export function Weather() {
  const sin =
    "In a right triangle, the sine of an angle is the length of the opposite side divided by the length of the hypotenuse.";
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [errorState, setErrorState] = useState(false);

  const getWeather = () => {
    const appid = "b002cb8127c4560aa61b00aeddc3415e";

    city?.length > 2 &&
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`)
        .then((resp) => resp.json())
        .then((data) => {
          const { cod, main } = data;
          const { feels_like, pressure, temp } = main || {};

          setErrorState(cod === "404");
          setWeatherData({ feels_like, pressure, temp });
        });
  };

  return (
    <>
      <section className="container">
        {(() => {
          if (weatherData) {
            return (
              <section className="weather-data">
                <div className="weather-data-item">Temperature: {weatherData?.temp}</div>
                <div className="weather-data-item">Feels like: {weatherData?.feels_like}</div>
                <div className="weather-data-item">Preasure: {weatherData?.pressure}</div>
              </section>
            );
          }
        })()}

        <form>
          <TextField
            error={errorState}
            label="Search the city"
            variant="outlined"
            helperText={errorState ? "City not found" : "min 4 chars"}
            onChange={(e) => setCity(e.target.value)}
          />

          <Tooltip title={sin}>
            <Button variant="contained" endIcon={<SearchIcon />} onClick={getWeather}>
              Search
            </Button>
          </Tooltip>
        </form>
      </section>
    </>
  );
}
