import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import GameFeatures from "./components/LandingPage/GameFeatures";
import LoadingPage from "./components/Homepage/LoadingPage";
import Minigame from "./components/Minigames/Minigame";
import BudgetingPage from "./components/Minigames/Budgeting/BudgetingPage";
import SavingPage from "./components/Minigames/Saving/SavingPage";
import InvestingPage from "./components/Minigames/Investing/InvestingPage";
import Gameplay from "./components/Game/Gameplay";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Landing Page */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gamefeatures" element={<GameFeatures />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/miniGame" element={<Minigame />} />
        <Route path="/budgeting" element={<BudgetingPage />} />
        <Route path="/saving" element={<SavingPage />} />
        <Route path="/investment" element={<InvestingPage />} />
        <Route path="/gameplay" element={<Gameplay />} />
      </Routes>
    </Router>
  );
}

export default App;