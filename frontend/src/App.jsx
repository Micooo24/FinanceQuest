// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/LandingPage/LandingPage";
// import Signup from "./components/Auth/Signup";
// import Login from "./components/Auth/Login";
// import GameFeatures from "./components/LandingPage/GameFeatures";
// import LoadingPage from "./components/Homepage/LoadingPage";
// import Startpage from "./components/Homepage/StartPage";
// import Menu from "./components/Homepage/Menu";
// import About from "./components/LandingPage/About";
// import Howtoplay from "./components/Homepage/Howtoplay";
// import Blog from "./components/LandingPage/Blog";
// import Budgeting from "./components/LandingPage/Budgeting";
// import Minigame from "./components/Homepage/Minigame";
// import Explore from "./components/LandingPage/Explore";
// import SavingPage from "./components/Minigames/Saving/SavingPage";
// import InvestingPage from "./components/Minigames/Investing/InvestingPage";
// import Gameplay from "./components/Game/Gameplay";
// import { Toaster } from 'react-hot-toast';
// import Dashboard from "./components/Admin/Dashboard";
// import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";


// function App() {
//   return (
//     <>
//     <Toaster
//         position="top-center"
//         reverseOrder={false}
//         toastOptions={{
//           style: {
//             fontSize: '25px', // Increase font size
//             padding: '25px', // Increase padding
//             borderRadius: '50px', // Add rounded edges
//           },
//         }}
//       />
//     <Router>
//       <Routes>
//         {/* Route for Landing Page */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/gameplay" element={<Gameplay />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/gamefeatures" element={<GameFeatures />} />
//         <Route path="/loading" element={<LoadingPage />} />
//         <Route path="/start" element={<Startpage />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/minigame" element={<Minigame />} />
//         <Route path="/howtoplay" element={<Howtoplay />} />
//         <Route path="/blogs" element={<Blog />} />
//         <Route path="/budgeting" element={<Budgeting />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/saving" element={<SavingPage />} />
//         <Route path="/investment" element={<InvestingPage />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//     </Router>
//     </>
//   );
// }


// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import GameFeatures from "./components/LandingPage/GameFeatures";
import LoadingPage from "./components/Homepage/LoadingPage";
import Startpage from "./components/Homepage/StartPage";
import Menu from "./components/Homepage/Menu";
import About from "./components/LandingPage/About";
import Howtoplay from "./components/Homepage/Howtoplay";
import Blog from "./components/LandingPage/Blog";
import Budgeting from "./components/LandingPage/Budgeting";
import Minigame from "./components/Homepage/Minigame";
import Explore from "./components/LandingPage/Explore";
import SavingPage from "./components/Minigames/Saving/SavingPage";
import InvestingPage from "./components/Minigames/Investing/InvestingPage";
import Gameplay from "./components/Game/Gameplay";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./components/Admin/Dashboard";
import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/howtoplay" element={<Howtoplay />} />
          <Route path="/blogs" element={<Blog />} />

          {/* Protected Routes for Users */}
          <Route
            path="/gameplay"
            element={
              <ProtectedRoute>
                <Gameplay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gamefeatures"
            element={
              <ProtectedRoute>
                <GameFeatures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loading"
            element={
              <ProtectedRoute>
                <LoadingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/start"
            element={
              <ProtectedRoute>
                <Startpage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/minigame"
            element={
              <ProtectedRoute>
                <Minigame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgeting"
            element={
              <ProtectedRoute>
                <Budgeting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saving"
            element={
              <ProtectedRoute>
                <SavingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investment"
            element={
              <ProtectedRoute>
                <InvestingPage />
              </ProtectedRoute>
            }
          />

          {/* Protected Route for Admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
