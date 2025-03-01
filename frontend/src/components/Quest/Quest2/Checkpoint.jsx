import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal } from '@mui/material';
import toast from 'react-hot-toast';

const Checkpoint = ({ onContinue }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    toast('Proceed to the bank for further instructions', { icon: '🏦' });
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
            🏦 Quest 2 Bank
          </Typography>

          <Typography variant="body1" sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: "20px" }}>
            "In the quest to learn about banking, you must first understand the basics of opening a bank account."
          </Typography>

          <Typography variant="h6" sx={{ color: '#000', mb: 2, fontFamily: "'Cinzel', serif", fontWeight: 'bold' }}>
            Bank Overview:
          </Typography>

          <Box sx={{ textAlign: 'left', display: 'inline-block', mb: 2 }}>
            <Typography variant="body1" sx={{ color: '#000', fontFamily: "'Fraunces', serif", fontSize: "18px" }}>
              <ul>
                <li> Learn how to open a bank account.</li>
                <li> Understand the importance of savings and interest rates.</li>
                <li> Get familiar with different types of bank accounts and their benefits.</li>
              </ul>
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: "16px" }}>
            🏦 Instructions: Go to Bank near the market
          </Typography>

          <Button variant="h6" sx={{ color: '#000', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }} onClick={handleClose}>
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Checkpoint;