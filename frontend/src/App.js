import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import GameFeatures from "./components/LandingPage/GameFeatures";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Landing Page */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gamefeatures" element={<GameFeatures />} />
        
      </Routes>
    </Router>
  );
}

export default App;
