import { Switch } from "antd";
import { ColorModeSlice } from "@/modules/ColorMode/ColorMode.slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const ThemeToggle = () => {
  const isDark = useAppSelector((state) =>
    ColorModeSlice.selectors.isDark(state),
  );

  console.log(isDark);
  const dispatch = useAppDispatch();
  return (
    <Switch
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
      checked={isDark}
      onChange={() => dispatch(ColorModeSlice.actions.setMode(!isDark))}
      style={{ right: 56, top: 32, position: "fixed" }}
    />
  );
};

export default ThemeToggle;
