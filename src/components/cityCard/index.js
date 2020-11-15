import React from "react";
import ReactLoading from "react-loading";

import { Container, Contition } from "./styles";

// Making the CityCard is the necessary step to make a reusable component
const CityCard = ({ weatherCondition }) => {
  const { name, sys, weather, main } = weatherCondition;

  const date = new Date();
  const options = { weekday: "long" };
  const day = new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .toUpperCase();

  const renderSalutation = () => {
    const hour = date.getHours();

    if (hour >= 0 && hour < 12) {
      return "good morning";
    }
    if (hour >= 12 && hour <= 18) {
      console.log(hour);
      return "good afternoon";
    }

    return "good evening";
  };

  return (
    <Container>
      <header>
        {name} - {sys.country}
      </header>
      {!weatherCondition ? (
        <ReactLoading types="balls" color="blue" />
      ) : (
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
          alt={weather[0].description}
        />
      )}
      <Contition>
        <h2>{main.temp}°</h2>
        <h3>Feels like {main.feels_like}°</h3>
      </Contition>
      <div className="bottom-text">
        <div>{renderSalutation()},</div>
        <h2>{day}</h2>
      </div>
    </Container>
  );
};

export default CityCard;
