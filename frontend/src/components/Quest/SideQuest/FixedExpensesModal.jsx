import React from 'react';
import { Box, Typography, Button, Modal, Fade, Backdrop } from '@mui/material';

const FixedExpensesModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } },
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
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            p: 4,
            boxShadow: '0px 4px 10px rgba(140, 47, 199, 0.1)',
            border: '2px solid rgba(0, 0, 0, 0.8)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 'bold',
              color: '#000',
              mb: 2,
            }}
          >
            📜 Understanding Fixed vs. Variable Expenses
          </Typography>

          <Typography variant="body1" sx={{ fontFamily: "'Fraunces', serif", color: '#000', mb: 2 }}>
            One of the first steps in budgeting is distinguishing between fixed expenses and variable expenses.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#331540', mb: 1 }}>✅ Fixed Expenses</Typography>
          <Typography variant="body2" sx={{ color: '#000', mb: 1 }}>🏠 Rent/Mortgage – Housing costs.</Typography>
          <Typography variant="body2" sx={{ color: '#000', mb: 1 }}>🎓 Tuition Fees – School payments.</Typography>
          <Typography variant="body2" sx={{ color: '#000', mb: 2 }}>🔌 Utility Bills – Fixed services like internet or subscriptions.</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#009797', mb: 2 }}>
            💡 Why It Matters: These must always be prioritized in budgeting since they are essential for stability.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#8c2fc7', mb: 1 }}>🔄 Variable Expenses</Typography>
          <Typography variant="body2" sx={{ color: '#000', mb: 1 }}>🍜 Groceries & Food – Spending depends on choices.</Typography>
          <Typography variant="body2" sx={{ color: '#000', mb: 1 }}>🚕 Transportation – Varies based on travel frequency.</Typography>
          <Typography variant="body2" sx={{ color: '#000', mb: 2 }}>🎬 Entertainment & Leisure – Movie nights, dining out, shopping.</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#009797', mb: 2 }}>
            💡 Why It Matters: Managing variable expenses prevents overspending!
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#8c2fc7', color: '#fff', fontFamily: "'Cinzel', serif" }}
            onClick={onClose}
          >
            Back to Lesson Selection
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default FixedExpensesModal;
