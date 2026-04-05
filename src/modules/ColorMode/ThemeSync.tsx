import { useEffect } from "react";
import { theme } from 'antd';
import { useAppColors } from "../../services/hooks/useAppColors";

export const ThemeSync = () => {
  const { token } = theme.useToken();
  const {neutral} = useAppColors();
  useEffect(() => {
    document.body.style.backgroundColor = neutral;
    document.body.style.color = token.colorText;
  }, [token]);

  return null;
};