// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import { SignUp } from "./Components/Signup";
import { Login } from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword"; // Import the new component
import Help from "./Components/SosEmergency";
import Assessment from "./Components/Assessment";
import Chatbot from "./Components/Chatbot";
import Videorecommend from "./Components/Videorecommend";
import NewsRecommendations from "./Components/NewsRecommendations";
import MoodTracker from "./Components/MoodTracker";
import MoodHistory from "./Components/MoodHistory";
import TaskManager from "./Components/TaskManager";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main_section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route */}
          <Route path="/sos" element={<Help />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/videos" element={<Videorecommend />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/mood-history" element={<MoodHistory />} />
          <Route path="/news" element={<NewsRecommendations />} />
          <Route path="/tasks" element={<TaskManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
