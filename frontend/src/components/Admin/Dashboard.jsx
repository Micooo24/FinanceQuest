import React, { useState } from "react";
import { Box } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
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
        backgroundColor: "#331540",
        overflow: "auto",
      }}
    >
      {/* Sidebar */}
      <AdminNavbar activeSection={activeSection} setActiveSection={setActiveSection} />

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
        }}
      >
        <Box sx={{ width: "90%", height: "90%" }}>
          {activeSection === "Dashboard" && <DashboardCharts />}
          {activeSection === "Users" && <Users />} 
          {activeSection === "Accounts" && <Accounts />}
          {activeSection === "Feedbacks" && <Feedbacks />}
          {activeSection === "FinanceTracker" && <FinanceTracker />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
  