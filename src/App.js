import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css"
// import Home from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import Page1 from "./pages/Page-1/Page-1"

function App() {
  return (
    <BrowserRouter>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Page1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
