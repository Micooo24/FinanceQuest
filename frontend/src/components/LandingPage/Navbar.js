import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Home, SportsEsports, Article, TravelExplore, Info, Login } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 15,
        left: "5%",
        width: "90%",
        backgroundColor: "#331540",
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
        borderRadius: "100px",
        height: "10%",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
        <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
          Finance Quest
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <IconButton component={Link} to="/" sx={{ color: "#fff" }}>
            <Home />
          </IconButton>
          <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}>
            <SportsEsports />
          </IconButton>
          <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}>
            <Article />
          </IconButton>
          <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}>
            <TravelExplore />
          </IconButton>
          <IconButton component={Link} to="/about" sx={{ color: "#fff" }}>
            <Info />
          </IconButton>
          <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}>
            <Login />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;