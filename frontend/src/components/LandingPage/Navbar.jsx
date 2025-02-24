import React from "react";
import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import {
  Home,
  SportsEsports,
  Article,
  TravelExplore,
  Info,
  Login,
  PlayArrow,
  Logout, // Import Logout icon
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const iconHoverEffect = {
    scale: 1.3,
    rotateY: 180,
  };

  const iconTapEffect = {
    scale: 0.9,
  };

  const transitionEffect = {
    duration: 0.3,
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 15,
          left: 60,
          width: "90%",
          backgroundColor: "#331540",
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          borderRadius: "100px",
          height: "8%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            margin: "0 auto",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Lilita One'",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Finance Quest
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <motion.div
              whileHover={iconHoverEffect}
              whileTap={iconTapEffect}
              transition={transitionEffect}
              style={{ display: "inline-block" }}
            >
              <IconButton component={Link} to="/" sx={{ color: "#fff" }}>
                <Home />
              </IconButton>
            </motion.div>

            <motion.div
              whileHover={iconHoverEffect}
              whileTap={iconTapEffect}
              transition={transitionEffect}
              style={{ display: "inline-block" }}
            >
              <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}>
                <SportsEsports />
              </IconButton>
            </motion.div>

            <motion.div
              whileHover={iconHoverEffect}
              whileTap={iconTapEffect}
              transition={transitionEffect}
              style={{ display: "inline-block" }}
            >
              <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}>
                <Article />
              </IconButton>
            </motion.div>

            <motion.div
              whileHover={iconHoverEffect}
              whileTap={iconTapEffect}
              transition={transitionEffect}
              style={{ display: "inline-block" }}
            >
              <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}>
                <TravelExplore />
              </IconButton>
            </motion.div>

            <motion.div
              whileHover={iconHoverEffect}
              whileTap={iconTapEffect}
              transition={transitionEffect}
              style={{ display: "inline-block" }}
            >
              <IconButton component={Link} to="/about" sx={{ color: "#fff" }}>
                <Info />
              </IconButton>
            </motion.div>
            {authToken && (
            <motion.div
              whileHover={iconHoverEffect}
              whileTap={iconTapEffect}
              transition={transitionEffect}
              style={{ display: "inline-block" }}
            >
              <IconButton component={Link} to="/start" sx={{ color: "#fff" }}>
                <PlayArrow />
              </IconButton>
            </motion.div>
          )}

            {!authToken && (
              <motion.div
                whileHover={iconHoverEffect}
                whileTap={iconTapEffect}
                transition={transitionEffect}
                style={{ display: "inline-block" }}
              >
                <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}>
                  <Login />
                </IconButton>
              </motion.div>
            )}

            {authToken && (
              <motion.div
                whileHover={iconHoverEffect}
                whileTap={iconTapEffect}
                transition={transitionEffect}
                style={{ display: "inline-block" }}
              >
                <IconButton sx={{ color: "#fff" }} onClick={handleLogout}>
                  <Logout />
                </IconButton>
              </motion.div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;