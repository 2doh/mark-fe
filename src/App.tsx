import "./style/css/reset.css";
import "./style/css/common.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
