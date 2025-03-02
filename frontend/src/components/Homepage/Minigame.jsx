import { Box, Typography, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Minigame() {
  const [selectedGame, setSelectedGame] = useState(0);

  const gameData = [
    {
      title: "Savings", 
      image: "/assets/savings.jpg",
      description: "Master the art of saving for future goals and emergencies."
    },
    {
      title: "Investing", 
      image: "/assets/investing.jpg",
      description: "Understand the basics of investing and how to grow your wealth."
    }
  ];

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setSelectedGame((prev) => (prev + 1) % gameData.length);
    } else if (event.key === "ArrowLeft") {
      setSelectedGame((prev) => (prev - 1 + gameData.length) % gameData.length);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Reset selected game if it's out of bounds after removing budgeting
  useEffect(() => {
    if (selectedGame >= gameData.length) {
      setSelectedGame(0);
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #5e3967, #351742, #2A1136)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background with parallax effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <img
          src="/assets/bg.jpg"
          alt="Game Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.3,
            filter: "blur(5px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at center, transparent 0%, #351742 90%)",
            mixBlendMode: "multiply",
          }}
        />
      </Box>
      
      {/* Header */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          position: "relative",
          zIndex: 2,
          mt: 6,
          mb: 8,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontFamily: "'Gravitas One', sans-serif",
            fontSize: { xs: "40px", sm: "50px", md: "60px" },
            textAlign: "center",
            textShadow: "0 4px 15px rgba(0,0,0,0.4)",
            letterSpacing: "3px",
            fontWeight: "bold",
            background: "linear-gradient(45deg, #B399D4, #E8D3F0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MINIGAMES
        </Typography>
        <Box
          sx={{
            width: "100px",
            height: "4px",
            background: "linear-gradient(90deg, transparent, #B399D4, transparent)",
            margin: "10px auto",
            borderRadius: "2px",
          }}
        />
      </Box>

      {/* Game Card Container */}
      <Container
        maxWidth="lg"
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { xs: 2, md: 4 },
          zIndex: 2,
          my: 3,
        }}
      >
        {gameData.map((game, index) => (
          <Box
            component={motion.div}
            key={index}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              y: -5
            }}
            animate={{ 
              scale: selectedGame === index ? 1.05 : 1,
              y: selectedGame === index ? -5 : 0,
            }}
            onClick={() => setSelectedGame(index)}
            sx={{
              position: "relative",
              width: { xs: "85%", sm: "280px" },
              height: "320px",
              borderRadius: "16px",
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
              border: selectedGame === index 
                ? "1px solid rgba(255, 255, 255, 0.3)" 
                : "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: selectedGame === index 
                ? "0 8px 32px rgba(121, 74, 148, 0.5)" 
                : "0 4px 12px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            <Box
              sx={{
                height: "65%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={game.image}
                alt={game.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  transform: selectedGame === index ? "scale(1.05)" : "scale(1)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40px",
                  background: "linear-gradient(transparent, rgba(53, 23, 66, 0.8))",
                }}
              />
            </Box>
            
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "35%",
                padding: "0 20px",
                position: "relative",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "600",
                  textAlign: "center",
                  fontFamily: "'Fraunces', serif",
                  letterSpacing: "1px",
                  mb: 1,
                }}
              >
                {game.title}
              </Typography>
              
              {selectedGame === index && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  sx={{
                    position: "absolute",
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40px",
                    height: "4px",
                    borderRadius: "2px",
                    background: "linear-gradient(90deg, #B399D4, #9F84BD)",
                  }}
                />
              )}
            </Box>
          </Box>
        ))}
      </Container>

      {/* Description Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        layoutId="gameDescription"
        sx={{
          position: "relative",
          zIndex: 2,
          width: { xs: "90%", md: "70%" },
          maxWidth: "900px",
          mt: 5,
          mb: 4,
          padding: "20px 30px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.07)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          component={motion.p}
          key={selectedGame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            color: "white",
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: 1.6,
            fontWeight: "400",
            fontFamily: "'Fraunces', serif",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          {gameData[selectedGame].description}
        </Typography>
      </Box>
    </Box>
  );
}

export default Minigame;