import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentCity: null, status: "idle", error: null };

// The redux makes the state globaly available
const citiesSlice = createSlice({
  name: "currentCity",
  initialState,
  reducers: {
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
  }
});

export const { setCurrentCity } = citiesSlice.actions;

export default citiesSlice.reducer;
