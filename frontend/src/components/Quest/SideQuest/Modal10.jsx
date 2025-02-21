import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal } from '@mui/material';

const Modal10 = ({ onContinue }) => {
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
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center',
            p: 4,
            boxShadow: '0px 4px 10px rgba(140, 47, 199, 0.1)',
            border: '2px solid rgba(0, 0, 0, 0.8)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              top: '0px',
              left: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '5px 10px',
              borderRadius: '5px',
              fontFamily: "'Cinzel', serif",
              fontSize: '18px',
              width: '40%',
              fontWeight: 'bold',
              color: '#000',
              transform: 'translate(-50%, -50%)',
              border: '2px solid rgba(0, 0, 0, 0.8)',
            }}
          >
            📜 Narration
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#000',
              mb: 2,
              mt: 4,
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
            }}
          >
            "With little money left, Liza must now find a way to cover upcoming expenses. She may need to take on extra work or make difficult choices ahead."
          </Typography>

          

          <Button
            variant="h6"
            sx={{
              color: '#000',
              fontFamily: "'Cinzel', serif",
              fontWeight: 'bold',
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

export default Modal10;
