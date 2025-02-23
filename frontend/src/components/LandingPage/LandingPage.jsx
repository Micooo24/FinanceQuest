import React from "react";
import { AppBar, Toolbar, IconButton, Box, Typography, Button } from "@mui/material";
import { Home, SportsEsports, Article, TravelExplore, Info, Login, Savings, TrendingUp, AccountBalanceWallet, PlayArrow } from "@mui/icons-material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from './Navbar';

const StyledButton = styled(Button)({
  transition: "0.3s",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: "#009797",
    color: "#fff",
  },
});

const LandingPage = () => {
  const authToken = localStorage.getItem("authToken");  
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #5e3967, #351742)",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <Navbar />
    
      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "80px 50px 0 0px" }}>
        {/* Left Section */}
        <Box sx={{ width: "50%", textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontFamily: "'Gravitas One'", fontSize: "45px", fontWeight: "bold" }}>
            MASTER YOUR FINANCES, ONE QUEST AT A TIME
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "'Lilita One'", fontSize: "16px", color: "#fff", mt: 1 }}>
            Learn to budget, save, and invest through engaging real-life scenarios.
          </Typography>

          {/* Begin Adventure Button */}
          <StyledButton
            variant="contained"
            component={Link}
            to="/signup"
            sx={{
              backgroundColor: "#fff",
              color: "#331540",
              borderRadius: "50px",
              width: "250px",
              fontFamily: "'Lilita One'",
              fontSize: "15px",
              fontWeight: "bold",
              mt: 3,
            }}
          >
            Begin Adventure
          </StyledButton>
        </Box>

        {/* Right Section: Interactive UI */}
        <Box sx={{ width: "50%", textAlign: "center" }}>
          {/* Interactive Quest Selection */}
          <Box sx={{ padding: 2, borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.2)" }}>
            <Typography variant="h6" sx={{ fontFamily: "'Lilita One'", fontSize: "18px" }}>
              "Choose Your Path to Financial Freedom!"
            </Typography>
            <Box sx={{ display: "flex", gap: 19 , mt: 2 , ml:9}}>
              {[Savings, TrendingUp, AccountBalanceWallet].map((Icon, index) => (
                <motion.div key={index} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5 }}>
                  <Icon sx={{ fontSize: 50, color: "#00cac9" }} />
                </motion.div>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 2 , borderRadius: "10px", }}>
          <StyledButton sx={{  color: "#fff" ,  borderRadius: "80px",  fontFamily: "'Lilita One'"}} >Budgeting Wizard</StyledButton>
          <StyledButton sx={{  color: "#fff" ,  borderRadius: "80px",  fontFamily: "'Lilita One'"}} >Investment Hero</StyledButton>
          <StyledButton sx={{  color: "#fff" ,  borderRadius: "80px",  fontFamily: "'Lilita One'"}} >Savings Master</StyledButton>
          </Box>
          </Box>

          {/* Live Stats */}
          <Box sx={{ padding: 2, borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.2)", mt: 4 }}>
            <Typography variant="h6" sx={{ fontFamily: "'Lilita One'", fontSize: "18px" }}>
              "Over *,*** players are on their Finance Quest!"
            </Typography>
            <Box sx={{ width: "200px", height: "8px", backgroundColor: "#fff", borderRadius: "4px", mt: 1, position: "relative", margin: "0 auto" }}>
              <motion.div
                style={{ height: "8px", backgroundColor: "#00cac9", borderRadius: "4px", position: "absolute" }}
                initial={{ width: "0%" }}
                animate={{ width: "80%" }}
                transition={{ duration: 2 }}
              />
            </Box>
            <Typography variant="body2" sx={{ fontFamily: "'Lilita One'", fontSize: "14px", mt: 1 }}>
              "Can you reach the top?"
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
