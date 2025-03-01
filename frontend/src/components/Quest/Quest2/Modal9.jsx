import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal, Divider } from '@mui/material';

const Modal9 = ({ onContinue }) => {
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
            ✔ Pros & ⚠ Cons of a Debit Card
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#008000',
              fontWeight: 'bold',
              fontFamily: "'Fraunces', serif",
              mt: 2,
              fontSize: "20px",
            }}
          >
            ✔ Pros:
          </Typography>
          <Typography variant="body1" sx={{ color: '#000', fontFamily: "'Fraunces', serif", fontSize: "18px" }}>
            ✅ Encourages financial responsibility. <br />
            ✅ Safer than carrying cash. <br />
            ✅ Helps track expenses through bank statements. <br />
            ✅ Teaches early budgeting skills.
          </Typography>

          <Divider sx={{ my: 2, backgroundColor: 'black' }} />

          <Typography
            variant="h6"
            sx={{
              color: '#FF0000',
              fontWeight: 'bold',
              fontFamily: "'Fraunces', serif",
              fontSize: "20px",
            }}
          >
            ⚠ Cons:
          </Typography>
          <Typography variant="body1" sx={{ color: '#000', fontFamily: "'Fraunces', serif", fontSize: "18px" }}>
            ❌ Cannot be used if the account has insufficient funds. <br />
            ❌ Some transactions may have fees. <br />
            ❌ Requires careful monitoring to avoid accidental overspending.
          </Typography>

          <Button variant="h6" sx={{ color: '#000', fontFamily: "'Cinzel', serif", fontWeight: 'bold', mt: 2 }} onClick={handleClose}>
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal9;
