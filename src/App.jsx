import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import NewChat from "./components/NewChat";
import SignIn from "./components/SignIn";
import AllChats from "./components/AllChats";
import { UserProvider } from "./context/UserContext"; // <-- import UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat/:dealId" element={<NewChat />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/all-chats" element={<AllChats />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
