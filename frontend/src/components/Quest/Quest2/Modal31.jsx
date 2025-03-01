import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Backdrop, Modal } from "@mui/material";

const Modal31 = ({ onBack }) => {
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
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "95%",
            maxWidth: "1000px",
            height: "70vh",
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            p: 4,
            boxShadow: "0px 4px 10px rgba(140, 47, 199, 0.1)",
            border: "2px solid rgba(0, 0, 0, 0.8)",
            overflowY: "auto",
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
            📌 Understanding Bank Fees & Charges
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
                💡 “Why did the bank deduct money from my account? I didn’t spend anything!”
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
                🏦 Common Banking Fees: <br />
                🔹 ATM Withdrawal Fees – Some banks charge ₱10-₱18 per withdrawal if you use an ATM from a different bank.  <br /> <br />
                🔹 Balance Inquiry Fees – Checking your balance at an ATM may cost ₱2-₱5, but it's free on mobile banking apps.  <br /> <br />
                🔹 Account Inactivity Fees – If your account remains unused for months, you may be charged ₱30 per month.  <br /> <br />
                🔹 Over-the-Counter (OTC) Fees – Some banks charge extra for in-person transactions instead of using ATMs or mobile apps.  
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
                ✅ How to Avoid These Fees: <br />
                - Choose the Right Bank – Some digital banks offer zero fees for withdrawals and transactions.  <br />
                - Use Online Banking – Checking balances and making transactions online is usually free.  <br />
                - Know the ATM Network – Use your bank’s ATMs to avoid extra charges.  <br />
                - Keep Your Account Active – Make at least one transaction every few months to avoid dormancy fees.  
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
            ⚠ Potential Downsides: <br />
            - Some Banks Always Have Fees – Even with precautions, some banks charge unavoidable fees.  <br />
            - Learning Curve – Managing online banking and fee structures may take time to understand.  <br />
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
              color: '#000',
            }}
          >
            💡 Tip: Always check for hidden charges to avoid losing money on banking fees!
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

export default Modal31;
