import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Keyframe animation for bouncing effect
const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Global styles to reset margin/padding and ensure full height/width
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
  font-family: 'Gravitas One', sans-serif;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  cursor: pointer;
  background: linear-gradient(180deg, #451d6b,  #451d6b);
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.3;
  color: black;
  filter: blur(5px);
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameTitle = styled.div`
  margin-top: 40px;
  font-size: 60px;
  text-transform: uppercase;
  animation: ${bounce} 1s infinite alternate;
  background: #451d6b;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-stroke: 1px black;
  display: inline-block;
  transform: rotate(15deg);
  transform-origin: bottom center;
`;

const GameTitle1 = styled.div`
  font-size: 40px;
  margin-bottom: 40px;
  text-transform: uppercase;
  animation: ${bounce} 1s infinite alternate;
  background: #451d6b;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-stroke: 1px black;
`;

const Button = styled.button`
  background: transparent;
  border: 2px black;
  color: ${(props) => (props.selected ? "black" : "white")};
  font-size: 20px;
  font-family: 'Fraunces', sans-serif;
  margin-top: 25px;
  margin-bottom: 2px;
  border-radius: 25px;
  cursor: pointer;
  opacity: 0.9;
  width: 200px;
  transition: 0.3s;

  &:hover {
    background-color: rgba(156, 170, 241, 0.2);
    opacity: 3;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  right: 500px;
  z-index: 2;
  width: 20px;
  height: 20px;
  border-left: 3px solid white;
  border-bottom: 3px solid white;
  transform: rotate(45deg);
`;

const BackArrowWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  transform: rotate(270deg);
`;

const BackArrowIcon = styled.div`
  width: 30px;
  height: 30px;
  border-left: 3px solid white;
  border-bottom: 3px solid white;
  transform: rotate(135deg);
`;

const Modal = styled.div`
  position: fixed;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 30px;
  border-radius: 15px;
  z-index: 100;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalButton = styled.button`
  background: transparent;
  border: 2px black;
  color: white;
  font-size: 15px;
  margin-top: 35px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(156, 170, 241, 0.2);
  }

  &:focus {
    outline: none;
  }
`;

const VolumeSlider = styled.input`
  margin-top: 10px;
  width: 200px;
`;

const MenuPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the selected button
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // Default volume is 1 (100%)
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const buttons = [
    { label: "User Profile", onClick: () => navigate("/user-profile") },
    { label: "Minigame", onClick: () => navigate("/minigame") },
    { label: "Music", onClick: () => setShowModal(true) }, // Open the modal on Music button click
    { label: "Logout", onClick: () => navigate("/") }
  ];

  // Auto-play audio on page load
  useEffect(() => {
    if (audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.error("Autoplay prevented: User interaction may be required", err);
        }
      };

      playAudio();
    }
  }, []);

  // Handle mute/unmute toggle
  const handleMuteToggle = () => {
    setIsMuted((prevMuted) => {
      const newMutedStatus = !prevMuted;
      if (audioRef.current) {
        audioRef.current.muted = newMutedStatus;
      }
      return newMutedStatus;
    });
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Keyboard event listener for arrow keys
  const handleKeyPress = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % buttons.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? buttons.length - 1 : prevIndex - 1
      );
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
        <BackgroundImage src="/assets/bg.jpg" alt="Menu Background" />
        <audio ref={audioRef} loop>
          <source src="/assets/quiet.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        <Content>
          <GameTitle>Finance</GameTitle>
          <GameTitle1>Quest</GameTitle1>

          {buttons.map((button, index) => (
            <Button
              key={index}
              selected={selectedIndex === index} // Highlight selected button
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ))}
        </Content>

        <Arrow top={`${selectedIndex * 52 + 327}px`} /> {/* Adjust for arrow positioning */}

        <BackArrowWrapper onClick={() => navigate("/start")}>
          <BackArrowIcon />
        </BackArrowWrapper>
      </MenuPageWrapper>

      {/* Modal for Music Settings */}
      {showModal && (
        <Modal>
          <h2>Music Settings</h2>
          <ModalButton onClick={handleMuteToggle}>
            {isMuted ? "Unmute" : "Mute"}<br></br>
          </ModalButton>
          <label htmlFor="volumeSlider"><br></br>Volume:</label>
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
