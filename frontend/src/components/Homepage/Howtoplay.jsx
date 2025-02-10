import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FaTimes } from "react-icons/fa";
import { GiJumpAcross, GiRunningShoe, GiCharacter, GiHealthNormal, GiAchievement } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fraunces', sans-serif;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: fixed;
    
  }
`;

const HowToPlayWrapper = styled.div`
  font-family: 'Fraunces', sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #5e3967, #351742);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
  opacity: 0.3;
  filter: blur(5px);
`;

const Carousel = styled.div`
  width: 80%;
  max-width: 750px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
   background: rgba(255, 255, 255, 0.3); 
  border-radius: 20px;
  padding: 20px;
  position: relative;
  z-index: 1;
  color: black;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Icon = styled.div`
  font-size: 50px;
  margin-bottom: 20px;
  color: #009797;
`;

const Text = styled.p`
  font-size: 20px;
  white-space: pre-line;
  line-height: 3;
`;

const ContinueButton = styled.button`
  margin-top: 5px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #009797;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #00cac9;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #009797;
  &:hover {
    color: #00cac9;
  }
`;
const DotsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 25px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#009797" : "#ccc")};
`;


const slides = [
  { text: "Movement: Use WASD keys to move your character.\nJump: Press Spacebar to jump.\nCamera View: Move the mouse to adjust the camera angle.", icon: <GiRunningShoe /> },
  { text: "Successfully log in to your account.\nSelect 'New Game' or Click 'Start Game'.", icon: <GiJumpAcross /> },
  { text: "Choose your character:\nMale or Female.", icon: <GiCharacter /> },
  { text: "Begin at Level 1 with starting stats:\nMoney: 100\nHealth: 100\nExperience: 0", icon: <GiHealthNormal /> },
  { text: "Main Missions: Follow the storyline.\nSide Quests: Gain extra rewards.\nUnlock new locations and special events.", icon: <GiAchievement /> },
];

const HowToPlay = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <>
      <GlobalStyle />
      <HowToPlayWrapper>
        <BackgroundImage src="/assets/bg.jpg" alt="Game Background" />
        <Carousel>
          <CloseButton onClick={() => navigate("/start")}> <FaTimes /> </CloseButton>
          <Slide>
            <Icon>{slides[currentSlide].icon}</Icon>
            <Text>{slides[currentSlide].text}</Text>
          </Slide>
          <ContinueButton onClick={nextSlide}>Continue</ContinueButton>
          <DotsContainer>
            {slides.map((_, index) => (
              <Dot key={index} active={index === currentSlide} />
            ))}
          </DotsContainer>
        </Carousel>
      </HowToPlayWrapper>
    </>
  );
};

export default HowToPlay;
