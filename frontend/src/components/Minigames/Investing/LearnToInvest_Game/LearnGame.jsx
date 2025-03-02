import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LearnTheGameInvest = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("");
  const navigate = useNavigate();

  // Slides with images and descriptions
  const slides = [
    {
      image: "./mediaMinigameInvestment/learnGame/pic1.png",
      description:
        "You have 10 years to make money. The bar will go down over the course of one year.",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic2.png",
      description:
        "every 6 months, your pocket cash will refill with money you can invest.",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic3.png",
      description:
        "There are 4 different  investment opportunities you can unlock through the game.",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic4.png",
      description:
        "When an investment is unlocked, it will open a lesson to explain how it works",
    },
    {
      image: "./mediaMinigameInvestment/learnGame/pic5.png",
      description:
        "If you need a refresher on any of the investment types, click the '?' icon. ",
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

  return (
    <div
      className="container-investmentMinigame"
      style={{
        height: "100vh",
        background: "linear-gradient(black, #351742)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#351742",
          padding: "30px",
          borderRadius: "50px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          width: "500px",
          height: "450px",
          index: 1,
        }}
      >
        {/* Slide Content */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "80%",
            overflow: "visible",
            flexDirection: "column",
            transition: "transform 0.3s ease-in-out",
            transform: `translateX(${
              transitionDirection === "left" ? "-100%" : "0"
            })`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative", // Ensure proper positioning
              width: "100%", // Occupy the full width of the parent container
              height: "100%", // Occupy the full height of the parent container
            }}
          >
            <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              style={{
                maxWidth: "100%", // Ensure the image scales down to fit the width
                maxHeight: "100%", // Ensure the image scales down to fit the height
                objectFit: "contain", // Ensures the whole image is visible inside the container
                borderRadius: "10px",
                boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>

          <div
            style={{
              width: "300px",
              margin: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "visible",
              textAlign: "center", // Center-align the text
              index: 1,
            }}
          >
            <h3 style={{ margin: 0 }}>{slides[currentSlide].description}</h3>
          </div>
        </div>

        {/* Dots Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "10px",
            index: 2,
          }}
        >
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: currentSlide === index ? "#00cac9" : "white",
                opacity: currentSlide === index ? 1 : 0.5,
                cursor: "pointer",
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Next Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "25px",
            index: 2,
          }}
        >
          <button
            onClick={() => {
              if (isLastSlide) {
                handlePlayButton();
              } else {
                nextSlide();
              }
            }}
            style={{
              padding: "0.8rem 1.5rem",
              background: isLastSlide ? "#00cac9" : "#00cac9",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {isLastSlide ? "Ready" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnTheGameInvest;
