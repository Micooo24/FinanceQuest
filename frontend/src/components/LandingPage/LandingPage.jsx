import React, { useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import Navbar from "./Navbar"; // Import the Navbar component

// Styled Button
const SpotlightButton = styled(motion.button)({
  position: "relative",
  overflow: "hidden",
  border: "none",
  borderRadius: "50px",
  backgroundColor: "#331540",
  color: "#fff",
  width: "250px",
  padding: "15px 20px",
  fontFamily: "'Lilita One'",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "transform 0.3s",
  zIndex: 10,
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const LandingPage = () => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);
  const [clicked, setClicked] = useState(false); // To track click state

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { left, width } = btnRef.current.getBoundingClientRect();
      const offset = e.clientX - left;
      const leftPos = `${(offset / width) * 100}%`;

      spanRef.current.animate(
        { left: leftPos },
        { duration: 250, fill: "forwards" }
      );
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    if (btnRef.current) {
      btnRef.current.addEventListener("mousemove", handleMouseMove);
      btnRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (btnRef.current) {
        btnRef.current.removeEventListener("mousemove", handleMouseMove);
        btnRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleBuildingClick = () => {
    setClicked(true);
    // Reset click state after the flip animation duration
    setTimeout(() => {
      setClicked(false);
    }, 1000); // Adjust duration as needed
  };

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
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 50px 0 0px",
          zIndex: 1,
        }}
      >
        {/* Left Section */}
        <Box sx={{ width: "50%", textAlign: "center", ml: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Gravitas One'",
              fontSize: "55px",
              fontWeight: "bold",
            }}
          >
            MASTER YOUR FINANCES, ONE QUEST AT A TIME
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Lilita One'",
              fontSize: "20px",
              color: "#fff",
              mt: 2,
              mb: 2,
            }}
          >
            Learn to budget, save, and invest through engaging real-life
            scenarios.
          </Typography>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <SpotlightButton whileTap={{ scale: 0.98 }} ref={btnRef}>
              SIGNUP
              <span
                ref={spanRef}
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  height: "120px",
                  width: "120px",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "100% ",
                  background: "#8c2fc7",
                  transition: "left 0.25s ease",
                  zIndex: -1,
                }}
              />
            </SpotlightButton>
          </Link>
        </Box>

        {/* Right Section: Animated PNGs */}
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Pulsing & Flipping Building */}
          <motion.img
            src="/assets/building.png"
            alt="Building"
            style={{
              width: "450px",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotateY: clicked ? 180 : 0, // Apply flip effect when clicked
            }}
            transition={{
              repeat: Infinity,
              duration: clicked ? 1 : 2, // Flip duration
              ease: "easeInOut",
            }}
            onClick={handleBuildingClick}
          />

          {/* Swirling Sand */}
          <motion.img
            src="/assets/sand.png"
            alt="Sand"
            style={{
              width: "150px",
              position: "absolute",
              top: "30%",
              left: "40%",
              transform: "translate(-10%, -50%)",
              cursor: "grab",
            }}
            drag
            dragElastic={0.5}
            animate={{
              y: ["0%", "-150%", "0%", "-150%", "0%"],
              x: ["0%", "100%", "0%", "-100%", "0%"],
              scale: [1, 1.1, 1], // Ensuring scaling animation is continuous
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />

          {/* Floating Cash */}
          <motion.img
            src="/assets/cash.png"
            alt="Cash"
            style={{
              width: "150px",
              position: "absolute",
              top: "30%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              cursor: "grab",
            }}
            drag
            dragElastic={0.5}
            animate={{
              y: ["0%", "150%", "0%", "150%", "0%"],
              x: ["0%", "-150%", "0%", "150%", "0%"],
              scale: [1, 1.1, 1], // Ensuring scaling animation is continuous
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />

          {/* Floating Piggy Bank */}
          <motion.img
            src="/assets/piggybank.png"
            alt="Piggy Bank"
            style={{
              width: "150px",
              position: "absolute",
              top: "30%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              cursor: "grab",
            }}
            drag
            dragElastic={0.5}
            animate={{
              y: ["0%", "180%", "0%", "180%", "0%"],
              x: ["0%", "150%", "0%", "-150%", "0%"],
              scale: [1, 1.1, 1], // Ensuring scaling animation is continuous
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />
        </Box>

        {/* Neon Purple Light Sprinkles Effect */}
        {[...Array(30)].map((_, index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              bottom: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: "#8c2fc7",
              animation: "sprinkleAnimation 2s infinite",
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 2 + 1,
              delay: Math.random(),
              ease: "easeInOut",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LandingPage;