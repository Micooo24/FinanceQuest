import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Fade, Backdrop, Modal, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { quest2Decision } from '../../Utils/decisions';
import { toast } from 'react-hot-toast';
// import { GameContext } from '../../Game/Context/GameContext';

const Modal12 = ({ onContinue }) => {
  // const { setPlayerStats } = useContext(GameContext);
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    address: '',
    mobileNumber: '',
    email: '',
    sourceOfFunds: '',
    motherMaidenName: '',
    onlineBanking: false,
    atmCard: false,
    initialDeposit: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth Date is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.sourceOfFunds) newErrors.sourceOfFunds = 'Source of Funds is required';
    if (!formData.motherMaidenName) newErrors.motherMaidenName = 'Mother’s Maiden Name is required';
    if (!formData.initialDeposit) newErrors.initialDeposit = 'Initial Deposit Amount is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setShowModal(false);

    // Determine the decision based on the form data
    let decision = '';
    if (formData.onlineBanking) {
      decision = 'online_banking';
    } else if (formData.atmCard) {
      decision = 'atm_card';
    }

    // Call quest2Decision with the decision and initialDeposit
    if (decision) {
      await quest2Decision(decision, parseInt(formData.initialDeposit), (updatedStats) => {
        setPlayerStats(updatedStats); // Update playerStats without disrupting the modal flow
      });

      // Toast notifications based on the decision
      if (decision === 'atm_card') {
        toast(`You deposited an amount of ₱${formData.initialDeposit}`);
        toast('You chose ATM Card');
        toast('+12 points');
      } else if (decision === 'online_banking') {
        toast(`You deposited an amount of ₱${formData.initialDeposit}`);
        toast('You chose Online Banking');
        toast('+15 points');
      }
    }

    onContinue(); // Continue to the next modal
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

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
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            width: '85%',
            maxWidth: '600px',
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            p: 4,
            boxShadow: '0px 4px 10px rgba(140, 47, 199, 0.1)',
            border: '2px solid rgba(0, 0, 0, 0.8)',
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '8px',
              borderRadius: '5px',
              fontFamily: "'Cinzel', serif",
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#000',
              border: '2px solid rgba(0, 0, 0, 0.8)',
              display: 'inline-block',
            }}
          >
            📝 Piso Debit Account Application Form
          </Typography>

          {/* Form Fields */}
          <Box sx={{ mt: 3, textAlign: 'left' }}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email (if available)"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>Source of Funds:</Typography>
            <FormControlLabel control={<Checkbox name="sourceOfFunds" value="Allowance" onChange={handleChange} />} label="Allowance" />
            <FormControlLabel control={<Checkbox name="sourceOfFunds" value="Part-time Job" onChange={handleChange} />} label="Part-time Job" />
            <FormControlLabel control={<Checkbox name="sourceOfFunds" value="Family Support" onChange={handleChange} />} label="Family Support" />
            <FormControlLabel control={<Checkbox name="sourceOfFunds" value="Others" onChange={handleChange} />} label="Others" />
            {errors.sourceOfFunds && <Typography color="error">{errors.sourceOfFunds}</Typography>}

            <TextField
              fullWidth
              label="Mother’s Maiden Name (for security verification)"
              name="motherMaidenName"
              value={formData.motherMaidenName}
              onChange={handleChange}
              error={!!errors.motherMaidenName}
              helperText={errors.motherMaidenName}
              sx={{ mt: 2, mb: 2 }}
            />

            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>Account Preferences:</Typography>
            <FormControlLabel control={<Checkbox name="onlineBanking" checked={formData.onlineBanking} onChange={handleChange} />} label="Enroll in Online Banking" />
            <FormControlLabel control={<Checkbox name="atmCard" checked={formData.atmCard} onChange={handleChange} />} label="Request ATM Card" />

            <TextField
              fullWidth
              label="Initial Deposit Amount (₱)"
              name="initialDeposit"
              value={formData.initialDeposit}
              onChange={handleChange}
              error={!!errors.initialDeposit}
              helperText={errors.initialDeposit}
              sx={{ mt: 2, mb: 2 }}
            />

            <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', color: '#000' }}>
              I confirm that the information provided above is correct and that I agree to the terms and conditions of the Piso Debit Account.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                fontWeight: 'bold',
                fontFamily: "'Cinzel', serif",
                backgroundColor: '#8c2fc7',
                color: 'white',
                '&:hover': { backgroundColor: '#6a22a2' },
              }}
              onClick={handleClose}
            >
              Submit Application
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal12;