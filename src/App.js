import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css"
import Home from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
