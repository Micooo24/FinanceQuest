import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function Minigame() {
  const [selectedGame, setSelectedGame] = useState(0);

  const gameData = [
    {
      title: "Budgeting", 
      image: "/assets/money.jpg", // Image path for Budgeting
      description: "Learn how to manage your finances by creating and following a budget."
    },
    {
      title: "Savings", 
      image: "/assets/savings.jpg", // Image path for Saving
      description: "Master the art of saving for future goals and emergencies."
    },
    {
      title: "Investing", 
      image: "/assets/investing.jpg", // Image path for Investing
      description: "Understand the basics of investing and how to grow your wealth."
    }
  ];

  // Handle keyboard navigation (left and right)
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setSelectedGame((prev) => (prev + 1) % gameData.length); // Next game
    } else if (event.key === "ArrowLeft") {
      setSelectedGame((prev) => (prev - 1 + gameData.length) % gameData.length); // Previous game
    }
  };

  useEffect(() => {
    // Adding event listener for keyboard events
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #5e3967, #351742)", // Gradient background
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <img
        src="/assets/bg.jpg" // Your background image
        alt="Game Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3, // Background opacity
          filter: "blur(5px)", // Background blur effect
        }}
      />
      
      {/* Mini-Games Header */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontFamily: "'Gravitas One', sans-serif",
            fontSize: "60px",
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          MINIGAMES
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 3,
          p: 3,
          borderRadius: 3,
          width: "80vw",
          height: "60vh",
          color: "white",
          zIndex: 1,
          mt: 10,
          overflowX: "hidden",
        }}
      >
        {/* Game Options (Horizontal layout) */}
        {gameData.map((game, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 250,
              height: 300,
              backgroundColor: "#351742",
              borderRadius: 2,
              padding: 2,
              cursor: "pointer",
              marginBottom: "20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              transform: selectedGame === index ? "scale(1.05)" : "scale(1)", // Scale on selection
              ":hover": {
                transform: "scale(1.05)",
                backgroundColor: "#5e3967",
                
              },
            }}
          >
            <img
              src={game.image}
              alt={game.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <Typography
              sx={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 5,
                fontFamily: "'Fraunces', sans-serif",   
              }}
            >
              {game.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Description Section (Outside the container) */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          maxWidth: "80%",
          textAlign: "center",
          backgroundColor: "#5e3967",
          padding: 2,
          borderRadius: 2,
          
        }}
      >
        <Typography
          sx={{
            color: "white",
            width: "1000px",
            fontSize: "15px",
            fontWeight: "normal",
            fontFamily: "'Fraunces', sans-serif",  
          }}
        >
          {gameData[selectedGame].description}
        </Typography>
      </Box>
    </Box>
  );
}

export default Minigame;
