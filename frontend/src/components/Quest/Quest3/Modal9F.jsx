import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";
import { q3CrewDecision } from "../../Utils/decisions"; // Adjust the import path as necessary
import { toast } from 'react-hot-toast';

const Modal9F = ({ onChoose, updateStatsCallback }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = async (option) => {
    setShowModal(false);
    if (onChoose) {
      onChoose(option);
    }
    if (option === "keepGoing") {
      await q3CrewDecision("yes", updateStatsCallback);
      toast.success("You received ₱150 for your first salary");
      toast.success("Points earned: 10");
    } else if (option === "quitJob") {
      await q3CrewDecision("no", updateStatsCallback);
      toast.error("You have no job");
      toast.error("No points earned");
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
            💬 Liza (Decision):
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
            onClick={() => handleClose("keepGoing")}
          >
            ✔ “I’ll keep going! I just need to adjust.”
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
            onClick={() => handleClose("quitJob")}
          >
            ❌ “This is too much for me.”
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal9F;