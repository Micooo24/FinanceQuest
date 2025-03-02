import { useState } from "react";

// Array of slides
export const slides = [
  {
    text: "This is a great way to build up an emergency fund for surprise situations that might pop up (in real life and in this game) like medical bills or car repairs.",
    highlight: "emergency fund",
  },
  {
    text: "Investing is a key to growing your wealth over time. Start small and learn as you go.",
    highlight: "Investing",
  },
  {
    text: "Diversifying your investments helps reduce risk and ensures stable returns.",
    highlight: "Diversifying",
  },
];

// Custom hook for managing slides
export const useSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showGameScreen, setShowGameScreen] = useState(false); // For showing the second screen

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleGotItClick = () => {
    setShowGameScreen(true); // Switch to game screen
  };

  return {
    currentSlide,
    showGameScreen,
    nextSlide,
    prevSlide,
    handleGotItClick,
  };
};

// Custom hook for managing description visibility
export const useDescriptionBankInvest = () => {
  const [showDescriptionBankInfo, setShowDescription] = useState(false);

  const toggleDescriptionBankInvest = () => {
    setShowDescription((prev) => !prev);
  };

  return {
    showDescriptionBankInfo,
    toggleDescriptionBankInvest,
  };
};
