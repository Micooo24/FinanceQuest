import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal } from '@mui/material';

const Modal11 = ({ onContinue }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    onContinue();
  };

  useEffect(() => {
    document.documentElement.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } },
      }}
    >
      <Fade in={showModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            p: 4,
            boxShadow: '0px 4px 10px rgba(140, 47, 199, 0.2)',
            border: '2px solid rgba(0, 0, 0, 0.8)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              top: '0px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '5px 15px',
              borderRadius: '5px',
              fontFamily: "'Cinzel', serif",
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#000',
              border: '2px solid rgba(0, 0, 0, 0.8)'
            }}
          >
            ✔ Smart Financial Choice
          </Typography>

          <Typography variant="body1" sx={{ color: '#000', mt: 4, mb: 2, fontFamily: "'Fraunces', serif", fontSize: "20px" }}>
            "Phew! I managed to buy enough food while keeping extra money for my university expenses. That was harder than I thought."
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#8c2fc7',
              color: '#fff',
              fontFamily: "'Cinzel', serif",
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#451d6b' },
            }}
            onClick={handleClose}
          >
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal11;
