import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal10 = ({ onContinue }) => {
  const [showModal, setShowModal] = useState(true);

  const handleContinue = () => {
    setShowModal(false);
    onContinue();
  };

  useEffect(() => {
    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" } } }}
    >
      <Fade in={showModal}>
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "85%",
            maxWidth: "1000px",
            maxHeight: "80vh", // Set maximum height
            overflowY: "auto", // Enable vertical scrolling
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            p: 4,
            boxShadow: "0px 4px 10px rgba(140, 47, 199, 0.1)",
            border: "2px solid rgba(0, 0, 0, 0.8)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Cinzel', serif",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#000",
              border: "2px solid rgba(0, 0, 0, 0.8)",
              display: "inline-block",
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            🎉 Bonus Quest Completed!
            ✔ New Lesson Unlocked: Future Investments
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontStyle: "italic",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid rgba(0, 0, 0, 0.8)",
                  color: "#000",
                }}
              >
                Investing isn’t just about making money—it’s about building financial security, growing wealth, and preparing for the future. Many people hesitate to invest, thinking it’s complicated or risky, but the right investment strategies can help you maximize your earnings while managing risks. This lesson introduces key investment insights to help you make smart financial decisions and grow your money over time.
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              width: "100%",
              fontWeight: "bold",
              fontFamily: "'Cinzel', serif",
              backgroundColor: "#00cac9",
              color: "white",
              "&:hover": { backgroundColor: "#009797" },
            }}
            onClick={handleContinue}
          >
            🎁 Continue to New Lesson
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal10;