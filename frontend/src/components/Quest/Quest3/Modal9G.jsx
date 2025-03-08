import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal } from '@mui/material';

const Modal9G = ({ onContinue }) => {
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
          

          <Typography variant="body1" sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: "20px" }}>
          ✔ Pros: <br />
            ✅ Steady income and company benefits (e.g., discounts on meals). <br />
            ✅ Team-oriented work environment. <br />
            ✅ Experience in multitasking and efficiency. <br /> <br />
            ⚠ Cons: <br />
            ❌ Physically demanding (standing, lifting, working under pressure). <br />
            ❌ Shift work may interfere with study time. <br />
            ❌ Customer interactions can be stressful. <br />

          </Typography>

          <Button variant="h6" sx={{ color: '#000', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }} onClick={handleClose}>
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal9G;
