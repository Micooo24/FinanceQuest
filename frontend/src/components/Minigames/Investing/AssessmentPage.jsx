import React, { useState, useEffect, useRef } from "react"; // Import useState along with useEffect
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import "./InvestingMinigame.css";
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
    {
      question: "What is the purpose of an emergency fund?",
      options: [
        "To cover unexpected expenses without touching investments",
        "To buy more stocks when the market dips",
      ],
      answer: 0,
      tip: "An emergency fund acts as a financial safety net.",
      explanation:
        "Having an emergency fund prevents you from having to sell investments prematurely during financial crises.",
    },
    {
      question: "When should you start investing?",
      options: [
        "As soon as you have stable income and an emergency fund",
        "Only after retirement",
      ],
      answer: 0,
      tip: "The earlier you start, the more time your money has to grow.",
      explanation:
        "Starting early allows you to benefit from compound growth, significantly increasing returns over time.",
    },
    {
      question: "What does 'compounding' mean in investing?",
      options: [
        "Earning returns on your initial investment and its accumulated gains",
        "Investing in multiple stocks simultaneously",
      ],
      answer: 0,
      tip: "Compounding accelerates wealth growth by reinvesting earnings.",
      explanation:
        "Compounding allows your earnings to generate additional returns over time, creating exponential growth.",
    },
    {
      question: "What is dollar-cost averaging?",
      options: [
        "Investing a fixed amount regularly regardless of market conditions",
        "Buying stocks only during market dips",
      ],
      answer: 0,
      tip: "Consistency in investing helps reduce the impact of market volatility.",
      explanation:
        "Dollar-cost averaging spreads out investments over time, reducing the risk of market timing and price fluctuations.",
    },
    {
      question: "What is a 'bull market'?",
      options: [
        "A market condition where prices are generally rising",
        "A market condition where prices are consistently falling",
      ],
      answer: 0,
      tip: "A bull market is a sign of investor confidence and economic growth.",
      explanation:
        "In a bull market, investor optimism drives prices upward, creating opportunities for gains.",
    },
    {
      question: "Why is setting financial goals important before investing?",
      options: [
        "It helps you choose investments that align with your needs",
        "It ensures you will never lose money",
      ],
      answer: 0,
      tip: "Financial goals guide your investment decisions.",
      explanation:
        "Clear goals provide direction, helping you select the right investments to achieve them.",
    },
    {
      question: "What is a 'stock dividend'?",
      options: [
        "A share of a company's profits distributed to its shareholders",
        "The price you pay to buy a share",
      ],
      answer: 0,
      tip: "Dividends are a reward for being a shareholder.",
      explanation:
        "Dividends represent a portion of a company's profits, offering regular income in addition to potential stock value growth.",
    },
    {
      question: "What is the main benefit of mutual funds?",
      options: [
        "They offer professional management and diversification",
        "They guarantee high returns",
      ],
      answer: 0,
      tip: "Mutual funds are managed by professionals who diversify investments for you.",
      explanation:
        "Mutual funds pool money from many investors to buy a diversified portfolio, reducing individual risk.",
    },
    {
      question: "What should you do before investing in a company?",
      options: [
        "Research its financial performance and future potential",
        "Buy shares based on market trends alone",
      ],
      answer: 0,
      tip: "Understanding the company ensures informed investment decisions.",
      explanation:
        "Analyzing a company's financial health and growth prospects reduces the risk of losses.",
    },
    {
      question: "What does a high P/E (Price-to-Earnings) ratio indicate?",
      options: [
        "The stock might be overvalued",
        "The stock is a guaranteed safe investment",
      ],
      answer: 0,
      tip: "A high P/E ratio suggests the market expects high future growth.",
      explanation:
        "While a high P/E ratio might indicate potential growth, it could also mean the stock is overvalued.",
    },
    {
      question: "Why is rebalancing your portfolio important?",
      options: [
        "To maintain your desired asset allocation",
        "To sell low-performing investments in a panic",
      ],
      answer: 0,
      tip: "Rebalancing ensures your investments stay aligned with your goals.",
      explanation:
        "Regularly adjusting your portfolio helps manage risk and adapt to changing market conditions.",
    },
    {
      question:
        "What is the primary purpose of bonds in an investment portfolio?",
      options: [
        "To provide stability and regular income",
        "To achieve rapid high returns",
      ],
      answer: 0,
      tip: "Bonds are typically lower-risk investments that balance portfolios.",
      explanation:
        "Bonds offer steady returns and lower risk, making them a good counterbalance to higher-risk assets like stocks.",
    },
    {
      question: "What does ROI (Return on Investment) measure?",
      options: [
        "The profitability of an investment",
        "The total amount invested",
      ],
      answer: 0,
      tip: "ROI compares your gains to your investment cost.",
      explanation:
        "ROI is a percentage that indicates how profitable an investment is relative to its cost.",
    },
    {
      question: "What should you avoid when investing in stocks?",
      options: [
        "Making emotional decisions based on market fluctuations",
        "Sticking to your investment strategy",
      ],
      answer: 0,
      tip: "Emotional decisions often lead to poor outcomes.",
      explanation:
        "Avoid reacting to short-term market changes emotionally. Focus on long-term strategies.",
    },
    {
      question: "What is the benefit of index funds?",
      options: [
        "Low fees and diversified market exposure",
        "Guaranteed higher returns than other funds",
      ],
      answer: 0,
      tip: "Index funds mirror market performance with low management costs.",
      explanation:
        "Index funds are cost-effective and provide broad market exposure, ideal for long-term investors.",
    },
    {
      question: "Why should you track your net worth regularly?",
      options: [
        "To monitor financial progress and make adjustments",
        "To know how much money you can spend immediately",
      ],
      answer: 0,
      tip: "Tracking net worth helps you assess your overall financial health.",
      explanation:
        "Regularly reviewing your net worth allows you to evaluate financial progress and adjust plans as needed.",
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

  const threeMinutesTimer = 120; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(threeMinutesTimer);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Initialize as empty array
  let timer; // Declare the timer variable at the top of your component or relevant scope
  // Calculate analytics when the game is over

  const handleAnswer = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    setIsButtonDisabled(true); // Disable buttons for 3 seconds

    // Update selectedAnswers state
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        question: currentQuestion.question,
        selectedIndex,
        isCorrect: selectedIndex === currentQuestion.answer,
      };
      return updatedAnswers;
    });

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
      }, 50); // Delay before showing the next question and re-enabling the buttons
    }, 3000); // Delay before showing feedback and enabling the next question
  };
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

  useEffect(() => {
    if (gameOver) {
      // Calculate results and update state

      // Set result message based on points
      if (points >= 10) {
        setResultMessage("Winner! Congratulations!");
      } else {
        setResultMessage("The score is too low");
      }
      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [gameOver, points, navigate]);

  return (
    <div
      style={{
        backgroundImage: `url("/assets/bg.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "white",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(150, 71, 144, 0.5)", // Transparent black
          zIndex: 1,
        }}
      >
        <div
          style={{
            backgroundImage: `url("/assets/bg.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "relative",
            color: "white",
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(62, 23, 61, 0.5)", // Transparent black
              zIndex: 1,
            }}
          >
            {!showContent && (
              <div className="counter">
                <div className="LoadingPage">
                  <h1 style={{ color: "white" }}>INVESTMENT</h1>
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
                    • Answer All the Questions, 10 seconds per question.
                    <br />
                    • The passing score is at least 50%.
                    <br />
                    • Do your best.
                    <br />
                    • Assessing literacy is a must as it helps identify areas
                    where improvement is needed, ensures effective learning, and
                    supports personal and professional growth.
                    <br />
                    • Read each question carefully before answering.
                    <br />
                    • Choose the best answer from the options provided.
                    <br />
                    • You cannot go back to a previous question once you
                    proceed.
                    <br />
                    • Keep an eye on the timer to stay within the 2-minutes
                    limit.
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
                <div className="points">Points: {points}/21</div>
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
                    <div
                      className="game-results"
                      style={{
                        height: "calc(100vh - 40px)",
                        width: "100vw",
                        padding: "20px",
                        margin: "0",
                        backgroundColor: "#00cac9", // Parang Blue-Green background
                        borderRadius: "0",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        overflowY: "auto",
                        position: "fixed",
                        top: "0",
                        left: "0",
                        zIndex: "99999",
                      }}
                    >
                      <h2 style={{ color: "#351742" }}>{resultMessage}</h2>
                      <p style={{ color: "#5e3967", fontSize: "1.2rem" }}>
                        Your final score: {points} out of{" "}
                        {questions.level1.length}
                      </p>

                      <div
                        style={{
                          marginTop: "10px",
                          padding: "20px",
                          backgroundColor: "#5e3967", // Light Purple background
                          borderRadius: "20px", // Rounded corners for a softer, playful look
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Slightly exaggerated shadow for depth
                          width: "45%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          border: "5px dashed #351742", // Dashed border for a fun, hand-drawn vibe
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Comic Sans MS', cursive, sans-serif", // Playful font
                            fontSize: "1.2rem",
                            color: "#00cac9", // Parang Blue Green for text
                            textAlign: "center", // Center-align for a friendly feel
                            lineHeight: "1.5", // Comfortable spacing for readability
                          }}
                        >
                          🌟 You answered <strong>{points}</strong> questions
                          correctly and{" "}
                          <strong>{questions.level1.length - points}</strong>{" "}
                          questions incorrectly. <br />
                          🎉 Your performance indicates a{" "}
                          <strong>
                            {Math.round(
                              (points / questions.level1.length) * 100
                            )}
                            %
                          </strong>{" "}
                          accuracy rate. <br /> 🚀 Keep practicing to improve
                          further!
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          gap: "20px",
                          marginTop: "20px",
                        }}
                      >
                        <div>
                          <h3 style={{ color: "#351742" }}>
                            Performance Analysis
                          </h3>
                          <PieChart width={300} height={355}>
                            <Pie
                              data={[
                                {
                                  name: "Correct",
                                  value: points, // Correct points assignment
                                },
                                {
                                  name: "Incorrect",
                                  value: questions.level1.length - points, // Ensure logical difference
                                },
                              ]}
                              dataKey="value"
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              fill="#8884d8"
                              paddingAngle={5}
                              label
                            >
                              <Cell key="Correct" fill="yellow" />
                              <Cell key="Incorrect" fill="#ff6f61" />
                            </Pie>
                            <Legend />
                            <Tooltip />
                          </PieChart>
                        </div>

                        <div>
                          <h3 style={{ color: "#351742" }}>Summary Table</h3>
                          <table
                            style={{
                              border: "1px solid #5e3967",
                              borderCollapse: "collapse",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: "#5e3967",
                                  color: "#fff",
                                }}
                              >
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                  }}
                                >
                                  Metric
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                  }}
                                >
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                  }}
                                >
                                  Correct Answers
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                  }}
                                >
                                  {points}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                  }}
                                >
                                  Incorrect Answers
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                  }}
                                >
                                  {questions.level1.length - points}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                  }}
                                >
                                  Accuracy Rate
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                  }}
                                >
                                  {Math.round(
                                    (points / questions.level1.length) * 100
                                  )}
                                  %
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <Link
                        to="/About_Page_Investing"
                        style={{ textDecoration: "none", marginTop: "20px" }}
                      >
                        <button
                          style={{
                            padding: "15px 30px",
                            backgroundColor: "#ff69b4",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "1.2rem",
                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                            margin: "20px",
                          }}
                        >
                          Home
                        </button>
                      </Link>
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
        </div>
      </div>
    </div>
  );
};

export default InvestingPage;
