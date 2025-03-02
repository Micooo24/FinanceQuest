import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import SellIcon from '@mui/icons-material/Sell';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LogoutIcon from '@mui/icons-material/Logout';

function ProgressBar({ day, balance, updateBalance }) {
  const [prevBalance, setPrevBalance] = useState(balance);
  const [balanceColor, setBalanceColor] = useState("#00cac9");
  const [animationProps, setAnimationProps] = useState({ scale: 1, opacity: 1 });
  const [clickedIcons, setClickedIcons] = useState({
    sell: false,
    request: false,
    work: false,
  });

  useEffect(() => {
    if (balance > prevBalance) {
      setBalanceColor("green");
      setAnimationProps({ scale: 1.5, opacity: 1 });
    } else if (balance < prevBalance) {
      setBalanceColor("red");
      setAnimationProps({ scale: 0.8, opacity: 0.5 });
    }

    const timer = setTimeout(() => {
      setBalanceColor("#00cac9");
      setAnimationProps({ scale: 1, opacity: 1 });
      setPrevBalance(balance);
    }, 1000);

    return () => clearTimeout(timer);
  }, [balance, prevBalance]);

  const handleIconClick = (type, amount) => {
    if (!clickedIcons[type]) {
      updateBalance(amount);
      setClickedIcons((prev) => ({ ...prev, [type]: true }));
    }
  };
  const handleQuit = () => {
    window.location.href = "/menu";
};


  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
      }}
    >

      {/* <Box
        sx={{
          width: 85,
          height: "100vh",
          background: "#111",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 2,
          color: "#F5E8D9",
        }}
      >

        <Typography
          variant="caption"
          sx={{ mt: "auto", mb: 1, fontWeight: "bold", textAlign: "center", display: "block", letterSpacing: 1 }}
        >
          TARA <br /> DISKARTE?
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          <Tooltip title="Sell Ukay-ukay for ₱1300" arrow>
            <IconButton
              sx={{
                background: "#222",
                color: clickedIcons.sell ? "red" : "#00cac9",
                borderRadius: "50px",
                width: 60,
                height: 50,
                pointerEvents: clickedIcons.sell ? "none" : "auto",
              }}
              onClick={() => handleIconClick("sell", 1300)}
            >
              <SellIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Withdraw from Paluwagan worth ₱1500" arrow>
            <IconButton
              sx={{
                background: "#222",
                color: clickedIcons.request ? "red" : "#00cac9",
                borderRadius: "50px",
                width: 60,
                height: 50,
                pointerEvents: clickedIcons.request ? "none" : "auto",
              }}
              onClick={() => handleIconClick("request", 1500)}
            >
              <RequestQuoteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Accept Raket for ₱1800" arrow>
            <IconButton
              sx={{
                background: "#222",
                color: clickedIcons.work ? "red" : "#00cac9",
                borderRadius: "50px",
                width: 60,
                height: 50,
                pointerEvents: clickedIcons.work ? "none" : "auto",
              }}
              onClick={() => handleIconClick("work", 1800)}
            >
              <WorkHistoryIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Tooltip title="Toggle sound" arrow>
          <IconButton sx={{ background: "#222", color: "white", borderRadius: "50px", width: 60, height: 50, mb: 9 }}>
            <VolumeUpIcon />
          </IconButton>
        </Tooltip>
      </Box> */}
    
      {/* Balance Section */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "#222",
          padding: "10px 20px",
          borderRadius: "10px",
          color: "#F5E8D9",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <Typography variant="caption" color="gray">
          BALANCE
        </Typography>
        <motion.div
          animate={{ color: balanceColor, scale: animationProps.scale, opacity: animationProps.opacity }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            ₱{balance}
          </Typography>
        </motion.div>
      </Box>

      {/* Day Tracking Section */}
      <Box
        sx={{
          width: "100%",
          background: "#111",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 0",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
          <Typography variant="caption" sx={{ color: "#F5E8D9", fontWeight: "bold", textAlign: "center" }}>
            DAY
          </Typography>
          {[...Array(30)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: index + 1 === day ? "#5e3967" : "transparent",
                color: index + 1 === day ? "white" : "#F5E8D9",
                borderRadius: "50%",
                fontSize: 12,
                border: "1px solid #F5E8D9",
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Box>

       
        {/* <Tooltip title="Quit Game" arrow>
          <IconButton sx={{ marginLeft: "auto", marginRight: 2, color: "#F5E8D9" }} onClick={handleQuit}>
            <LogoutIcon />
          </IconButton>
        </Tooltip> */}
      </Box>
    </Box>
  );
}

export default ProgressBar;