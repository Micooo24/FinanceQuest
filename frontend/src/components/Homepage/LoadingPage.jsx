import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Draggable from "react-draggable";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const horizontalWave = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
`;

const fall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
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

const LoadingPageWrapper = styled.div`
  font-family: 'Gravitas One', sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  position: relative;
`;

const CashImage = styled.img`
  position: absolute;
  top: -100px;
  pointer-events: none;
  animation: ${fall} ${({ speed }) => speed}s linear infinite;
  left: ${({ left }) => left}%;
  width: ${({ size }) => size}px;
  z-index: 2;
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
    background-color: #331540; /* Base color */
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  /* Hover Gradients Row by Row */
  div:nth-child(-n + 10):hover {
  background: linear-gradient(180deg, #331540, #451d6b);
  }

  div:nth-child(n + 11):nth-child(-n + 20):hover {
  background: linear-gradient(180deg, #331540, #451d6b)
  }

  div:nth-child(n + 21):nth-child(-n + 30):hover {
  background: linear-gradient(180deg, #331540, #451d6b)
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
    background: linear-gradient(180deg, #00cac9, #331540)
  }

  div:nth-child(n + 81):nth-child(-n + 90):hover {
    background: linear-gradient(180deg, #00cac9, #331540)
  }

  div:nth-child(n + 91):nth-child(-n + 100):hover {
    background: linear-gradient(180deg, #00cac9, #331540)
  }
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
`;

const Letter = styled.span`
  display: inline-block;
  animation: ${horizontalWave} 2s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay || "0s"};
`;

const StraightText = styled.div`
  font-size: 110px;
  font-family: 'Oi', sans-serif;
  color: #8c2fc7;
  -webkit-background-clip: text;
  -webkit-text-stroke: 1.5px black;
  display: flex;
  justify-content: center;
`;

const QuestText = styled.div`
  font-family: 'Oi', sans-serif;
  background: #451d6b;
  -webkit-background-clip: text;
  color: #8c2fc7;
  -webkit-text-stroke: 1.5px black;
  display: flex;
  justify-content: center;
  font-size: 90px;
`;

const LoadingText = styled.div`
  font-family: 'Fraunces', sans-serif;
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
  const audioRef = useRef(null);
  const [cashArray, setCashArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    const generateCash = () => {
      const newCash = {
        id: Date.now(),
        left: Math.random() * 100, // Random horizontal position
        speed: 3 + Math.random() * 4, // Random falling speed
        size: 40 + Math.random() * 30, // Random size for variety
      };
      setCashArray((prev) => [...prev, newCash]);
    };

    const cashInterval = setInterval(generateCash, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
      clearInterval(cashInterval);
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
        <TiledBackground>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}></div>
          ))}
        </TiledBackground>

        <audio ref={audioRef} autoPlay loop>
          <source src="/assets/quiet.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        <Content>
          <GameTitleWrapper>
            <StraightText>
              {"Finance".split("").map((char, index) => (
                <Letter key={index} delay={`${index * 0.1}s`}>
                  {char}
                </Letter>
              ))}
            </StraightText>
            <QuestText>
              {"Quest".split("").map((char, index) => (
                <Letter key={index} delay={`${(index + 7) * 0.1}s`}>
                  {char}
                </Letter>
              ))}
            </QuestText>
          </GameTitleWrapper>

          <ProgressBarWrapper>
            <Progress style={{ width: `${progress}%` }} />
          </ProgressBarWrapper>

          <LoadingText>
            {isComplete
              ? "CLICK ANYWHERE TO START"
              : `LOADING${loadingDots} ${progress}%`}
          </LoadingText>
        </Content>

        {/* Falling Cash Animation */}
        {cashArray.map((cash) => (
          <Draggable key={cash.id}>
            <CashImage
              src="/assets/cash.png" // Change to your cash image path
              left={cash.left}
              speed={cash.speed}
              size={cash.size}
            />
          </Draggable>
        ))}
        
      </LoadingPageWrapper>
    </>
  );
};

export default LoadingPage;