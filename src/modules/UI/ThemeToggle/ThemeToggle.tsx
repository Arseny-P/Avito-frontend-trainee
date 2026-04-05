import { Switch } from "antd";
import { ColorModeSlice } from "../../ColorMode/ColorMode.slice"
import { useAppDispatch, useAppSelector } from "../../../store";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";


const ThemeToggle = () => {
  const isDark = useAppSelector((state) => ColorModeSlice.selectors.isDark(state));
  const dispatch = useAppDispatch();
  return (
    <Switch
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
      onChange={() => dispatch(ColorModeSlice.actions.setMode(!isDark))}
      style={{right: 56, top: 32, position: 'fixed'}}
    />
  )
}

export default ThemeToggle