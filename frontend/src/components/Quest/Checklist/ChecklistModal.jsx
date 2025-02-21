// src/components/ChecklistModal.jsx
import React from 'react';
import { Modal, Box, Typography, Checkbox } from '@mui/material';

const ChecklistModal = ({ open, onClose, isQuest1Completed }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        bgcolor: 'white', 
        p: 3, 
        borderRadius: 2, 
        maxWidth: 400, 
        margin: 'auto', 
        mt: '10%' 
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Quest Checklist</Typography>
        
        <div>
          <Checkbox checked={isQuest1Completed} disabled />
          <Typography variant="body1" component="span">
            Quest 1: Budgeting in Manila
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default ChecklistModal;
