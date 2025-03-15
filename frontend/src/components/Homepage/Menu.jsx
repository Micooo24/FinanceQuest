import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import MUI ArrowBackIcon

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

const MenuPageWrapper = styled.div`
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
  color: ${props => (props.selected ? "#fff" : "white")}; /* Adjusted for visibility */
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

const BackIconWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 2;
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

const StyledBackIcon = styled(ArrowBackIcon)`
  font-size: 35px !important;
  color: white;
`;

const SelectionIconWrapper = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: 50%;
  transform: translateX(-150%);
  z-index: 2;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const StyledSelectionIcon = styled(ArrowBackIcon)`
  font-size: 25px !important;
  color: white;
  transform: rotate(180deg); /* Pointing right for selection */
`;

const Modal = styled.div`
  position: fixed;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(45deg, #451d6b, #8c2fc7);
  padding: 30px;
  border-radius: 15px;
  z-index: 100;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px rgba(140, 47, 199, 0.7);
`;

const ModalButton = styled.button`
  background: linear-gradient(45deg, #8c2fc7, #451d6b);
  border: 2px solid #000;
  color: white;
  font-size: 15px;
  font-family: "Fraunces", sans-serif;
  margin-top: 35px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(45deg, #451d6b, #8c2fc7);
    transform: scale(1.05);
  }
`;

const VolumeSlider = styled.input`
  margin-top: 10px;
  width: 200px;
  accent-color: #8c2fc7; /* Matches theme */
`;

const MenuPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const buttons = [
    { label: "User Profile", onClick: () => navigate("/user-profile") },
    { label: "Minigame", onClick: () => navigate("/minigame") },

    {
      label: "Logout",
      onClick: () => {
        localStorage.clear();
        toast.success("Logged out successfully!");
        navigate("/");
      },
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.error("Autoplay prevented:", err);
        }
      };
      playAudio();
    }
  }, []);

  const handleMuteToggle = () => {
    setIsMuted(prev => {
      const newMutedStatus = !prev;
      if (audioRef.current) audioRef.current.muted = newMutedStatus;
      return newMutedStatus;
    });
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex(prev => (prev + 1) % buttons.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(prev => (prev === 0 ? buttons.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      buttons[selectedIndex].onClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedIndex]);

  return (
    <>
      <GlobalStyle />
      <MenuPageWrapper>
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
            <Button
              key={index}
              selected={selectedIndex === index}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ))}
        </Content>
        <BackIconWrapper onClick={() => navigate("/start")}>
          <StyledBackIcon />
        </BackIconWrapper>
      </MenuPageWrapper>

      {showModal && (
        <Modal>
          <h2>Music Settings</h2>
          <ModalButton onClick={handleMuteToggle}>
            {isMuted ? "Unmute" : "Mute"}
          </ModalButton>
          <label htmlFor="volumeSlider">Volume:</label>
          <VolumeSlider
            id="volumeSlider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <ModalButton onClick={() => setShowModal(false)}>Close</ModalButton>
        </Modal>
      )}
    </>
  );
};

export default MenuPage;