import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; /* Reset all margins globally */
    padding: 0; /* Reset all paddings globally */
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(black, #351742);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  font-family: "Georgia, serif";
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  background: #351742;
  padding: 2rem;
  border-radius: 50px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  width: 80%;
  max-width: 700px;
  overflow: visible;
`;

const BackIconWrapper = styled.div`
  position: absolute;
  top: 20px; /* Consistent with previous components */
  right: 20px; /* Consistent with previous components */
  z-index: 2;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(140, 47, 199, 0.5); /* Matches UserProfile hover */
  }
`;

const StyledBackIcon = styled(ArrowBackIcon)`
  font-size: 35px !important;
  color: white;
`;

const HelpWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  cursor: pointer;
`;

const InvestmentGame = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Added for navigation

  const handleOpenInitialInfo = () => setOpen(true);
  const handleCloseInitialInfo = () => setOpen(false);

  const handleBackClick = () => {
    navigate("/About_Page_Investing"); // Navigate to /Invest_Game
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} timeout={1000} />;
  });

  return (
    <>
      <GlobalStyle />
      <Container className="container-investmentMinigame">
        <BackIconWrapper onClick={handleBackClick}>
          <StyledBackIcon />
        </BackIconWrapper>
        <Content>
          <HelpWrapper>
            <HelpOutlineIcon
              onClick={handleOpenInitialInfo}
              sx={{ fontSize: "2rem", color: "#00cac9" }}
            />
          </HelpWrapper>
          <Dialog
            key={open ? "open" : "closed"}
            open={open}
            onClose={handleCloseInitialInfo}
            TransitionComponent={Transition}
            keepMounted
            BackdropProps={{
              invisible: true,
            }}
            PaperProps={{
              style: {
                width: "87%",
                maxWidth: "830px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: "30px",
                height: "50%",
                color: "#00cac9",
                backgroundColor: "#5e3967",
                marginTop: "100px",
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
            You've got 10 years to grow your wealth. What strategy will create
            the largest stack?
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
        </Content>
      </Container>
    </>
  );
};

export default InvestmentGame;