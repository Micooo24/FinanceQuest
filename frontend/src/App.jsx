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
import MonthlyDashboard from "./components/LandingPage/MonthlyDashboard";

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
import AdminDashboard from "./components/Admin/Dashboard";

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

        

        {/* <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tracker" element={<FinanceTracker />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}><AdminDashboard /></ProtectedRoute>} />
       

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/gamefeatures" element={<GameFeatures />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />


          <Route path="/gameplay" element={<ProtectedRoute><Gameplay /></ProtectedRoute>} />

          <Route path="/blogs" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path="/budgeting" element={<ProtectedRoute><Budgeting /></ProtectedRoute>} />

          <Route path="/loading" element={<ProtectedRoute><LoadingPage /></ProtectedRoute>} />
          <Route path="/start" element={<ProtectedRoute><Startpage /></ProtectedRoute>} />
          <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="/minigame" element={<ProtectedRoute><Minigame /></ProtectedRoute>} />
          <Route path="/howtoplay" element={<ProtectedRoute><Howtoplay /></ProtectedRoute>} />

          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
          <Route path="/investment" element={<ProtectedRoute><Investment /></ProtectedRoute>} />
          <Route path="/monthlydashboard" element={<ProtectedRoute><MonthlyDashboard /></ProtectedRoute>} />


        {/* Minigame - Budgeting*/}
        {/* <Route path="/blevel1" element={<BLevel1 />} /> */}

      </Routes>
    </Router>
    </>
  );
}


export default App;


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
//       <Toaster
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
//       <Router>
//         <Routes>
//           {/* Route for Landing Page */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/howtoplay" element={<Howtoplay />} />
//           <Route path="/blogs" element={<Blog />} />

//           {/* Protected Routes for Users */}
//           <Route
//             path="/gameplay"
//             element={
//               <ProtectedRoute>
//                 <Gameplay />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/gamefeatures"
//             element={
//               <ProtectedRoute>
//                 <GameFeatures />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/loading"
//             element={
//               <ProtectedRoute>
//                 <LoadingPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/start"
//             element={
//               <ProtectedRoute>
//                 <Startpage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/menu"
//             element={
//               <ProtectedRoute>
//                 <Menu />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/minigame"
//             element={
//               <ProtectedRoute>
//                 <Minigame />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/budgeting"
//             element={
//               <ProtectedRoute>
//                 <Budgeting />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/explore"
//             element={
//               <ProtectedRoute>
//                 <Explore />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/saving"
//             element={
//               <ProtectedRoute>
//                 <SavingPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/investment"
//             element={
//               <ProtectedRoute>
//                 <InvestingPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* Protected Route for Admin */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute isAdmin={true}>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;