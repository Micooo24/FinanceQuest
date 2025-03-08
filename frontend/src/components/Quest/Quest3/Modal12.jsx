import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal12 = ({ onBack, onComplete }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    onComplete(); // Call onComplete when the modal is closed
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
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
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -55%)",
            width: "85%",
            maxWidth: "1000px",
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            p: 4,
            boxShadow: "0px 4px 10px rgba(140, 47, 199, 0.1)",
            border: "2px solid rgba(0, 0, 0, 0.8)",
            maxHeight: "80vh", // Limit height to 80% of the viewport
            overflowY: "auto", // Enable scrolling
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
            📌 The Power of Compound Interest
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontStyle: "italic",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid rgba(0, 0, 0, 0.8)",
                  color: "#000",
                }}
              >
                💡 What is it?
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  fontSize: "14px",
                  textAlign: "left",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid rgba(0, 0, 0, 0.8)",
                  color: "#000",
                }}
              >
                ✅ Compound interest is like a snowball rolling down a hill—it starts small, but as it moves, it grows bigger and bigger on its own.
                <br />
                ✅ When you invest money, you earn interest (extra money). But instead of just earning interest on your original money, you also earn interest on the interest you’ve already gained.
                <br />
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  fontSize: "14px",
                  textAlign: "left",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid rgba(0, 0, 0, 0.8)",
                  color: "#000",
                }}
              >
                Example:
                <br />
                Let’s say you invest ₱1,000 in a savings account with an 8% annual interest rate: <br />
                -    Year 1: You earn ₱80 (8% of ₱1,000), so now you have ₱1,080. <br />
                -    Year 2: You earn 8% of ₱1,080, which is ₱86.40—so now you have ₱1,166.40. <br />
                -    Year 3: You earn 8% of ₱1,166.40, which is ₱93.31—now you have ₱1,259.71. <br />
                -    After 10 years, instead of just getting ₱1,800 (if interest didn’t compound), you’d actually have ₱2,159 because the interest kept growing on itself. <br />
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontStyle: "italic",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid rgba(0, 0, 0, 0.8)",
                  color: "#000",
                }}
              >
                💡 Why does this matter?
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  fontSize: "14px",
                  textAlign: "left",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid rgba(0, 0, 0, 0.8)",
                  color: "#000",
                }}
              >
                ✅ If you start saving and investing early, even with small amounts, your money has more time to grow.
                <br />
                ✅ This is why financial experts always say: “Time is your best friend in investing.”
                <br />
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              mt: 2,
              fontSize: "14px",
              fontWeight: "bold",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid rgba(0, 0, 0, 0.8)",
              color: "#000",
            }}
          >
            💡 Tip: The best way to take advantage of compound interest is to invest and leave it alone—the longer it stays, the bigger it grows.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              width: "100%",
              fontWeight: "bold",
              fontFamily: "'Cinzel', serif",
              backgroundColor: "#8c2fc7",
              color: "white",
              "&:hover": { backgroundColor: "#451d6b" },
            }}
            onClick={handleClose}
          >
            ✅ Got It!
          </Button>

          <Button
            variant="outlined"
            sx={{
              mt: 2,
              width: "100%",
              fontWeight: "bold",
              fontFamily: "'Cinzel', serif",
              backgroundColor: "#ffffff",
              borderColor: "#331540",
              color: "#331540",
              "&:hover": { backgroundColor: "#f5f5f5", borderColor: "#351742" },
            }}
            onClick={onBack}
          >
            🔙 Back to Investment Insights
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal12;