import React, { useCallback, useEffect, useState } from "react";
import weatherApi, { KEY } from "../../services/api";

import CityCard from "../../components/cityCard";

import { Container } from "../../components/Search/styles";
import { useSelector } from "react-redux";

// A page structure allows the App to grow, if other functionalities and pages would be added

const Homepage = ({ latitude, longitude }) => {
  const [generalCondition, setGeneralCondition] = useState();
  const searchedCity = useSelector((state) => state.city.currentCity);
  
  // The condition on the App asking for the user permition prevents any useless request for the Api
  const getWeather = useCallback(async () => {
    try {
      const weather = await weatherApi.get("/find", {
        params: {
          lat: latitude,
          lon: longitude,
          cnt: 5,
          units: "metric",
          appid: KEY,
        },
      });

      return setGeneralCondition(weather.data);
    } catch (error) {
      console.log(error);
    }
  }, [latitude, longitude]);

  // The component initial request for the weather of the location and closest locations of the user
  // will be made only if there's not error getting the position
  useEffect(() => {
    if (!!latitude && !!longitude) {
      getWeather();
    }
  }, [getWeather, latitude, longitude]);

  // As the App has only one page and two functionalities a function on this page is enough
  // to decide which component should render. In case the user search for a city and the
  // request is corretly made, a CityCard with the data from the search will be showed
  const renderWeatherCards = () => {
    if (!!searchedCity) {
      return <CityCard weatherCondition={searchedCity} key={searchedCity.id} />;
    }

    if (!!generalCondition && !searchedCity) {
      return generalCondition.list.map((city) => (
        <CityCard weatherCondition={city} key={city.id} />
      ));
    }
  };
  return <Container>{renderWeatherCards()}</Container>;
};

export default Homepage;
