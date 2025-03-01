import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal23B = ({ onContinue }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
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
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" } },
      }}
    >
      <Fade in={showModal}>
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "85%",
            maxWidth: "600px",
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
            🏧 ATM Card Activation
          </Typography>

          

          <Typography
            sx={{
              mt: 2,
              fontSize: "14px",
              textAlign: "left",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid rgba(0, 0, 0, 0.8)",
              color: '#000',
            }}
          >
            ✅ Steps to activate via ATM:
            <br /> - Insert the debit card 🏧  
            <br /> - Select "Card Activation" option  
            <br /> - Enter default PIN (from the bank) 🔢  
            <br /> - Set a new 6-digit PIN for security 🔒  
            <br /> - Activation complete! 🎉  
          </Typography>

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
            onClick={handleClose}
          >
            ✅ Done! Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal23B;
