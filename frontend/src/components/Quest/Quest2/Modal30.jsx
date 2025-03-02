import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal30 = ({ onBack, onComplete }) => {
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
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "95%",
            maxWidth: "1000px",
            height: "70vh", // Set a medium height (adjust as needed)
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            p: 4,
            boxShadow: "0px 4px 10px rgba(140, 47, 199, 0.1)",
            border: "2px solid rgba(0, 0, 0, 0.8)",
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
            📌 Interest & How Your Money Grows in the Bank
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
                💡 "What’s the difference between keeping money at home versus in the bank?"
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  fontSize: "14px",
                  textAlign: "left",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid rgba(0, 0, 0, 0.8)",
                  color: "#000",
                }}
              >
                ✅ Passive Income – Your money grows over time without effort. <br />
                <br />
                ✅ Encourages Saving – Seeing interest grow motivates you to save more. <br />
                <br />
                ✅ Compound Interest – If you don’t withdraw your money, the interest keeps adding up over time. <br />
                <br />
                🔹 How Interest Works: <br />
                - Banks lend the money you deposit to others and share a small portion of the profit with you as interest. <br />
                
                - Higher savings accounts (like time deposits) offer better interest rates. <br />
                
                - Some digital banks provide higher interest than traditional banks because they have fewer costs. <br />
                <br />
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
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
                📈 Example of Interest Growth:<br />
                If you deposit ₱1,000 in a savings account with 1% annual interest, after a year, you’ll have ₱1,010 without doing anything! <br />
                The more you save, the more you earn! <br />
                <br />
                ⚠ Potential Downsides:<br />
                - Low Interest in Basic Accounts – Regular savings accounts may have lower interest rates than investment options. <br />
                <br />
                - Inflation Reduces Value – If inflation is higher than your interest rate, your money loses value over time. <br />
                <br />
              </Typography>
            

          <Typography
            sx={{
              mt: 2,
              fontSize: "14px",
              fontWeight: "bold",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid rgba(0, 0, 0, 0.8)",
              color: '#000',
            }}
          >
            💡 Tip: Even a small deposit today can turn into a bigger amount in the future!
          </Typography>
          </Box>
          </Box>
          
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
            🔙 Back to Banking Insights
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal30;