// src/components/Checklist/SideQuestChecklistModal.jsx
import React from 'react';
import { Modal, Box, Typography, Checkbox } from '@mui/material';

const SideQuestChecklistModal = ({ open, onClose, isSideQuest1Completed }) => {
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
        <Typography variant="h5" sx={{ mb: 2 }}>Side Quest Checklist</Typography>
        
        <div>
          <Checkbox checked={isSideQuest1Completed} disabled />
          <Typography variant="body1" component="span">
            Side Quest 1: Budgeting Challenge
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default SideQuestChecklistModal;
