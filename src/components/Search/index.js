import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentCity } from "../../redux/cities/citiesSlice";

import weatherApi, { KEY } from "../../services/api";

import { Container } from "./styles";

// The Search Component, as the Weather App is not big, could be a part of the App component.
// In this case, the state could be passed directly to the components that needed it.
// I chose to make encapsulate the search functionality. To use the context Api would be fine,
// but using the redux to store the state of the search and pass to the other components
// allows the app to scale
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Using just one state to hold the search and make the request would be responsible for
  // making requests at each key down comming from the user, increasing the cost of the API.
  // This way the request will be made only after half second the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

// A refactoring could the made here and pass the responsibility of making the requests
// to a asyncthunk function on the citiesSlice. In this case, only a dispatch would be necessary
  useEffect(() => {
    const weather = async () => {
      try {
        const cityWeather = await weatherApi.get("/weather", {
          params: {
            q: debouncedSearchTerm,
            cnt: 5,
            units: "metric",
            appid: KEY,
          },
        });

        // To isolate the Search Component I chose to use Redux and make the results from
        // the search globaly available
        dispatch(setCurrentCity(cityWeather.data));
      } catch (error) {
        console.log(error);
      }
    };

    // Ensures that search will be made only if there is a term to search
    if (!!debouncedSearchTerm) weather();
  }, [debouncedSearchTerm, dispatch]);

  return (
    <Container>
      <input
        type="text"
        placeholder="Search for a city here"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </Container>
  );
};

export default Search;
