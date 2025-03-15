import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #351742;
  padding: 30px;
  border-radius: 50px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  width: 800px;
  height: 550px;
  z-index: 1; /* Ensure content is above background but below back icon */
`;

const SlideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  overflow: visible;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  transform: ${({ direction }) =>
    direction === "left" ? "translateX(-100%)" : "translateX(0)"};
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 80%;
`;

const Description = styled.h3`
  width: 300px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  text-align: center;
  font-size: 20px;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 10px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#00cac9" : "white")};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 25px;
`;

const StyledButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #00cac9;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
`;

const BackIconWrapper = styled.div`
  position: absolute;
  top: 20px; /* Consistent with previous components */
  right: 20px; /* Consistent with previous components */
  z-index: 2; /* Above content */
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

const LearnTheGameInvest = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("");
  const navigate = useNavigate();

  const slides = [
    {
      image: "./mediaMinigameInvestment/learnGame/pic1.png",
      description:
        "You have 10 years to make money. The bar will go down over the course of one year.",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic2.png",
      description:
        "Every 6 months, your pocket cash will refill with money you can invest.",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic3.png",
      description:
        "There are 4 different investment opportunities you can unlock through the game.",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic4.png",
      description:
        "When an investment is unlocked, it will open a lesson to explain how it works",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic5.png",
      description:
        "If you need a refresher on any of the investment types, click the '?' icon.",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic6.png",
      description: "You can see the balance and profit of each investment",
    },
  ];

  const isLastSlide = currentSlide === slides.length - 1;

  const nextSlide = () => {
    if (!isLastSlide) {
      setTransitionDirection("left");
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setTransitionDirection("");
      }, 300); // Matches the animation duration
    }
  };

  const handlePlayButton = () => {
    if (isLastSlide) {
      console.log("Ready to Play!");
      navigate("/Ready_Set_Invest");
    }
  };

  const handleBackClick = () => {
    navigate("/Invest_Game"); // Navigate to /Invest_Game
  };

  return (
    <>
      <GlobalStyle />
      <Container className="container-investmentMinigame">
        <BackIconWrapper onClick={handleBackClick}>
          <StyledBackIcon />
        </BackIconWrapper>
        <Content>
          <SlideContainer direction={transitionDirection}>
            <ImageWrapper>
              <img
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                  boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
                }}
              />
            </ImageWrapper>
            <Description>{slides[currentSlide].description}</Description>
          </SlideContainer>
          <Dots>
            {slides.map((_, index) => (
              <Dot
                key={index}
                active={currentSlide === index}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </Dots>
          <ButtonWrapper>
            <StyledButton
              onClick={() => {
                if (isLastSlide) {
                  handlePlayButton();
                } else {
                  nextSlide();
                }
              }}
            >
              {isLastSlide ? "Ready" : "Next"}
            </StyledButton>
          </ButtonWrapper>
        </Content>
      </Container>
    </>
  );
};

export default LearnTheGameInvest;