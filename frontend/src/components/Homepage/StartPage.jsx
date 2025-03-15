import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person"; // For User Profile
import LogoutIcon from "@mui/icons-material/Logout"; // For Logout
import toast from "react-hot-toast";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

const StartPageWrapper = styled.div`
  font-family: "Oi", sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #451d6b, #331540);
  position: relative;
  overflow: hidden;
`;

const TiledBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  z-index: 0;

  div {
    width: 100%;
    height: 100%;
    background-color: #331540;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  div:nth-child(-n + 10):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }
  div:nth-child(n + 11):nth-child(-n + 20):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }
  div:nth-child(n + 21):nth-child(-n + 30):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }
  div:nth-child(n + 31):nth-child(-n + 40):hover {
    background: linear-gradient(180deg, #451d6b, #8c2fc7);
  }
  div:nth-child(n + 41):nth-child(-n + 50):hover {
    background: linear-gradient(180deg, #451d6b, #8c2fc7);
  }
  div:nth-child(n + 51):nth-child(-n + 60):hover {
    background: linear-gradient(180deg, #8c2fc7, #00cac9);
  }
  div:nth-child(n + 61):nth-child(-n + 70):hover {
    background: linear-gradient(180deg, #8c2fc7, #00cac9);
  }
  div:nth-child(n + 71):nth-child(-n + 80):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }
  div:nth-child(n + 81):nth-child(-n + 90):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }
  div:nth-child(n + 91):nth-child(-n + 100):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
  padding: 50px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameTitle = styled.div`
  font-size: 90px;
  text-transform: uppercase;
  color: transparent;
  background: linear-gradient(45deg, #8c2fc7, #451d6b);
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px #000;
  animation: ${pulse} 3s infinite;
  margin-bottom: 1px;
`;

const GameSubtitle = styled.div`
  font-size: 80px;
  text-transform: uppercase;
  color: transparent;
  background: linear-gradient(45deg, #8c2fc7, #451d6b);
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px #000;
  animation: ${pulse} 3s infinite;
  margin-bottom: 1px;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #8c2fc7, #451d6b);
  border: 2px solid #000;
  color: white;
  font-size: 20px;
  font-family: "Lora", sans-serif;
  padding: 15px 40px;
  margin: 10px 0;
  border-radius: 25px;
  cursor: pointer;
  width: 300px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(140, 47, 199, 0.5);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(140, 47, 199, 0.8);
    background: linear-gradient(45deg, #451d6b, #8c2fc7);
  }
`;

const IconButtonWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 2;
  display: flex;
  flex-direction: column; /* Changed to column for vertical stacking */
  gap: 15px; /* Space between icons */
`;

const IconWrapper = styled.div`
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(140, 47, 199, 0.5);
  }
`;

const StyledHomeIcon = styled(HomeIcon)`
  font-size: 35px !important;
  color: white;
`;

const StyledMenuIcon = styled(MenuIcon)`
  font-size: 35px !important;
  color: white;
`;

const StyledHelpIcon = styled(HelpOutlineIcon)`
  font-size: 35px !important;
  color: white;
`;

const StyledPersonIcon = styled(PersonIcon)`
  font-size: 35px !important;
  color: white;
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  font-size: 35px !important;
  color: white;
`;

const StartPage = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const buttons = [
    { label: "START", onClick: () => navigate("/gameplay") },
    { label: "MINIGAMES", onClick: () => navigate("/minigame") }, // Added from MenuPage
    { label: "LEADERBOARDS", onClick: () => navigate("/leaderboards") },
  ];

  const iconButtons = [
    { Icon: StyledHomeIcon, onClick: () => navigate("/"), tooltip: "Home" },
    { Icon: StyledHelpIcon, onClick: () => navigate("/howtoplay"), tooltip: "How to Play" },
    { Icon: StyledPersonIcon, onClick: () => navigate("/user-profile"), tooltip: "User Profile" }, // Added from MenuPage
    {
      Icon: StyledLogoutIcon,
      onClick: () => {
        localStorage.clear();
        toast.success("Logged out successfully!");
        navigate("/");
      },
      tooltip: "Logout",
    }, // Added from MenuPage
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio error:", err));
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <StartPageWrapper>
        <TiledBackground>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}></div>
          ))}
        </TiledBackground>
        <audio ref={audioRef} loop>
          <source src="/assets/quiet.mp3" type="audio/mp3" />
        </audio>
        <Content>
          <GameTitle>Finance</GameTitle>
          <GameSubtitle>Quest</GameSubtitle>
          {buttons.map((button, index) => (
            <Button key={index} onClick={button.onClick}>
              {button.label}
            </Button>
          ))}
        </Content>
        <IconButtonWrapper>
          {iconButtons.map(({ Icon, onClick, tooltip }, index) => (
            <IconWrapper key={index} onClick={onClick} title={tooltip}>
              <Icon />
            </IconWrapper>
          ))}
        </IconButtonWrapper>
      </StartPageWrapper>
    </>
  );
};

export default StartPage;