import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import SavingsIcon from "@mui/icons-material/Savings";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalculateIcon from "@mui/icons-material/Calculate";
import SchoolIcon from "@mui/icons-material/School";
import Navbar from "./Navbar"; // Import the Navbar component

const features = [
  { title: "Real-Life Scenarios", icon: <AccountBalanceIcon fontSize="large" />, details: "Explore realistic financial situations and learn by making impactful decisions in a simulated environment." },
  { title: "Budgeting Mastery", icon: <BarChartIcon fontSize="large" />, details: "Master the art of budgeting to balance expenses, plan savings, and optimize your financial life." },
  { title: "Savings Goals", icon: <SavingsIcon fontSize="large" />, details: "Set achievable savings goals and learn strategies to make them a reality through smart planning." },
  { title: "Debt Management", icon: <TrendingUpIcon fontSize="large" />, details: "Understand effective techniques to manage and reduce debt while maintaining financial stability." },
  { title: "Financial Tools", icon: <CalculateIcon fontSize="large" />, details: "Access advanced tools to track expenses, plan budgets, and calculate savings for better control over finances." },
  { title: "Learning Hub", icon: <SchoolIcon fontSize="large" />, details: "Expand your knowledge with a variety of resources, including articles, guides, and interactive quizzes." },
];

const GameFeatures = () => {
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
    
        textAlign: "center",
      }}
    >
      <Navbar />

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

      {/* Horizontally Scrollable Feature Cards */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 4,
          width: "100%",
          maxWidth: "1200px",
          margin: "auto",
          mb: 10,
          mt: 5,
          paddingBottom: "20px",
          
          // Custom scrollbar for the cards container
          "&::-webkit-scrollbar": {
            height: "10px", // Horizontal scrollbar height
          },
          "&::-webkit-scrollbar-track": {
            background: "#5e3967", // Scrollbar track color
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#8c2fc7", // Scrollbar thumb color
            borderRadius: "10px",
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.3 }}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(184, 49, 243, 0.8)" }}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              padding: "1.9rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              minWidth: "350px",  // Ensure proper width for each card
              height: "40vh",
              marginTop: 20,
              marginLeft: 20,
              borderRadius: "15px"
            }}
          >
            {/* Spinning Coin Effect */}
            <motion.div
              animate={{ rotateY: 180 }}
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