import { Outlet } from "react-router";
import ThemeToggle from "./modules/UI/ThemeToggle/ThemeToggle";

function App() {
  return (
    <>
      <ThemeToggle />
      <Outlet />
    </>
  );
}

export default App;
