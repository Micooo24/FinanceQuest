import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Home, SportsEsports, Article, TravelExplore, Info, Login } from "@mui/icons-material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import HelpIcon from "@mui/icons-material/Help";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SchoolIcon from "@mui/icons-material/School";

const aboutSections = [
  { title: "About Finance Quest", icon: <SportsEsportsIcon fontSize="large" />, details: "Finance Quest is a game where players level up by making smart financial decisions. Built with Python and Three.js, it offers immersive gameplay, strategic missions, and real-world financial learning.", bgColor: "#fff" },
  { title: "Our Mission", icon: <InfoIcon fontSize="large" />, details: "Empowering individuals with financial knowledge and tools to make smart decisions and achieve their goals.", bgColor: "#351742" },
  { title: "Our Team", icon: <PeopleIcon fontSize="large" />, details: "A passionate team dedicated to providing a comprehensive learning experience.", bgColor: "#009797" },
  { title: "Inclusivity", icon: <AccessibilityIcon fontSize="large" />, details: "Accessible financial education for everyone, no matter their background or experience level.", bgColor: "#351742" },
  { title: "Learning Resources", icon: <SchoolIcon fontSize="large" />, details: "A variety of learning resources, from articles to interactive lessons and quizzes to enhance your understanding.", bgColor: "#451d6b" },
];

const About = () => {
  return (
    <Box>
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
            <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}><Login /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Scrollable Sections */}
      {aboutSections.map((section, index) => (
        <Box
          key={index}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "linear-gradient(180deg, #5e3967, #351742)",
            color: "#fff",
            scrollSnapAlign: "start",
          }}

        >
          <Typography sx={{ color: "#00cac9"}}>
          {section.icon }
          </Typography>
          
          <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", mt: 6 }}>
            {section.title}
          </Typography>
          <Typography sx={{ mt: 2, fontSize: "1.2rem", maxWidth: "60%", fontFamily: "'Lilita One'" }}>
            {section.details}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default About;
