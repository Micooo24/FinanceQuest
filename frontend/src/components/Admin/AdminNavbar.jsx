import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Dashboard,
  Person,
  TableChart,
  ExpandLess,
  ExpandMore,
  ViewModule,
  Article,
  Check,
  Info
} from "@mui/icons-material";

const AdminNavbar = ({ activeSection, setActiveSection }) => {
  const [miniGamesOpen, setMiniGamesOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Accounts", icon: <Info /> },
    { text: "Users", icon: <Person /> },
    { text: "Feedbacks", icon: <Article /> },
    { text: "FinanceTracker", icon: <Check /> },
   
  ];

  const miniGamesItems = [
    { text: "Budget Table", icon: <TableChart /> },
    { text: "Savings Table", icon: <TableChart /> },
    { text: "Investment Table", icon: <TableChart /> },
  ];

  return (
    <Box
      sx={{
        width: expanded ? 100 : 60, // Reduced width for better fit
        height: "90vh",
        background: "#220E36",
        color: "white",
        position: "fixed",
        left: 20,
        top: 20,
        borderRadius: "10px",
        transition: "width 0.3s ease-in-out",
        "&:hover": { width: 180 }, // Adjusted hover effect
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => setActiveSection(item.text)}
            sx={{ padding: "10px 16px", mb: 2, mt: 1 }}
          >

            <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
              {item.icon}
            </ListItemIcon>
            {expanded && <ListItemText primary={item.text} sx={{ fontSize: "0.9rem" }} />}
          </ListItem>
        ))}
        
      </List>
    </Box>
  );
};

export default AdminNavbar;
