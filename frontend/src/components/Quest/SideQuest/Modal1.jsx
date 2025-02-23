import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal } from '@mui/material';
import toast from 'react-hot-toast';

const Modal1 = ({ onContinue }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    toast('Go to the grocery store located near bank', { icon: '🏪' });
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
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -70%)',
            width: '80%',
            maxWidth: '100%',
            minWidth: '600px',
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
            📜 First Budgeting Side Quest
          </Typography>

          <Typography variant="body1" sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: "20px" }}>
            "Welcome to your First Budgeting Side Quest! Before tackling university expenses, you must first manage your daily survival budget. Smart choices today will affect your financial future!"
          </Typography>

          <Typography variant="h6" sx={{ color: '#000', mb: 2, fontFamily: "'Cinzel', serif", fontWeight: 'bold' }}>
            Side Quest Task: 
          </Typography>

          <Box sx={{ textAlign: 'left', display: 'inline-block', mb: 2 }}>
            <Typography variant="body1" sx={{ color: '#000', fontFamily: "'Fraunces', serif", fontSize: "18px" }}>
              <ul>
                <li> Smart Grocery Shopping – Pick affordable and nutritious food without exceeding ₱2,000.</li>
              </ul>
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: "16px" }}>
            📜 Instructions: Guide Liza to the convenience store and help her shop wisely.
          </Typography>

          <Button variant="h6" sx={{ color: '#000', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }} onClick={handleClose}>
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal1;