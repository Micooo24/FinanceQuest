import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Keyframe animations for the title bounce effect
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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Global styles to remove margin/padding and ensure full height/width
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

const LoadingPageWrapper = styled.div`
  font-family: 'Gravitas One', sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  background: linear-gradient(180deg, #451d6b,  #451d6b);
  position: relative;  /* Make sure the child elements are positioned relative to this container */
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
  opacity: 0.4;
  color: black;
  filter: blur(20px);
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

const GameTitleWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 80px;
  text-transform: uppercase;
  animation: ${bounce} 1s infinite alternate;
`;

const SvgWrapper = styled.svg`
  width: 720px;
  height: 150px;
`;

const CurvedText = styled.text`
  transform: translateY(50px); /* Adjust the number as needed */
  font-size: 100px;
  font-family: 'Gravitas One', sans-serif;
  fill: #451d6b;
  stroke: black;
  stroke-width: 1.5;
  -webkit-background-clip: text;
`;

const QuestText = styled.div`
  font-family: 'Gravitas One', sans-serif;
  background: #451d6b;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-stroke: 1.5px black;
`;

const LoadingText = styled.div`
  font-family: 'Gravitas One', sans-serif;
  font-size: 20px;
  color: white;
  opacity: 0;
  animation: ${fadeIn} 1s forwards 1s;
  margin-top: 30px; 
`;

const ProgressBarWrapper = styled.div`
  width: 80%;
  height: 30px;
  margin-top: 80px;
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #8c2fc7, #451d6b);
  transition: width 0.5s;
`;

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [loadingDots, setLoadingDots] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef(null); // Ref to control audio playback
  const navigate = useNavigate();

  useEffect(() => {
    // Try to play the audio when the component is mounted
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
      });
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(progressInterval);
        setIsComplete(true);
        return 100;
      });
    }, 50);

    const dotsInterval = setInterval(() => {
      setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  const handleStart = () => {
    if (isComplete) {
      navigate("/start");
    }
  };

  return (
    <>
      <GlobalStyle />
      <LoadingPageWrapper onClick={handleStart}>
        {/* Background Image */}
        <BackgroundImage src="/assets/bg.jpg" alt="Loading Background" />

        {/* Audio for Background Music */}
        <audio ref={audioRef} autoPlay loop>
          <source src="/assets/quiet.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        <Content>
          <GameTitleWrapper>
            {/* Curved "Finance" text using SVG Path */}
            <SvgWrapper>
              <defs>
                <path
                  id="curve"
                  d="M 80,80 Q 400,10 700,90" // This creates the arc path for the text
                />
              </defs>
              <CurvedText>
                <textPath href="#curve" startOffset="0%">
                  Finance
                </textPath>
              </CurvedText>
            </SvgWrapper>

            {/* "Quest" text */}
            <QuestText>Quest</QuestText>
          </GameTitleWrapper>

          <ProgressBarWrapper>
            <Progress style={{ width: `${progress}%` }} />
          </ProgressBarWrapper>

          <LoadingText>
            {isComplete ? "CLICK ANYWHERE TO START" : `LOADING${loadingDots} ${progress}%`}
          </LoadingText>
        </Content>
      </LoadingPageWrapper>
    </>
  );
};

export default LoadingPage;
