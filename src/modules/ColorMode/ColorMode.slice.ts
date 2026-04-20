import { createSlice } from "@reduxjs/toolkit";

export const ColorModeSlice = createSlice({
  name: "colorMode",
  initialState: {
    isDark: false,
  },
  selectors: {
    isDark: (state) => state.isDark,
  },
  reducers: {
    setMode: (state, action) => {
      state.isDark = action.payload;
    },
  },
});
