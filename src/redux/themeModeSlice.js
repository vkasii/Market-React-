import { createSlice } from "@reduxjs/toolkit";

const initialTheme = JSON.parse(localStorage.getItem("theme"));
const initialState = {
  value: initialTheme !== null ? initialTheme : true,
};

export const themeModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode(state, action) {
      state.value = action.payload;
    },
  },
});

export const { toggleDarkMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;
