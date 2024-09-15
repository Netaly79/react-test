import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./campersOps";
import {selectSelectedType, selectSelectedFilters, selectSelectedLocation } from "./filtersSlice";

const initialState = {
  items: { total: 0, items: [] },
  displayedItems: { total: 0, items: [] },
  loading: false,
  error: null,
  selectedItem: null,
  currentPage: 1,
  itemsPerPage: 4
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload.items)) {
          state.items = action.payload;
          const displayedItems = state.items.items.slice(0, state.itemsPerPage);
          state.displayedItems = {total: displayedItems.length, items: displayedItems}
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
      });
  },
});
export const { setCurrentPage } = campersSlice.actions;

export const selectCampers = (state) => state.campers.items;
export const selectLoading = (state) => state.campers.loading;
export const selectError = (state) => state.campers.error;
export const selectFilter = (state) => state.filters;
export const selectCampersById = (state) => state.campers.selectedItem;
export const selectDisplayedItems = (state) => state.campers.displayedItems;
export const selectCurrentPage = (state) => state.campers.currentPage;
export const selectSelectedItem = (state) => state.campers.selectedItem;


export const selectFilteredCampers = createSelector(
  [selectCampers, selectSelectedFilters, selectSelectedType, selectSelectedLocation],
  (campers, filters, type, location) => {
    if(campers.length == 0)
      return campers;
    let filteredCampers = campers.items;
    
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
    if (!Array.isArray(campers.items)) return [];
    return [...new Set(campers.items.map((item) => item.location))];
  }
);

export const { clearCampers } = campersSlice.actions;
export default campersSlice.reducer;
