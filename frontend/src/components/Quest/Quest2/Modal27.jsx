import React, { useState, useEffect } from "react"; 
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material"; 

const Modal27 = ({ onContinue }) => { 
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
            📚 New Lesson Unlocked: Banking & Smart Money Management
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
                A bank account is more than just a place to store money—it’s a financial tool that helps with security, budgeting, and long-term savings.
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  fontSize: "14px",
                  textAlign: "left",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid rgba(0, 0, 0, 0.8)",
                  color: "#000",
                }}
              >
                Why Banking Matters:
                <br />
                ✅ Security & Protection – Keeps your money safe from theft or loss. <br />
                <br />
                ✅ Budgeting & Tracking  – Digital transactions help you manage finances better. <br />
                <br />
                ✅ Long-term Growth – Savings accounts offer interest, making your money work for you. <br />
                <br />
                ✅ Smart Financial Habits – Helps young earners develop responsible spending behaviors. <br />
              </Typography>
            </Box>

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
                Many people, especially students, rely only on cash, not realizing the benefits of proper banking. This lesson introduces key banking insights to help you make the most out of your money.
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
            🎁 Continue to Banking Insights
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal27;
