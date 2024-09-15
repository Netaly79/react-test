import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilters: [],
  selectedType: "",
  selectedLocation: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedFilters(state, action) {
      state.selectedFilters = action.payload;
    },
    setSelectedType(state, action) {
      state.selectedType = action.payload;
    },
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    clearFilters(state) {
      state.selectedFilters = [];
      state.selectedType = "";
      state.selectedLocation = "";
    },
  },
});

export const {
  clearFilters,
  setSelectedFilters,
  setSelectedType,
  setSelectedLocation,
} = filtersSlice.actions;

export const selectSelectedFilters = (state) => state.filters.selectedFilters;
export const selectSelectedType = (state) => state.filters.selectedType;
export const selectSelectedLocation = (state) => state.filters.selectedLocation;

export default filtersSlice.reducer;
