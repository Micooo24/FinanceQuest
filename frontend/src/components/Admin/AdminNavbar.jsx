import fqlogo from "/assets/financial.png";

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  Person,
  Article,
  Check,
  Info,
  Logout,
  Home
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Added toast import

const AdminNavbar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    { text: "Dashboard", icon: <Home /> },
    { text: "Account Management", icon: <Info /> },
    { text: "User Management", icon: <Person /> },
    { text: "Feedbacks", icon: <Article /> },
    { text: "Finance Tracker", icon: <Check /> },
  ];

  return (
    <Box
      sx={{
        width: expanded ? 200 : 70,
        height: "100vh",
        background: "#351742",
        color: "#DAD2FF",
        position: "fixed",
        left: 0,
        top: 0,
        transition: "width 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        zIndex: 10,
        borderRight: "1px solid rgb(26, 25, 24)",
        fontFamily: "'Lora'" 
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo at the top */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <img
          src={fqlogo}
          alt="Finance Quest Logo"
          style={{
            width: expanded ? "120px" : "40px",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </Box>

      {/* Wrapper for centering menu items */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => setActiveSection(item.text)}
              sx={{ padding: "10px 16px"}}
            >
              <ListItemIcon sx={{ color: "#DAD2FF", minWidth: "40px", backgroundColor: "#5e3967", borderRadius: "30px", height: "40px", justifyContent: "center", alignItems: "center" }}>
                {item.icon}
              </ListItemIcon>
              {expanded && <ListItemText primary={item.text} sx={{ fontSize: "0.9rem", ml: 2, fontFamily: "'Lora'" }} />}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout button at the bottom */}
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{ 
            mb: 5,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#5e3967'
            },
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <ListItemIcon sx={{ color: "#DAD2FF", minWidth: "40px", backgroundColor: "#5e3967", borderRadius: "30px", height: "40px", justifyContent: "center", alignItems: "center" }}>
            <Logout />
          </ListItemIcon>
          {expanded && <ListItemText primary="Logout" sx={{ fontSize: "0.9rem", ml: 2 }} />}
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminNavbar;