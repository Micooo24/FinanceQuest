import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";

const AdminProfile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    photo: "https://via.placeholder.com/150", 
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ width: 80, height: 80, mr: 2 }} src={user.photo} />
        <Box>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminProfile;
