import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal } from '@mui/material';

const Modal8B_LandlordResponse = ({ onContinue }) => {
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
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -40%)',
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
              width: '15%',
              fontWeight: 'bold',
              color: '#000',
              transform: 'translate(-50%, -50%)',
              border: '2px solid rgba(0, 0, 0, 0.8)',
            }}
          >
            💬 NPC - Landlord
          </Typography>

          <Typography variant="body1" sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: '20px' }}>
            The landlord raises an eyebrow. "Alright… just don’t forget. Late payments come with a penalty fee!"
          </Typography>

          <Typography
            variant="h6"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '5px 10px',
              borderRadius: '5px',
              fontFamily: "'Cinzel', serif",
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#000',
              border: '2px solid rgba(0, 0, 0, 0.8)',
              display: 'inline-block',
              mb: 2,
            }}
          >
            💡 Outcome
          </Typography>

          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography variant="body1" sx={{ color: '#000', fontFamily: "'Fraunces', serif", fontSize: '18px' }}>
              ✔ More Cash on Hand: Can be used for opportunities or emergencies.
            </Typography>
            <Typography variant="body1" sx={{ color: '#ff0000', fontFamily: "'Fraunces', serif", fontSize: '18px' }}>
              ❌ Risk Factor: If not careful, money might be spent impulsively.
            </Typography>
          </Box>

          <Button
            variant="h6"
            sx={{ color: '#000', fontFamily: "'Cinzel', serif", fontWeight: 'bold', mt: 2 }}
            onClick={handleClose}
          >
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal8B_LandlordResponse;
