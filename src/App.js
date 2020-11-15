import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import GlobalStyles from "./styles/GlobalStyles";

import Search from "./components/Search";
import Homepage from "./pages/Homepage";

import { Container } from "./styles";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    // First of all, the App needs permition from the user to get the position
    // As the top component, the App is the best place to do this
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => setErrMessage(err.message)
    );
  }, [latitude, longitude]);

  // In case of the user don't allow the access to location, an error message will be throw
  // after a loading wheel asking for his permition
  const renderContent = () => {
    if (errMessage && !latitude | !longitude) {
      return <div>Error: {errMessage}</div>;
    }
  // As the Homepage and the request are both inside the App component, passing the state
  // directly to the Homepage is fine. If those states were needed on other components,
  // a reducer could be used
    if (!errMessage && latitude | longitude) {
      return <Homepage latitude={latitude} longitude={longitude}/>;
    }

    return (
      <div className="loading">
        <ReactLoading type="bubbles" color="blue" />
        <h3>Please accept the location request</h3>
      </div>
    );
  };

  return (
      <Container>
        <Search/>
        {renderContent()}
        <GlobalStyles />
      </Container>
  );
};

export default App;
