import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Home, SportsEsports, Article, TravelExplore, Info, Login, PlayArrow } from "@mui/icons-material";
import SavingsIcon from "@mui/icons-material/Savings";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalculateIcon from "@mui/icons-material/Calculate";
import SchoolIcon from "@mui/icons-material/School";

const features = [
  { title: "Real-Life Scenarios", icon: <AccountBalanceIcon fontSize="large" />, details: "Explore realistic financial situations and learn by making impactful decisions in a simulated environment." },
  { title: "Budgeting Mastery", icon: <BarChartIcon fontSize="large" />, details: "Master the art of budgeting to balance expenses, plan savings, and optimize your financial life." },
  { title: "Savings Goals", icon: <SavingsIcon fontSize="large" />, details: "Set achievable savings goals and learn strategies to make them a reality through smart planning." },
  { title: "Debt Management", icon: <TrendingUpIcon fontSize="large" />, details: "Understand effective techniques to manage and reduce debt while maintaining financial stability." },
  { title: "Financial Tools", icon: <CalculateIcon fontSize="large" />, details: "Access advanced tools to track expenses, plan budgets, and calculate savings for better control over finances." },
  { title: "Learning Hub", icon: <SchoolIcon fontSize="large" />, details: "Expand your knowledge with a variety of resources, including articles, guides, and interactive quizzes." },
];

const GameFeatures = () => {
  const authToken = localStorage.getItem("authToken");

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #5e3967, #351742)",
        color: "#fff",
        overflow: "auto",
        textAlign: "center",
      }}
    >
      {/* Navigation Bar */}
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
          height: "10%",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
          <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
            Finance Quest
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <IconButton component={Link} to="/" sx={{ color: "#fff" }}><Home /></IconButton>
            <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}><SportsEsports /></IconButton>
            <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}><Article /></IconButton>
            <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}><TravelExplore /></IconButton>
            <IconButton component={Link} to="/about" sx={{ color: "#fff" }}><Info /></IconButton>
            {authToken ? (
              <IconButton component={Link} to="/start" sx={{ color: "#fff" }}><PlayArrow /></IconButton>
            ) : (
              <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}><Login /></IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box sx={{ textAlign: "center", mt: 15, mb: 5 }}>
          <Typography variant="h2" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", color: "#fff", fontSize: "50px" }}>
            GAME FEATURES
          </Typography>
        </Box>
      </motion.div>

      {/* Feature Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 4,
          width: "90%",
          maxWidth: "1200px",
          margin: "auto",
          mb: 10
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(184, 49, 243, 0.8)" }}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "15px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}
          >
            {/* Spinning Coin Effect */}
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {feature.icon}
            </motion.div>

            <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "'Lilita One'", mt: 2 }}>
              {feature.title}
            </Typography>
            <Typography sx={{ mt: 1, fontFamily: "'Lilita One'" }}>{feature.details}</Typography>

            
            
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default GameFeatures;
