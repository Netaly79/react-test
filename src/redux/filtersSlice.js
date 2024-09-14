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
      // console.log(1, state.selectedFilters);
      // const filterValue = action.payload; // Используем одиночное значение, а не массив
      // if (state.selectedFilters.includes(filterValue)) {
      //   // Удаление фильтра
      //   state.selectedFilters = state.selectedFilters.filter(
      //     (filter) => filter !== filterValue
      //   );
      // } else {
      //   // Добавление фильтра
      //   state.selectedFilters = [...state.selectedFilters, filterValue];
      // }
      state.selectedFilters = action.payload;
    },
    setSelectedType(state, action) {
      // if (state.selectedType === action.payload){
      //   state.selectedType = '';
      // } else {
        state.selectedType = action.payload;
      // }
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

export const { clearFilters, setSelectedFilters, setSelectedType, setSelectedLocation } = filtersSlice.actions;

// Selector functions
export const selectSelectedFilters = (state) => state.filters.selectedFilters;
export const selectSelectedType = (state) => state.filters.selectedType;
export const selectSelectedLocation = (state) => state.filters.selectedLocation;

export default filtersSlice.reducer;
