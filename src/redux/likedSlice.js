import { createSlice } from "@reduxjs/toolkit";

export const loadLikedCampersFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("likedCampers");
    return savedState ? JSON.parse(savedState) : [];
  } catch (error) {
    console.error("Error loading liked campers from localStorage", error);
    return [];
  }
};

// Function to save liked campers to localStorage
export const saveLikedCampersToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("likedCampers", serializedState);
  } catch (error) {
    console.error("Error saving liked campers to localStorage", error);
  }
};

const initialState = {
  liked: loadLikedCampersFromLocalStorage(),
};


const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    toggleLike(state, action) {
      const camperId = action.payload;
      if (state.liked.includes(camperId)) {
        state.liked = state.liked.filter(id => id !== camperId);
      } else {
        state.liked.push(camperId);
      }
      saveLikedCampersToLocalStorage(state.liked);
    },
  },
});

export const { toggleLike } = likedSlice.actions;
export const selectLiked = (state) => state.liked.liked;
export default likedSlice.reducer;
