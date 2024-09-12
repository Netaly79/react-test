import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./campersOps";

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
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
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

export const selectCampers = (state) => state.campers.items;
export const selectLoading = (state) => state.campers.loading;
export const selectError = (state) => state.campers.error;
export const selectFilter = (state) => state.filters.name;
export const selectCampersById = (state) => state.campers.selectedItem;

export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilter],
  (campers, filter) => {
    if (!Array.isArray(campers)) {
      return [];
    }
    return campers.filter((camper) =>
      camper.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const selectUniqueLocations = createSelector(
  [selectCampers],
  (campers) => {
    const items = campers.items;
    if (!Array.isArray(items)) {
      return [];
    }
    return [...new Set(items.map((item) => item.location))];
  }
);

export default campersSlice.reducer;
