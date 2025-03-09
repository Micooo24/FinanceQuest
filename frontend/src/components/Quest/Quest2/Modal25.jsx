import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";
import { sq2Decision } from '../../Utils/decisions';
import { toast } from 'react-hot-toast';

const Modal25 = ({ onChoose, setPlayerStats }) => {
  const [showModal, setShowModal] = useState(true);

  const handleChoice = async (choice) => {
    setShowModal(false);

    // Call sq2Decision with the choice
    const response = await sq2Decision(choice, setPlayerStats);

    // Handle the money_spent value returned from the backend
    const moneySpent = response.sq2_outcome.money_spent;

    // Toast notifications based on the choice
    if (choice === 'withdraw') {
      toast(`You chose to withdraw it. Money spent: ₱0`);
      toast('+5 points');
    } else if (choice === 'deposit') {
      toast(`You chose to deposit it. Money spent: ₱${moneySpent}`);
      toast('+15 points');
    }

    onChoose(choice);
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
      disableBackdropClick
      disableEscapeKeyDown
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
            🎮 Choose What to Do Next
          </Typography>

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
            onClick={() => handleChoice("deposit")}
          >
            🏦 Deposit for Future Expenses
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
              "&:hover": { backgroundColor: "#451d6b" },
            }}
            onClick={() => handleChoice("withdraw")}
          >
            🛍 Withdraw for Unplanned Spending
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal25;