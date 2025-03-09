import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import axios from "axios"; // Import axios for API requests

const AdminHeader = ({ activeSection }) => {
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (authToken && role === "admin" && userId) {
      fetchAdminDetails(userId, authToken);
    }
  }, []);

  const fetchAdminDetails = async (userId, authToken) => {
    try {
        const response = await axios.get(`http://localhost:8000/admin/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAdminName(response.data.name || "Admin");
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  return (
    <AppBar position="fixed" sx={{ background: "#C5BAFF", top: 0, left: 0, width: "100%", zIndex: 1 , borderBottom: "1px solid rgb(26, 25, 24)",}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Active Section */}
        <Typography variant="h6" sx={{ color: "#220E36", fontWeight: "bold", marginLeft: 10 , fontFamily: "'Lora'" }}>
          {activeSection}
        </Typography>

        {/* Right Side - Admin Name */}
        <Box>
          <Typography variant="body1" sx={{ color: "#220E36"  , fontFamily: "'Fraunces'"}}>
            Welcome, {adminName}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
