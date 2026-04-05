import { useAppSelector } from "../../store";
import { ColorModeSlice } from "../../modules/ColorMode/ColorMode.slice";

export const useAppColors = () => {
  const isDark = useAppSelector((state) =>
    ColorModeSlice.selectors.isDark(state),
  );

  return {
    bg: isDark ? "#141414" : "#fff",
    neutral: isDark ? "#0d0d0d" : "#F7F5F8",
    bgGold: isDark ? "#d48806" : "#fdf2e9",
    textGold: isDark ? "#fdf2e9" : "#d48806",
    bgPlaceholder: isDark ? "#515151" : "#FAFAFA",
    textNeutral: isDark ? "#D9D9D9" : "#5A5A5A",
    bgNeutral: isDark ? "#5A5A5A" : "#D9D9D9",
  };
};
