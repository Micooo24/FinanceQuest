import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal, TextField } from "@mui/material";
import { quest2Decision } from '../../Utils/decisions';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Modal23 = ({ onChoose }) => {
  const [showModal, setShowModal] = useState(true);
  const [currentMoney, setCurrentMoney] = useState(0);
  const [deposit, setDeposit] = useState('');

  useEffect(() => {
    // Fetch the player's current money from the backend
    const fetchCurrentMoney = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/stats/get/player', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const money = response.data.money;
        setCurrentMoney(money);
        // Set initial deposit to 30% of current money
        setDeposit((money * 0.3).toFixed(2));
      } catch (error) {
        console.error('Error fetching current money:', error);
        toast.error('Failed to fetch current money');
      }
    };

    fetchCurrentMoney();
  }, []);

  const handleClose = async (option) => {
    setShowModal(false);
    if (onChoose) {
      onChoose(option);
    }

    // Determine the decision based on the option
    let decision = '';
    if (option === 'onlineBanking') {
      decision = 'online_banking';
    } else if (option === 'ATM') {
      decision = 'atm_card';
    }

    // Call quest2Decision with the decision and deposit
    if (decision) {
      await quest2Decision(decision, parseInt(deposit), (updatedStats) => {
        setPlayerStats(updatedStats); // Update playerStats without disrupting the modal flow
      });

      // Toast notifications based on the decision
      if (decision === 'atm_card') {
        toast(`You deposited an amount of ₱${deposit}`);
        toast('You chose ATM Card');
        toast('+12 points');
      } else if (decision === 'online_banking') {
        toast(`You deposited an amount of ₱${deposit}`);
        toast('You chose Online Banking');
        toast('+15 points');
      }
    }
  };

  useEffect(() => {
    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" } },
      }}
    >
      <Fade in={showModal}>
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "85%",
            maxWidth: "600px",
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            p: 4,
            boxShadow: "0px 4px 10px rgba(140, 47, 199, 0.1)",
            border: "2px solid rgba(0, 0, 0, 0.8)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Cinzel', serif",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#000",
              border: "2px solid rgba(0, 0, 0, 0.8)",
              display: "inline-block",
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            🎮 Choose an Activation Method:
          </Typography>

          <TextField
            fullWidth
            label="Deposit Amount"
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />

          <Button
            variant="contained"
            sx={{
              mt: 3,
              width: "100%",
              fontWeight: "bold",
              fontFamily: "'Cinzel', serif",
              backgroundColor: "#00cac9",
              color: "white",
              "&:hover": { backgroundColor: "#009797" },
            }}
            onClick={() => handleClose("onlineBanking")}
          >
            💻 Activate Through Online Banking
          </Button>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              width: "100%",
              fontWeight: "bold",
              fontFamily: "'Cinzel', serif",
              backgroundColor: "#8c2fc7",
              color: "white",
              "&:hover": { backgroundColor: "#6a22a2" },
            }}
            onClick={() => handleClose("ATM")}
          >
            🏧 Activate at an ATM
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal23;