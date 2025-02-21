import React from 'react';
import { Box, Typography, Button, Modal, Fade, Backdrop } from '@mui/material';

const BudgetCapModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
      }}
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
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            📜 Setting a Budget Cap
          </Typography>
          <Typography variant="body1" paragraph>
            A budget cap sets a spending limit to prevent financial instability.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>📝 Steps to Set a Budget Cap:</Typography>
          <Typography variant="body2">1️⃣ Identify Upcoming Costs – Rent, tuition, transportation, emergencies.</Typography>
          <Typography variant="body2">2️⃣ Set Limits for Non-Essentials – Example: ₱200 max per week on leisure.</Typography>
          <Typography variant="body2">3️⃣ Stick to the Budget – Track expenses and adjust spending habits.</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>💡 Example: (Liza’s Budget Cap Plan)</Typography>
          <Typography variant="body2">🛒 Groceries: ₱1,200 max per week.</Typography>
          <Typography variant="body2">🚕 Transportation: ₱500 per week.</Typography>
          <Typography variant="body2">🍹 Leisure (Milk Tea, Snacks): ₱150 max per week.</Typography>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            Budget caps help control spending and secure future finances!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onClose} 
            sx={{ mt: 3, fontWeight: 'bold' }}
          >
            ✅ Back to Lesson Selection
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BudgetCapModal;