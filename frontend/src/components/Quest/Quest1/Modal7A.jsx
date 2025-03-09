import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal } from '@mui/material';
import axios from 'axios';

const Modal7A_PayRent = ({ onContinue }) => {
  const [showModal, setShowModal] = useState(true);
  const [username, setUsername] = useState('');

  const handleClose = () => {
    setShowModal(false);
    onContinue(); // Move to the next modal
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const authToken = localStorage.getItem('authToken');
      const email = localStorage.getItem('email'); // Assuming you store the user's email in localStorage
      try {
        const userResponse = await axios.get("http://127.0.0.1:8000/admin/get-users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const user = userResponse.data.users.find(user => user.email === email);
        setUsername(user.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

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
      disableBackdropClick
      disableEscapeKeyDown
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
            💬 {username}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: '#000', mb: 2, fontFamily: "'Fraunces', serif", fontSize: "20px" }}
          >
            "Here’s my ₱2,500 for rent. I’ll make sure to pay early every month."
          </Typography>

          <Button
            variant="h6"
            sx={{ color: '#000', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }}
            onClick={handleClose}
          >
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal7A_PayRent;