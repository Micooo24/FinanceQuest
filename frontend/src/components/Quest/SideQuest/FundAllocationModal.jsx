import React from 'react';
import { Box, Typography, Button, Modal, Backdrop, Fade } from '@mui/material';

const FundAllocationModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Cinzel, serif', color: '#000' }}>
            📊 Fund Allocation (50-30-20 Rule)
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Fraunces, serif', fontSize: '18px', color: '#000' }}>
            A balanced budget distributes income efficiently across different categories.
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold', color: '#000' }}>
            ✔ 50% Essentials – Rent, food, transportation, tuition.<br/>
            ✔ 30% Wants – Shopping, entertainment, dining out.<br/>
            ✔ 20% Savings & Investments – Emergency funds, future expenses.
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, color: '#000' }}>
            💡 Example: (If Liza has ₱5,000)
          </Typography>

          <Typography variant="body1" sx={{ mt: 1, color: '#000', fontWeight: 'bold' }}>
            ₱2,500 (50%) → Essentials<br/>
            ₱1,500 (30%) → Wants<br/>
            ₱1,000 (20%) → Savings
          </Typography>

          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: '#000' }}>
            💡 Why It Matters: Proper allocation ensures financial security while allowing responsible spending.
          </Typography>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 3, bgcolor: '#8c2fc7', color: '#fff', fontFamily: 'Cinzel, serif', fontWeight: 'bold' }}
          >
            Back to Lesson Selection
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default FundAllocationModal;
