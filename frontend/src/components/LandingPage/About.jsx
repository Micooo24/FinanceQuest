import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Home, SportsEsports, Article, TravelExplore, Info, Login, PlayArrow } from "@mui/icons-material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import HelpIcon from "@mui/icons-material/Help";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SchoolIcon from "@mui/icons-material/School";
import Navbar from './Navbar';

const aboutSections = [
  { title: "About Finance Quest", icon: <SportsEsportsIcon fontSize="large" />, details: "Finance Quest is a game where players level up by making smart financial decisions. Built with Python and Three.js, it offers immersive gameplay, strategic missions, and real-world financial learning.", bgColor: "#fff" },
  { title: "Our Mission", icon: <InfoIcon fontSize="large" />, details: "Empowering individuals with financial knowledge and tools to make smart decisions and achieve their goals.", bgColor: "#351742" },
  { title: "Our Team", icon: <PeopleIcon fontSize="large" />, details: "A passionate team dedicated to providing a comprehensive learning experience.", bgColor: "#009797" },
  { title: "Inclusivity", icon: <AccessibilityIcon fontSize="large" />, details: "Accessible financial education for everyone, no matter their background or experience level.", bgColor: "#351742" },
  { title: "Learning Resources", icon: <SchoolIcon fontSize="large" />, details: "A variety of learning resources, from articles to interactive lessons and quizzes to enhance your understanding.", bgColor: "#451d6b" },
];

const About = () => {
  const authToken = localStorage.getItem("authToken");
  return (
    <Box>
      <Navbar />

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
