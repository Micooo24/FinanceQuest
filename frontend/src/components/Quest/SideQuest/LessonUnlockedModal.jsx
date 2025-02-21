import React, { useState } from 'react';
import { Box, Typography, Button, Modal, Fade, Backdrop } from '@mui/material';
import FixedExpensesModal from './FixedExpensesModal';
import FundAllocationModal from './FundAllocationModal';
import BudgetCapModal from './BudgetCapModal';

const LessonUnlockedModal = ({ open, onClose }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleOpenLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseLesson = () => {
    setSelectedLesson(null);
  };

  return (
    <>
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
              borderRadius: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              p: 4,
              boxShadow: '0px 4px 10px rgba(140, 47, 199, 0.3)',
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontFamily: "'Cinzel', serif", fontWeight: 'bold', color: '#000' }}
            >
              📚 Financial Planning Lessons
            </Typography>
            <Typography variant="body1" sx={{ my: 2, fontFamily: "'Fraunces', serif", color: '#000' }}>
              "Proper financial planning helps individuals manage their money wisely, avoid unnecessary debt, 
              and prepare for future financial needs. In this lesson, we’ll break down key concepts like 
              fixed vs. variable expenses, fund allocation, and budget caps to ensure financial stability."
            </Typography>
            <Button variant="contained" sx={{ my: 1 }} onClick={() => handleOpenLesson('fixed')}>Understanding Fixed vs. Variable Expenses</Button>
            <Button variant="contained" sx={{ my: 1 }} onClick={() => handleOpenLesson('funds')}>Allocating Funds for Savings & Essentials</Button>
            <Button variant="contained" sx={{ my: 1 }} onClick={() => handleOpenLesson('budget')}>Setting a Budget Cap</Button>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={onClose}>Close</Button>
          </Box>
        </Fade>
      </Modal>

      {selectedLesson === 'fixed' && <FixedExpensesModal open={true} onClose={handleCloseLesson} />}
      {selectedLesson === 'funds' && <FundAllocationModal open={true} onClose={handleCloseLesson} />}
      {selectedLesson === 'budget' && <BudgetCapModal open={true} onClose={handleCloseLesson} />}
    </>
  );
};

export default LessonUnlockedModal;