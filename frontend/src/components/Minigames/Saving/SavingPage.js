import React, { useState, useEffect, useRef } from "react"; // Import useState along with useEffect
import { useNavigate } from "react-router-dom";
import "../Minigame.css";

const questions = {
  level1: [
    {
      question: "Which is a better saving strategy?",
      options: [
        "Spending all your income each month",
        "Setting aside a portion of your income for savings",
      ],
      answer: 1, // index of the correct option
      tip: "Saving consistently ensures financial security and helps you build wealth over time.",
      explanation:
        "Setting aside a portion of your income helps you create an emergency fund and prepare for future goals.",
    },
    {
      question:
        "If you find yourself unable to save each month, what should you do?",
      options: [
        "Continue spending as usual",
        "Review your expenses and find areas to cut back for savings",
      ],
      answer: 1,
      tip: "Saving may require sacrifices in the short term, but it's essential for long-term financial health.",
      explanation:
        "Identifying areas where you can cut back allows you to redirect money toward savings without disrupting your lifestyle.",
    },
    {
      question: "Why is it important to have a savings plan?",
      options: [
        "It helps ensure you're prepared for emergencies and future expenses",
        "It limits your spending and leaves you with less money to enjoy now",
      ],
      answer: 0,
      tip: "Having a plan gives you peace of mind and helps you meet your financial goals, big or small.",
      explanation:
        "A savings plan helps you manage your finances better by setting aside funds for future needs and emergencies.",
    },
    {
      question: "What is the best way to save for an emergency fund?",
      options: [
        "Put all your savings into one large account and only use it when necessary",
        "Save a small, consistent amount each month to gradually build an emergency fund",
      ],
      answer: 1,
      tip: "Regular, small contributions are easier to manage and ensure you're always prepared for unexpected events.",
      explanation:
        "By saving a little each month, you can build an emergency fund that’s available when needed without stress.",
    },
    {
      question: "How should you approach saving for retirement?",
      options: [
        "Start saving early and invest in retirement accounts to maximize growth",
        "Save a small amount in a savings account and hope it's enough when you retire",
      ],
      answer: 0,
      tip: "The earlier you start saving and investing for retirement, the better your future financial security will be.",
      explanation:
        "Starting early allows your investments to grow over time, giving you a larger nest egg by retirement age.",
    },
  ],
};

const SavingPage = () => {
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
            <h1>SAVINGS</h1>
            <div className="loading-bar-border">
              <div className="loading-bar"></div>
            </div>
            <p>“Every peso saved is a step toward financial freedom”</p>
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
              <br />
              • Read each savings scenario carefully.
              <br /> •Choose the best answer from the four options (A, B, C, or
              D). <br />
              •Learn from the explanation after each choice. •Complete all 10
              questions within 5 minutes.
              <br />
              •Check your score and feedback at the end.
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

export default SavingPage;
