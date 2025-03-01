import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal29 = ({ onBack }) => {
  const [showModal, setShowModal] = useState(true);

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
            📌 The Power of Having a Bank Account
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
                💡 "Why should I open a bank account instead of just keeping cash?"
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
                ✅ Safety & Security – Unlike cash, money in a bank is protected from theft or loss. Some accounts even offer fraud protection.  
                <br />
                ✅ Better Money Management – Transactions are recorded, helping you analyze where your money goes.  
                <br />
                ✅ Ease of Transactions – Use a debit card for cashless payments, online purchases, and subscriptions.  
                <br />
                ✅ No Maintaining Balance for Student Accounts – Many student-friendly bank accounts, like the Piso Debit Card, have zero maintaining balance.  
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
                ⚠ Some Banks Have Fees – Not all banks are student-friendly. Some accounts require a minimum balance to avoid fees.  
                <br />
                ⚠ Limited Accessibility – In remote areas, banking services might be harder to access without an ATM or digital banking.  
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
                💡 Tip: A debit card is safer than carrying cash and can be used for digital transactions!
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
            onClick={() => setShowModal(false)}
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

export default Modal29;
