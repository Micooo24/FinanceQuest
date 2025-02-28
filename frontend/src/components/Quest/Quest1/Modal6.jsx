import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal } from '@mui/material';
import { quest1Decision } from '../../Utils/decisions';
import toast from 'react-hot-toast';

const Modal6RentDecision = ({ onSelectChoice, setPlayerStats }) => {
  const [showModal, setShowModal] = useState(true);
  
  const handleChoice = async (choice) => {
    setShowModal(false);
    try {
      await quest1Decision(choice, (updatedStats) => {
        setPlayerStats(updatedStats);
        if (choice === 'pay') {
          toast.success('You paid rent ₱2,500.');
          toast.success('+10 points');
        } else if (choice === 'delay') {
          toast.success('You chose to delay, deduct ₱500.');
          toast.success('+5 points');
        }
      });
    } catch (error) {
      console.error('Error handling choice:', error);
    }
    onSelectChoice(choice); // Pass the player's decision to the parent component
  };

  useEffect(() => {
    document.documentElement.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
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
            🎮 Your Choice
          </Typography>

          <Typography variant="body1" sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: "20px" }}>
            You need to decide how to handle your rent payment:
          </Typography>

          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#8c2fc7',
              color: '#fff', 
              fontFamily: "'Cinzel', serif", 
              fontWeight: 'bold',
              m: 1
            }} 
            onClick={() => handleChoice('pay')}
          >
            ✅ A. Pay rent immediately (-₱2,500, ensures financial security but reduces cash on hand)
          </Button>

          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#009797',
              color: '#fff', 
              fontFamily: "'Cinzel', serif", 
              fontWeight: 'bold',
              m: 1
            }} 
            onClick={() => handleChoice('delay')}
          >
            ⏳ B. Delay payment until the deadline (I'll stay ₱5000 for now but risks late fees and the landlord’s trust)
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal6RentDecision;