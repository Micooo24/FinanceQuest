import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

import LandingPage from "./components/LandingPage/LandingPage";
import GameFeatures from "./components/LandingPage/GameFeatures";
import About from "./components/LandingPage/About";
import Blog from "./components/LandingPage/Blog";
import Budgeting from "./components/LandingPage/Budgeting";
import Explore from "./components/LandingPage/Explore";
// import FinanceTracker from "./components/LandingPage/FinanceTracker";

import LoadingPage from "./components/Homepage/LoadingPage";
import Startpage from "./components/Homepage/StartPage";
import Menu from "./components/Homepage/Menu";
import Howtoplay from "./components/Homepage/Howtoplay";
import Minigame from "./components/Homepage/Minigame";

import Budget from "./components/Minigames/Budgeting/Budget";
import Savings from "./components/Minigames/Saving/SavingPage";
import Investment from "./components/Minigames/Investing/InvestingPage";

//Budgeting-Minigame
// import BLevel1 from "./components/Minigames/Budget/BLevel1";

import Gameplay from "./components/Game/Gameplay";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./components/Admin/Dashboard";
import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";import AdminDashboard from "./components/Admin/Dashboard";



function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '25px', // Increase font size
            padding: '25px', // Increase padding
            borderRadius: '50px', // Add rounded edges
          },
        }}
      />
    <Router>
      <Routes>
        {/* Route for Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/gameplay" element={<Gameplay />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gamefeatures" element={<GameFeatures />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/start" element={<Startpage />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/minigame" element={<Minigame />} />
        <Route path="/howtoplay" element={<Howtoplay />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/budgeting" element={<Budgeting />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/saving" element={<SavingPage />} />
        <Route path="/investment" element={<InvestingPage />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
