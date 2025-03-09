import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import ProgressBar from "./ProgressBar";
import FirstWeek from "./FirstWeek";
import LogoutIcon from '@mui/icons-material/Logout';

function MiniBudget({ selectedJob }) {
  const [day, setDay] = useState(1);
  const [balance, setBalance] = useState(10000);
  const [open, setOpen] = useState(false);

  const handleNextDay = () => {
    setDay((prevDay) => prevDay + 1);
  };

  const updateBalance = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  const handleQuit = () => {
    window.location.href = "/menu";
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmQuit = () => {
    handleQuit();
    handleClose();
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(180deg, #000, #111)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
        color: "#F5E8D9",
        px: 2,
        zIndex: 1, 
      }}
    >
      {/* Logout Button */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "#222",
          padding: "10px 20px",
          borderRadius: "10px",
          color: "#F5E8D9",
          textAlign: "center",
          fontWeight: "bold",
          zIndex: 1, 
        }}
      >
        <Tooltip title="Quit Game" arrow>
          <IconButton sx={{ color: "#F5E8D9" }} onClick={handleClickOpen}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        component="img"
        src="/assets/bg.jpg"
        alt="Game Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          filter: "blur(5px)",
          zIndex: -1,
        }}
      />
      <ProgressBar day={day} balance={balance} updateBalance={updateBalance} />
      <FirstWeek
        day={day}
        handleNextDay={handleNextDay}
        balance={balance}
        setBalance={setBalance}
        selectedJob={selectedJob}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: "#333",
            color: "#F5E8D9",
            borderRadius: "15px",
            border: "2px solid #F5E8D9",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold", textAlign: "center" }}>
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: "#F5E8D9" }}>
            Are you sure you want to quit the game?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose} sx={{ color: "#F5E8D9", borderColor: "#F5E8D9" }} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmQuit} sx={{ color: "#F5E8D9", borderColor: "#F5E8D9" }} variant="outlined" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MiniBudget;