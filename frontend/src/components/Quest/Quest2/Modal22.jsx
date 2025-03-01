import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal22 = ({ onContinue }) => {
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
      onClose={handleClose}
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
            maxWidth: "580px",
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
                position: 'absolute',
                top: '0px',
                left: '120px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '5px 10px',
                borderRadius: '5px',
                fontFamily: "'Cinzel', serif",
                fontSize: '18px',
                width: '25%',
                fontWeight: 'bold',
                color: '#000',
                transform: 'translate(-50%, -50%)',
                border: '2px solid rgba(0, 0, 0, 0.8)',
            }}
          >
            💬 Bank Teller:
          </Typography>

          <Typography
            variant="body1" sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: "20px" }}
            >
            "There are two ways: either through online banking or at an ATM. If
            you choose online banking, you’ll register your account through our
            mobile app. If you prefer the ATM, just insert the card, enter your
            PIN, and follow the activation steps."
          </Typography>

          

           <Button
                variant="h6" sx={{ color: '#000', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }} onClick={handleClose}
            >
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal22;
