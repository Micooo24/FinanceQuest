import React, { useState, useEffect, useRef } from "react"; // Import useState along with useEffect
import { useNavigate } from "react-router-dom";
import "../Minigame.css";
const questions = {
  level1: [
    {
      question: "Which is a better investment strategy?",
      options: [
        "Investing in high-risk stocks without research",
        "Diversifying your portfolio across different assets",
      ],
      answer: 1, // index of the correct option
      tip: "Diversification reduces the risk of major losses and provides a better return over time.",
      explanation:
        "Diversifying your portfolio helps balance potential gains and losses, offering a safer and more stable approach.",
    },
    {
      question: "What should you do if your investments are underperforming?",
      options: [
        "Sell everything and cut your losses",
        "Review your strategy and consider adjusting your investments",
      ],
      answer: 1,
      tip: "Panicking and selling can lock in losses. A strategic review allows you to make informed decisions.",
      explanation:
        "Evaluating your investments regularly and adjusting strategies ensures long-term growth, even during downturns.",
    },
    {
      question: "Why is it important to have a long-term investment plan?",
      options: [
        "It helps ride out market volatility and provides time for growth",
        "It guarantees immediate high returns",
      ],
      answer: 0,
      tip: "Investments take time to grow. Short-term fluctuations are normal, but long-term planning yields better results.",
      explanation:
        "Long-term investments tend to recover from market downturns and grow steadily, ensuring greater returns over time.",
    },
    {
      question: "What is a diversified investment portfolio?",
      options: [
        "Investing in one type of asset or stock",
        "Investing in a variety of assets like stocks, bonds, and real estate",
      ],
      answer: 1,
      tip: "Diversification spreads risk and increases the chance of steady returns across different markets.",
      explanation:
        "A diversified portfolio lowers the overall risk by ensuring that losses in one area can be offset by gains in another.",
    },
    {
      question: "How should you approach risk when investing?",
      options: [
        "Avoid risky investments entirely",
        "Assess your risk tolerance and invest accordingly",
      ],
      answer: 1,
      tip: "It's important to understand your risk tolerance and balance it with investment opportunities that align with your goals.",
      explanation:
        "Investing based on your risk tolerance ensures you don’t overextend yourself while aiming for reasonable returns.",
    },
  ],
};

const InvestingPage = () => {
  //Game start Variables
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [resultMessage, setResultMessage] = useState(""); // Define resultMessage state
  const navigate = useNavigate(); // Hook for navigation
  // Timers
  const [secondsLeft, setSecondsLeft] = useState(7);
  const [showContent, setShowContent] = useState(false);

  const [howToPlayTimeLeft, setHowToPlayTimeLeft] = useState(600); // Timer for How to Play section
  const [showHowToPlay, setShowHowToPlay] = useState(true); // Controls whether the How to Play section is shown

  const fiveMinutesTimer = 300; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(fiveMinutesTimer);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  // loading Timer
  useEffect(() => {
    if (secondsLeft === 0) {
      setShowContent(true);
    } else {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [secondsLeft]);

  // Timer for How to Play section (1 minute)
  useEffect(() => {
    if (showHowToPlay && howToPlayTimeLeft > 0) {
      const timer = setInterval(() => {
        setHowToPlayTimeLeft((prev) => prev - 1);
      }, 10000);

      return () => clearInterval(timer);
    } else if (howToPlayTimeLeft === 0) {
      setShowHowToPlay(false); // Hide "How to Play" after 1 minute
    }
  }, [howToPlayTimeLeft, showHowToPlay]);

  //Minigame Duration 5 minutes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || timeLeft === 0 || gameOver) return; // Stop timer if game is over or no time left

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); // 1 second interval

    return () => clearInterval(interval);
  }, [isVisible, timeLeft, gameOver]); // Added gameOver dependency to clear timer when game ends

  // Timer stops when game is over or when time runs out
  useEffect(() => {
    if (gameOver) {
      setTimeLeft(0); // Ensure timeLeft is 0 when game is over
    }
  }, [gameOver]); // Added gameOver dependency to stop the timer when game ends

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSkip = () => {
    setShowHowToPlay(false); // Skip "How to Play" section
  };

  // Load the first question when the timer starts
  useEffect(() => {
    if (currentQuestionIndex < questions.level1.length && !gameOver) {
      setCurrentQuestion(questions.level1[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, gameOver]);

  // Timer and game logic
  useEffect(() => {
    if (timeLeft === 0 || gameOver) {
      setGameOver(true); // If time runs out, end the game
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); // 1 second interval

    return () => clearInterval(interval);
  }, [timeLeft, gameOver]);

  // Handle answer selection
  const handleAnswer = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    setIsButtonDisabled(true); // Disable buttons for 3 seconds

    // Set feedback based on the answer
    if (selectedIndex === currentQuestion.answer) {
      setPoints((prevPoints) => prevPoints + 1); // Increase points on correct answer
      setFeedback({
        type: "correct",
        message: currentQuestion.explanation, // Show explanation on correct answer
      });
    } else {
      setFeedback({
        type: "incorrect",
        message: currentQuestion.tip, // Show tip on incorrect answer
      });
    }

    // Disable buttons for 3 seconds, show feedback, then proceed to next question
    setTimeout(() => {
      setIsButtonDisabled(false); // Enable buttons after 3 seconds
      setFeedback(null); // Hide the feedback temporarily
      setSelectedIndex(null); // Reset the selected index (clear classes)

      // Show feedback for 5 seconds
      setTimeout(() => {
        // Proceed to the next question
        setCurrentQuestionIndex((prevIndex) => {
          if (prevIndex + 1 < questions.level1.length) {
            return prevIndex + 1;
          } else {
            setGameOver(true); // End the game when all questions are done
            return prevIndex;
          }
        });
      }, 100); // Delay before showing the next question and re-enabling the buttons
    }, 5000); // Delay before showing feedback and enabling the next question
  };

  // Set result message when game is over and add a timer to redirect
  useEffect(() => {
    if (gameOver) {
      if (points >= 2) {
        setResultMessage("Winner! Congratulations!");
      } else {
        setResultMessage("The score is too low");
      }

      // Set a 5-second timer to redirect after showing the result message
      const timer = setTimeout(() => {
        navigate("/minigame"); // Redirect to the minigames page
      }, 5000); // 5000ms = 5 seconds

      return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }
  }, [gameOver, points, navigate]);

  return (
    <div>
      {!showContent && (
        <div className="counter">
          <div className="LoadingPage">
            <h1>INVESTMENT</h1>
            <div className="loading-bar-border">
              <div className="loading-bar"></div>
            </div>
            <p>“Investing is planting seeds for a fruitful future”</p>
          </div>
        </div>
      )}

      {/* Show How to Play section */}
      {showHowToPlay && (
        <div className="how-to-play">
          <div className="objectives">
            <div className="indicators">
              {["green", "yellow", "red", "blue", "purple"].map(
                (color, index) => (
                  <div
                    key={index}
                    className="indicator-dot"
                    style={{ backgroundColor: color }}
                  ></div>
                )
              )}
            </div>
            <h1>HOW TO PLAY</h1>

            <p>
              •Start with ₱5,000 and make investment decisions each round.
              <br />
              •Choose between stocks, bonds, and real estate.
              <br />
              •After 5 rounds, see how well you did!
              <br />
            </p>
          </div>
          {/* Skip button */}
          <button onClick={handleSkip} className="skip-button">
            SKIP
          </button>
        </div>
      )}

      {/* Start of the game */}
      <div className="game-container">
        <div className="clock-timer">
          <div className="clock-face">
            <div className="hand"></div>
            <div className="center-dot"></div>
            <div className="time-label">{formatTime(timeLeft)}</div>
          </div>
        </div>
        <div className="game-questions-container">
          <div className="points">Points: {points}/5</div>
          <div className="indicators">
            {["green", "yellow", "red", "blue", "purple"].map(
              (color, index) => (
                <div
                  key={index}
                  className="indicator-dot"
                  style={{ backgroundColor: color }}
                ></div>
              )
            )}
          </div>
          <div className="questions">
            {gameOver ? (
              // Show the results when the game is over
              <div className="game-results">
                <h2>{resultMessage}</h2>
                <p>
                  Your final score: {points} out of {questions.level1.length}
                </p>
              </div>
            ) : (
              // Show current question if the game isn't over
              currentQuestion && (
                <div>
                  <p>{currentQuestion.question}</p> {/* Only show once */}
                  <div className="game-option">
                    <button
                      onClick={() => handleAnswer(0)}
                      className={
                        selectedIndex === 0 &&
                        selectedIndex === currentQuestion.answer
                          ? "correct"
                          : selectedIndex === 0
                          ? "incorrect"
                          : ""
                      }
                      disabled={isButtonDisabled} // Disable button when answer is selected
                    >
                      A. {currentQuestion.options[0]}
                    </button>
                    <button
                      onClick={() => handleAnswer(1)}
                      className={
                        selectedIndex === 1 &&
                        selectedIndex === currentQuestion.answer
                          ? "correct"
                          : selectedIndex === 1
                          ? "incorrect"
                          : ""
                      }
                      disabled={isButtonDisabled} // Disable button when answer is selected
                    >
                      B. {currentQuestion.options[1]}
                    </button>
                  </div>
                </div>
              )
            )}

            {/* Display feedback */}
            {feedback && (
              <div className={`feedback ${feedback.type}`}>
                <p>{feedback.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestingPage;
