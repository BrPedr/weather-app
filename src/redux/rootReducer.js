import { combineReducers } from "redux";

import cityReducer from "./cities/citiesSlice";

const rootReducer = combineReducers({
  city: cityReducer,
});

export default rootReducer;
