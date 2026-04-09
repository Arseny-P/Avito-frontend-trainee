import { createSlice } from "@reduxjs/toolkit";

const getTheme = () => {
  const saved = localStorage.getItem("isDark");
  return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const ColorModeSlice = createSlice({
  name: "colorMode",
  initialState: {
    isDark: getTheme(),
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
