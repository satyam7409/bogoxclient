import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import NewChat from "./components/NewChat";
import SignIn from "./components/SignIn";
import Verifyotp from "./components/Verify-otp";
import AllChats from "./components/AllChats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/chat/:dealId" element={<NewChat />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-otp" element={<Verifyotp />} />
        <Route path="/all-chats" element={<AllChats />} />
      </Routes>
    </Router>
  );
}

export default App;
