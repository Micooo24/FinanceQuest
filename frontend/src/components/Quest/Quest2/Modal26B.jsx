import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal26B = ({ onContinue }) => {
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
            💸 Withdraw ₱500 for Unplanned Spending
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
              color: '#000',
            }}
          >
            **⚠ Consequences:**  <br></br>
            ❌ Lost the chance to start saving.  <br />
            ❌ Less money for important needs.  
            ❌ Risk of overspending.  
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: "15px",
              fontStyle: "italic",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid rgba(0, 0, 0, 0.8)",
              color: '#000',
            }}
          >
            🎙 Narration: Liza realizes she may have spent too much too soon. She now has to work on better money management.
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
            onClick={handleContinue}
          >
            📖 Continue to the Next Lesson
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal26B;
