import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/Home";
import { ThemeProvider } from "styled-components";

import { useThemeStore } from "./store/useThemeStore";
import Globalstyle from "./style/Globalstyle";
import { lightTheme } from "./style/theme/light";
import { darkTheme } from "./style/theme/dark";

function App() {
  const themeMode = useThemeStore(state => state.theme);
  const themeObj = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeObj}>
      <Globalstyle />
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
