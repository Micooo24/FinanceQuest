import React, { useState, useEffect, useRef } from "react"; // Import useState along with useEffect
import { useNavigate } from "react-router-dom";
import "../Minigame.css";

const questions = {
  level1: [
    {
      question: "Which is a better budgeting strategy?",
      options: [
        "Spending more than your income",
        "Allocating savings before expenses",
      ],
      answer: 1, // index of the correct option
      tip: "Spending more than your income leads to debt. Try creating a budget that prioritizes needs and savings.",
      explanation:
        "Allocating savings first ensures you build financial security while controlling expenses.",
    },
    {
      question: "If you overspend your budget, what should you do?",
      options: [
        "Use a credit card to cover the excess",
        "Adjust future expenses to stay within budget",
      ],
      answer: 1,
      tip: "Using credit cards may cover immediate costs but increases long-term debt.",
      explanation:
        "Adjusting future expenses helps you stay financially disciplined without relying on debt.",
    },
    {
      question: "Why is having financial goals important?",
      options: [
        "Helps guide your spending and saving habits",
        "Keeps money management unpredictable",
      ],
      answer: 0,
      tip: "Unpredictable money management often leads to poor financial decisions.",
      explanation:
        "Financial goals provide direction and motivate disciplined saving and spending.",
    },
    {
      question: "What is an emergency fund?",
      options: [
        "A savings buffer for unexpected expenses",
        "A long-term investment account",
      ],
      answer: 0,
      tip: "Not having an emergency fund can lead to financial stress during unexpected events.",
      explanation:
        "An emergency fund provides financial peace of mind and ensures you're prepared for the unexpected.",
    },
    {
      question: "How should you prioritize paying off debt?",
      options: [
        "Pay off high-interest debt first",
        "Pay off small debts first to feel accomplished",
      ],
      answer: 0,
      tip: "Paying off high-interest debt first saves you more money in the long run.",
      explanation:
        "Prioritizing high-interest debt reduces the amount of interest you pay over time, improving your financial health.",
    },
  ],
};

const BudgetingPage = () => {
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
            <h1>BUDGETING</h1>
            <div className="loading-bar-border">
              <div className="loading-bar"></div>
            </div>
            <p>
              “A budget is more than numbers; it’s your plan for a better
              future”
            </p>
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
              Objective: <br />• Manage a fixed monthly income by allocating
              funds to essentials, savings, and discretionary spending while
              handling predefined challenges <br />
              <br />
              Game Duration: <br />
              •Total game time: 5 minutes. <br />
              •The month is split into 4 weeks, each lasting 1 minute.
              <br />
              <br /> Game Mechanics: <br />
              •The player chooses an answer for each question <br />
              •Results will be displayed after the player finishes the game
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

export default BudgetingPage;
