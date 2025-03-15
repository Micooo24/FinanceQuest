import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const MinigamePageWrapper = styled.div`
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
  max-width: 900px;
`;

const GameTitle = styled.div`
  font-size: 80px;
  text-transform: uppercase;
  color: transparent;
  background: linear-gradient(45deg, #8c2fc7, #451d6b);
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px #000;
  margin-bottom: 20px;
`;

const GameCard = styled.div`
  width: 280px;
  height: 320px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: ${(props) =>
    props.selected ? "2px solid #8c2fc7" : "2px solid rgba(255, 255, 255, 0.1)"};
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 10px;
  display: inline-block;
  transform: ${(props) => (props.selected ? "scale(1.05)" : "scale(1)")};
  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(140, 47, 199, 0.5);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 65%;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const GameInfo = styled.div`
  padding: 15px;
  font-family: "Lora", sans-serif;
  font-size: 20px;
  color: white;
`;

const GameDescription = styled.div`
  width: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 20px;
  margin-top: 20px;
  font-family: "Lora", sans-serif;
  font-size: 16px;
  color: white;
  text-align: center;
`;

const BackIconWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 2;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(140, 47, 199, 0.5);
  }
`;

const StyledBackIcon = styled(ArrowBackIcon)`
  font-size: 35px !important;
  color: white;
`;

const Minigame = () => {
  const [selectedGame, setSelectedGame] = useState(0);
  const navigate = useNavigate();

  const gameData = [
    {
      title: "Savings",
      image: "/assets/savings.jpg",
      description: "Master the art of saving for future goals and emergencies.",
      route: "/minibudget",
    },
    {
      title: "Investing",
      image: "/assets/invetsmentPage.webp",
      description: "Understand the basics of investing and how to grow your wealth.",
      route: "/About_Page_Investing",
    },
  ];

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setSelectedGame((prev) => (prev + 1) % gameData.length);
    } else if (event.key === "ArrowLeft") {
      setSelectedGame((prev) => (prev - 1 + gameData.length) % gameData.length);
    } else if (event.key === "Enter") {
      navigate(gameData[selectedGame].route);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedGame]);

  useEffect(() => {
    if (selectedGame >= gameData.length) {
      setSelectedGame(0);
    }
  }, [selectedGame]);

  const handleBackClick = () => {
    navigate("/start"); // Adjust this route as needed
  };

  return (
    <>
      <GlobalStyle />
      <MinigamePageWrapper>
        <TiledBackground>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}></div>
          ))}
        </TiledBackground>
        <Content>
          <BackIconWrapper onClick={handleBackClick}>
            <StyledBackIcon />
          </BackIconWrapper>
          <GameTitle>Minigames</GameTitle>
          <div>
            {gameData.map((game, index) => (
              <GameCard
                key={index}
                selected={selectedGame === index}
                onClick={() => {
                  setSelectedGame(index);
                  navigate(game.route);
                }}
              >
                <GameImage src={game.image} alt={game.title} />
                <GameInfo>{game.title}</GameInfo>
              </GameCard>
            ))}
          </div>
          <GameDescription>{gameData[selectedGame].description}</GameDescription>
        </Content>
      </MinigamePageWrapper>
    </>
  );
};

export default Minigame;