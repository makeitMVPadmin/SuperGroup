import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Test from "./components/Test/Test.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import ChatC from "./components/ChatC/ChatC";
import GenerateText from "./components/GenerateText/GenerateText";
import ChatComponent from "./components/ChatComponent/ChatComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/ai" element={<ChatC />} />
      <Route path="/complete" element={<ChatComponent />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
