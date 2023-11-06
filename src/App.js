import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import Test from "./components/Test/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
