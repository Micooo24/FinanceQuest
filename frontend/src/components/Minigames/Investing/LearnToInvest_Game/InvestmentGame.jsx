import React, { useState } from "react";
//Linking
import { Link } from "react-router-dom";
//designs
import { HelpOutline } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";

const InvestmentGame = () => {
  //Game opening
  const [open, setOpen] = useState(false);

  const handleOpenInitialInfo = () => setOpen(true);
  const handleCloseInitialInfo = () => setOpen(false);

  // Transition effect for the dialog
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} timeout={1000} />;
  });
  //---

  return (
    //home Play button

    <div
      className="container-investmentMinigame"
      style={{
        height: "100vh",
        background: "linear-gradient(black, #351742)", // Add your exact pattern using url() if needed
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "Georgia, serif", // Match the elegant font style
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#351742",
          padding: "2rem",
          borderRadius: "50px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          width: "80%",
          maxWidth: "700px",
          overflow: "visible",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
            cursor: "pointer",
          }}
        >
          <HelpOutline
            onClick={handleOpenInitialInfo}
            sx={{ fontSize: "2rem", color: "#00cac9" }}
          />

          {/* Dialog (Popup) */}
          <Dialog
            key={open ? "open" : "closed"}
            open={open}
            onClose={handleCloseInitialInfo}
            TransitionComponent={Transition}
            keepMounted
            BackdropProps={{
              invisible: true, // No dark background
            }}
            PaperProps={{
              style: {
                width: "87%", // 80% of the viewport/container width
                maxWidth: "830px", // Maximum width (adjust as needed)
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: "30px",
                height: "50%",
                color: "#00cac9 ",
                backgroundColor: "#5e3967",
                marginTop: "100px",
                // border: "2px solid white",
              },
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <DialogActions>
              <CloseIcon
                onClick={handleCloseInitialInfo}
                style={{
                  color: "red",
                  padding: "5px",
                  borderRadius: "30px",
                  backgroundColor: "#5e3967",
                  border: "1px solid red",
                  cursor: "pointer",
                  margin: "10px",
                }}
              />
            </DialogActions>

            <DialogTitle>Informal Use of “Stack”/“Stax</DialogTitle>

            <DialogContent>
              <Typography>
                In some circles, people might use “stack” (or stylized as
                “stax”) to refer to the accumulation or layering of
                investments—a “stack” of assets that build wealth over time.
                This usage is more colloquial rather than a formal financial
                term.
              </Typography>
            </DialogContent>
          </Dialog>
        </div>
        <h1
          style={{
            fontSize: "2rem",
            color: "#00cac9",
            letterSpacing: "10px",
          }}
        >
          Build Your
          <br />
        </h1>
        <h1
          style={{
            fontSize: "3rem",
            paddingBottom: "2rem",
            color: "#00cac9",
            letterSpacing: "10px",
          }}
        >
          STAX
        </h1>
        <p
          style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#a5b4a5" }}
        >
          You've got 10 years to grow your wealth. What strategy will create the
          largest stack?
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Link to="/Learn_Game">
            <button
              style={{
                padding: "0.8rem 1.5rem",
                background: "#00cac9",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              Play
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestmentGame;
