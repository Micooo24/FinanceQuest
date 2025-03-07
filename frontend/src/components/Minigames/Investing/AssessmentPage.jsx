import React, { useState, useEffect, useRef } from "react"; // Import useState along with useEffect
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import "./InvestingMinigame.css";
import axios from "axios";

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
    {
      question: "why should you know the investment interest?",
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
  const [aiAnalysis, setAiAnalysis] = useState(""); // Define aiAnalysis state
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
  
  const handleAnswer = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    setIsButtonDisabled(true); // Disable buttons for 3 seconds

    // Update selectedAnswers state
    setSelectedAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = {
            question: currentQuestion.question,
            selected_index: selectedIndex,
            is_correct: selectedIndex === currentQuestion.answer,
            timestamp: new Date().toISOString(),
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
            setCurrentQuestionIndex((prevIndex) => {
                if (prevIndex + 1 < questions.level1.length) {
                    return prevIndex + 1;
                } else {
                    setGameOver(true); // Set game over state
                    return prevIndex;
                }
            });
        }, 50); // Delay before showing the next question
    }, 3000); // Delay before showing feedback and enabling the next question
};

// Save answers when gameOver changes
useEffect(() => {
    if (gameOver) {
        saveUserAnswers(selectedAnswers);
    }
}, [gameOver]);

const saveUserAnswers = async (userAnswers) => {
    try {
        const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        const payload = {
            user_id: userId,
            answers: userAnswers,
        };

        console.log('Payload:', JSON.stringify(payload, null, 2)); // Log the payload to verify its structure

        // Save user answers
        const saveResponse = await axios.post('http://localhost:8000/miniInvesting/save-answers', payload);
        console.log(saveResponse.data.message);

        // Only proceed to analyze miniInvest if the save was successful
        if (saveResponse.status === 200) {
            const analyzeResponse = await axios.post(`http://localhost:8000/miniInvesting_ai/analyze-miniInvest/${userId}`);
            console.log('Analysis:', analyzeResponse.data.analysis);

          // Fetch the latest AI analysis after the analysis is completed
          fetchAiAnalysis(userId);
        } else {
            console.error('Failed to save user answers');
        }

    } catch (error) {
        console.error('Error:', error);
    }
};


const fetchAiAnalysis = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8000/miniInvesting_ai/get-miniInvest-analysis/${userId}`);
    if (response.data && response.data.analysis) {
      setAiAnalysis(response.data.analysis);
    } else {
      console.error('No analysis data found in response');
    }
  } catch (error) {
    console.error('Error fetching AI analysis:', error);
  }
};

useEffect(() => {
  if (gameOver) {
    // Calculate results and update state

    // Set result message based on points
    if (points >= 10) {
      setResultMessage("Winner! Congratulations!");
    } else {
      setResultMessage("The score is too low");
    }

    // Fetch AI analysis
    const userId = localStorage.getItem('userId');
    fetchAiAnalysis(userId);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }
}, [gameOver, points, navigate]);


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
  
      // Fetch AI analysis
      const userId = localStorage.getItem('userId');
      fetchAiAnalysis(userId);
  
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

                           {/* Display AI analysis */}
                           {aiAnalysis && (
                          <div
                            style={{
                              marginTop: "20px",
                              padding: "20px",
                              backgroundColor: "#351742",
                              borderRadius: "10px",
                              color: "#fff",
                              textAlign: "left",
                            }}
                          >
                            <h3>AI Analysis</h3>
                            <p>{aiAnalysis}</p>
                          </div>
                        )}
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
