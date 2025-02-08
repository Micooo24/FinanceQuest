import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import GameFeatures from "./components/LandingPage/GameFeatures";
import LoadingPage from "./components/Homepage/LoadingPage";
import Gameplay from "./components/Game/Gameplay";
import { Toaster } from 'react-hot-toast';

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
          },
        }}
      />
      <Router>
        <Routes>
          {/* Route for Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gamefeatures" element={<GameFeatures />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/gameplay" element={<Gameplay />} /> {/* Add the Gameplay route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;