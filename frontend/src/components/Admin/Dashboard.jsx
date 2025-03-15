import React, { useState } from "react";
import { Box } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import AdminHeader from "./AdminHeader";
import DashboardCharts from "./Chart";
import Users from "./Users"; // Import Users component
import Accounts from "./Accounts"; 
import Feedbacks from "./Feedbacks"; 
import FinanceTracker from "./FinanceTracker"; 

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(180deg, #5e3967, #351742)",
        overflow: "auto",
      }}
    >
      {/* Sidebar */}
      <AdminNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
 
      <AdminHeader activeSection={activeSection} />


      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          transition: "margin-left 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "70px",
        }}
      >
        <Box sx={{ width: "85%", height: "90%" }}>
          {activeSection === "Dashboard" && <DashboardCharts />}
          {activeSection === "User Management" && <Users />} 
          {activeSection === "Account Management" && <Accounts />}
          {activeSection === "Feedbacks" && <Feedbacks />}
          {activeSection === "Finance Tracker" && <FinanceTracker />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
  