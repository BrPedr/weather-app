import axios from "axios";

export const KEY = "df70f978a1869b26638c5a213b918a21";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export default weatherApi;
