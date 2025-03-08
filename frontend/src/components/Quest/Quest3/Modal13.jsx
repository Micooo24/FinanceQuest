import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal13 = ({ onBack, onComplete }) => {
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
            📌 Stocks vs. Bonds
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
                💡 Think of investing like planting crops.
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
                ✅ Stocks are like fruit trees 🌳—they take time to grow, but when they do, they can give you a lot of fruit (profits). However, they can also die if not taken care of properly (risky).
                <br />
                ✅ Bonds are like growing rice 🌾—they grow more predictably and give you smaller but steady returns.
                <br />
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
                💡 Stocks (High Risk, High Reward)

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
                ✅ When you buy a stock, you own a small part of a company.
                <br />
                ✅ If the company does well, the value of your stock goes up, and you can sell it for a higher price (profit).
                <br />
                ✅ If the company struggles, the stock goes down, and you can lose money.
                <br />
              </Typography>
    
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
                💡 Example: Imagine you buy a stock in Company A for ₱1,000:
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
                ✅ If the company grows and does well, the stock price increases, and now your stock is worth ₱1,500—you can sell it for a ₱500 profit.
                <br />
                ✅ But if the company performs badly, the stock might drop to ₱700, and if you sell, you lose ₱300.
                <br />
              </Typography>

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
                💡 Bonds (Low Risk, Lower Reward)
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
                ✅ A bond is like lending money to a company or the government.
                <br />
                ✅ They promise to pay you back later, plus a little extra as interest.
                <br />
                ✅ The returns are lower, but there’s less risk of losing money.
                <br />
              </Typography>
    
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
                💡 Example:
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
                ✅ You buy a bond for ₱1,000, and they promise to pay you back ₱1,100 after 3 years.
                <br />
                ✅ You don’t get rich quickly, but you don’t lose money easily either.
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
                  color: "#000",
                }}
              >
                💡 Key Takeaway: <br />
                ✅ If you want big rewards and are okay with risk, stocks are the way to go. <br />
                ✅ If you want steady and safe returns, bonds are a safer option. <br />
                ✅ Most people invest in a mix of both to balance safety and growth. <br />
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
            🔙 Back to Investment Insights
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Modal13;