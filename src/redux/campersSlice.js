import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./campersOps";
import {selectSelectedType, selectSelectedFilters, selectSelectedLocation } from "./filtersSlice";

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedItem: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching campers...");
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        console.log("Campers fetched successfully:", action.payload);
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Failed to fetch campers:", action.payload);
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
        console.log("Campers details fetched:", action.payload);
      });
  },
});

export const selectCampers = (state) => state.campers.items;
export const selectLoading = (state) => state.campers.loading;
export const selectError = (state) => state.campers.error;
export const selectFilter = (state) => state.filters;
export const selectCampersById = (state) => state.campers.selectedItem;

export const selectFilteredCampers = createSelector(
  [selectCampers, selectSelectedFilters, selectSelectedType, selectSelectedLocation],
  (campers, filters, type, location) => {
    console.log("Selecting filtered campers:", { campers, filters, type, location });
    if(campers.length == 0)
      return campers;
    let filteredCampers = campers.items;
    

    // Применение фильтров
    if (filters.length > 0) {
      filteredCampers = filteredCampers.filter(camper =>
        filters.every(filter => {
          if(filter !== 'automatic') {

            return camper[filter]
          }
          else {
            return camper.transmission == 'automatic';
          }
        })
      );
    }

    if (type) {
      filteredCampers = filteredCampers.filter(camper => camper.form === type);
    }

    if (location && location !== "City") {
      filteredCampers = filteredCampers.filter(camper => camper.location === location);
    }

    return { total: filteredCampers.length, items: filteredCampers };
  }
);

export const selectUniqueLocations = createSelector(
  [selectCampers],
  (campers) => {

    if (!Array.isArray(campers.items)) return []; // Проверка, что campers - массив
    return [...new Set(campers.items.map((item) => item.location))];
  }
);

export default campersSlice.reducer;
