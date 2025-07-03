import "./style/css/reset.css";
import "./style/css/common.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/Home";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./style/light";
import { darkTheme } from "./style/dark";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const themeMode = useThemeStore(state => state.theme);
  const themeObj = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeObj}>
      <BrowserRouter>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
