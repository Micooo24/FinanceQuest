import React, { useState, useEffect, useRef } from "react"; // Import useState along with useEffect
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import "./InvestingMinigame.css";
import axios from "axios";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import tuplogo from "/assets/TUPLogo.png";
import fqlogo from "/assets/financial.jpg";
import { renderToString } from "react-dom/server";

const questions = {
  level1: [
    // Investment Basics Category (4 questions)
    {
      category: "Investment Basics",
      question: "What is diversification in investing?",
      options: [
        "Putting all money in one stock",
        "Spreading investments across different assets",
        "Only investing in high-risk options",
        "Keeping all money in savings",
      ],
      answer: 1,
      tip: "Think about not putting all eggs in one basket",
      explanation: "Diversification reduces risk by spreading investments",
    },
    {
      category: "Investment Basics",
      question: "Which investment typically has the lowest risk?",
      options: [
        "Cryptocurrency",
        "Government bonds",
        "Penny stocks",
        "Forex trading",
      ],
      answer: 1,
      tip: "Government-backed securities are generally safer",
      explanation:
        "Government bonds are backed by the full faith of the government",
    },
    {
      category: "Investment Basics",
      question: "What is compound interest?",
      options: [
        "Interest only on principal",
        "Interest earned on interest",
        "Fixed monthly payment",
        "One-time payment",
      ],
      answer: 1,
      tip: "Think about growth over time",
      explanation:
        "Compound interest is interest earned on both principal and accumulated interest",
    },
    {
      category: "Investment Basics",
      question: "What is a mutual fund?",
      options: [
        "Individual stock purchase",
        "Pooled investment vehicle",
        "Bank savings account",
        "Government bond",
      ],
      answer: 1,
      tip: "Think about collective investing",
      explanation:
        "Mutual funds pool money from multiple investors to invest in various securities",
    },
    // Risk Management Category (4 questions)
    {
      category: "Risk Management",
      question: "What is the purpose of an emergency fund?",
      options: [
        "To invest in stocks",
        "For vacation savings",
        "For unexpected expenses",
        "For regular bills",
      ],
      answer: 2,
      tip: "Think about unexpected situations",
      explanation:
        "Emergency funds provide financial security for unexpected events",
    },
    {
      category: "Risk Management",
      question: "What is risk tolerance?",
      options: [
        "Maximum investment amount",
        "Ability to handle losses",
        "Minimum return required",
        "Investment timeline",
      ],
      answer: 1,
      tip: "Think about comfort with losses",
      explanation:
        "Risk tolerance measures how much investment loss you can handle",
    },
    {
      category: "Risk Management",
      question: "What is portfolio rebalancing?",
      options: [
        "Adding new investments",
        "Removing investments",
        "Maintaining target allocations",
        "Closing accounts",
      ],
      answer: 2,
      tip: "Think about maintaining balance",
      explanation:
        "Rebalancing keeps your investment mix aligned with your goals",
    },
    {
      category: "Risk Management",
      question: "What is asset allocation?",
      options: [
        "Buying single stocks",
        "Distributing investments",
        "Selling all assets",
        "Borrowing money",
      ],
      answer: 1,
      tip: "Think about investment distribution",
      explanation:
        "Asset allocation is the strategic distribution of investments",
    },
    // Market Analysis Category (4 questions)
    {
      category: "Market Analysis",
      question: "What is a bull market?",
      options: [
        "Market is falling",
        "Market is rising",
        "Market is closed",
        "Market is stable",
      ],
      answer: 1,
      tip: "Think about upward trends",
      explanation: "Bull market indicates rising market prices and optimism",
    },
    {
      category: "Market Analysis",
      question: "What is market volatility?",
      options: [
        "Market closing time",
        "Price fluctuations",
        "Trading volume",
        "Market opening",
      ],
      answer: 1,
      tip: "Think about price changes",
      explanation:
        "Volatility measures the rate and magnitude of price changes",
    },
    {
      category: "Market Analysis",
      question: "What is a P/E ratio?",
      options: [
        "Profit to expense",
        "Price to earnings",
        "Performance evaluation",
        "Portfolio efficiency",
      ],
      answer: 1,
      tip: "Think about stock valuation",
      explanation: "P/E ratio compares stock price to company earnings",
    },
    {
      category: "Market Analysis",
      question: "What is market capitalization?",
      options: [
        "Company debt",
        "Total company value",
        "Annual profit",
        "Employee count",
      ],
      answer: 1,
      tip: "Think about company worth",
      explanation: "Market cap is total value of company's outstanding shares",
    },
  ],
};

// Update timer configuration
const questionTimer = 10; // 10 seconds per question

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
  const [questionStartTime, setQuestionStartTime] = useState(Date.now()); // Track start time for new question
  let timer; // Declare the timer variable at the top of your component or relevant scope

  // Add new state for randomized questions
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);

  // Function to shuffle array
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  // Initialize randomized questions
  useEffect(() => {
    // Create a copy of the questions and shuffle them
    const shuffledQuestions = shuffleArray(
      [...questions.level1]
        .map((q) => ({
          ...q,
          // Shuffle the options and keep track of the original answer index
          options: shuffleArray(
            [...q.options].map((opt, i) => ({ text: opt, originalIndex: i }))
          ),
        }))
        .map((q) => {
          // Update the answer index based on the shuffled options
          const newAnswerIndex = q.options.findIndex(
            (opt) => opt.originalIndex === q.answer
          );
          return {
            ...q,
            answer: newAnswerIndex,
            options: q.options.map((opt) => opt.text),
          };
        })
    );
    setRandomizedQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (selectedIndex) => {
    const answerTime = new Date().getTime() - questionStartTime;
    setSelectedIndex(selectedIndex);
    setIsButtonDisabled(true);

    // Create the answer object with all necessary properties
    const newAnswer = {
      question: currentQuestion.question,
      category: currentQuestion.category,
      selected_index: selectedIndex,
      correct_index: currentQuestion.answer,
      is_correct: selectedIndex === currentQuestion.answer,
      explanation:
        selectedIndex === currentQuestion.answer
          ? currentQuestion.explanation
          : `Incorrect. ${currentQuestion.tip}`,
      response_time: answerTime / 1000,
      confidence_level:
        answerTime < 5000 ? "high" : answerTime < 15000 ? "medium" : "low",
      timestamp: new Date().toISOString(),
    };

    // Update selectedAnswers immutably
    setSelectedAnswers((prev) => [...prev, newAnswer]);

    // Show both the selected answer and correct answer
    if (selectedIndex === currentQuestion.answer) {
      setPoints((prevPoints) => prevPoints + 1);
      setFeedback({
        type: "correct",
        message: currentQuestion.explanation,
      });
    } else {
      setFeedback({
        type: "incorrect",
        message: `${currentQuestion.tip} (Correct answer: ${String.fromCharCode(
          65 + currentQuestion.answer
        )})`,
      });
    }

    // Rest of the timing logic remains the same
    setTimeout(() => {
      setIsButtonDisabled(false); // Enable buttons after 3 seconds
      setFeedback(null); // Hide the feedback temporarily
      setSelectedIndex(null); // Reset the selected index (clear classes)

      // Show feedback for 5 seconds
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => {
          if (prevIndex + 1 < randomizedQuestions.length) {
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
      const userId = localStorage.getItem("userId"); // Retrieve userId from local storage
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const payload = {
        user_id: userId,
        answers: userAnswers,
        score: points,
      };

      console.log("Payload:", JSON.stringify(payload, null, 2)); // Log the payload to verify its structure

      // Save user answers
      const saveResponse = await axios.post(
        "http://localhost:8000/miniInvesting/save-answers",
        payload
      );
      console.log(saveResponse.data.message);

      // Only proceed to analyze miniInvest if the save was successful
      if (saveResponse.status === 200) {
        const analyzeResponse = await axios.post(
          `http://localhost:8000/miniInvesting_ai/analyze-miniInvest/${userId}`
        );
        console.log("Analysis:", analyzeResponse.data.analysis);
        // Fetch the latest AI analysis after the analysis is completed
        fetchAiAnalysis(userId);
      } else {
        console.error("Failed to save user answers");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAiAnalysis = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/miniInvesting_ai/get-miniInvest-analysis/${userId}`
      );
      if (response.data && response.data.analysis) {
        setAiAnalysis(response.data.analysis);
      } else {
        console.error("No analysis data found in response");
      }
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
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
      const userId = localStorage.getItem("userId");
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
    if (currentQuestionIndex < randomizedQuestions.length && !gameOver) {
      setCurrentQuestion(randomizedQuestions[currentQuestionIndex]);
      setQuestionStartTime(Date.now()); // Reset start time for new question
    }
  }, [currentQuestionIndex, gameOver, randomizedQuestions]);

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
      const userId = localStorage.getItem("userId");
      fetchAiAnalysis(userId);
      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [gameOver, points, navigate]);

  const getCategoryPerformance = () => {
    const categoryStats = {};

    try {
      // Map questions to their categories for easier lookup
      const questionsByCategory = {};
      questions.level1.forEach((q) => {
        if (!questionsByCategory[q.category]) {
          questionsByCategory[q.category] = [];
        }
        questionsByCategory[q.category].push(q);
      });

      // Initialize stats for all categories
      Object.keys(questionsByCategory).forEach((category) => {
        categoryStats[category] = {
          correct: 0,
          total: questionsByCategory[category].length,
        };
      });

      // Process answered questions
      if (selectedAnswers && selectedAnswers.length > 0) {
        selectedAnswers.forEach((answer) => {
          if (answer && answer.category && answer.is_correct !== undefined) {
            if (answer.is_correct) {
              categoryStats[answer.category].correct += 1;
            }
          }
        });
      }

      return categoryStats;
    } catch (error) {
      console.error("Error in getCategoryPerformance:", error);
      // Fallback to default stats
      return {
        "Investment Basics": { correct: 0, total: 4 },
        "Risk Management": { correct: 0, total: 4 },
        "Market Analysis": { correct: 0, total: 4 },
      };
    }
  };

  const generatePDF = () => {
    try {
      // Ensure we have answers before generating PDF
      if (!selectedAnswers || selectedAnswers.length === 0) {
        console.error("No answers available");
        alert("Please complete the assessment first");
        return null;
      }

      const categoryPerformance = getCategoryPerformance();

      if (
        !categoryPerformance ||
        Object.keys(categoryPerformance).length === 0
      ) {
        console.error("No category performance data available");
        return null;
      }

      // Filter out any invalid answers
      const validAnswers = selectedAnswers.filter(
        (answer) =>
          answer &&
          answer.question &&
          answer.selected_index !== undefined &&
          answer.correct_index !== undefined &&
          answer.response_time !== undefined
      );

      if (validAnswers.length === 0) {
        console.error("No valid answers available");
        return null;
      }

      const commonHeader = (title) => (
        <View style={styles.header}>
          <Image style={styles.logo} src={tuplogo} />
          <Text style={styles.heading}>{title}</Text>
          <Image style={styles.logo} src={fqlogo} />
        </View>
      );

      return (
        <Document>
          {/* Page 1: Summary and Performance */}
          <Page style={styles.page} size="A4">
            <Watermark />
            {commonHeader("INVESTMENT ASSESSMENT REPORT - PERFORMANCE")}

            {/* User Details and Summary */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.section}>
                <Text style={styles.heading}>User Details</Text>
                <Text style={styles.text}>
                  User ID: {localStorage.getItem("userId")}
                </Text>
                <Text style={styles.text}>
                  Date: {new Date().toLocaleDateString()}
                </Text>
                <Text style={styles.text}>
                  Time: {new Date().toLocaleTimeString()}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.heading}>Assessment Summary</Text>
                <Text style={styles.text}>
                  Total Questions: {questions.level1.length}
                </Text>
                <Text style={styles.text}>Correct Answers: {points}</Text>
                <Text style={styles.text}>
                  Accuracy:{" "}
                  {Math.round((points / questions.level1.length) * 100)}%
                </Text>
              </View>
            </View>

            {/* Category Performance */}
            <View style={styles.section}>
              <Text style={styles.heading}>Category Performance</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Category</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Score</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Performance</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Status</Text>
                  </View>
                </View>
                {Object.entries(getCategoryPerformance()).map(
                  ([category, stats]) => (
                    <View key={category} style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{category}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {stats.correct}/{stats.total}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Math.round((stats.correct / stats.total) * 100)}%
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {stats.correct / stats.total >= 0.5
                            ? "PASS"
                            : "NEEDS IMPROVEMENT"}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              </View>
            </View>

            {/* Question Analysis */}
            <View style={styles.section}>
              <Text style={styles.heading}>Question Analysis</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={{ ...styles.tableCol, width: "35%" }}>
                    <Text style={styles.tableCell}>Question</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "15%" }}>
                    <Text style={styles.tableCell}>Your Answer</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "15%" }}>
                    <Text style={styles.tableCell}>Correct Answer</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "15%" }}>
                    <Text style={styles.tableCell}>Time</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "20%" }}>
                    <Text style={styles.tableCell}>Status</Text>
                  </View>
                </View>
                {validAnswers.map((answer, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={{ ...styles.tableCol, width: "35%" }}>
                      <Text style={styles.tableCell}>
                        {answer.question || "N/A"}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "15%" }}>
                      <Text style={styles.tableCell}>
                        {answer.selected_index !== undefined
                          ? String.fromCharCode(65 + answer.selected_index)
                          : "N/A"}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "15%" }}>
                      <Text style={styles.tableCell}>
                        {answer.correct_index !== undefined
                          ? String.fromCharCode(65 + answer.correct_index)
                          : "N/A"}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "15%" }}>
                      <Text style={styles.tableCell}>
                        {answer.response_time
                          ? `${answer.response_time.toFixed(1)}s`
                          : "N/A"}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text
                        style={{
                          ...styles.tableCell,
                          color: answer.is_correct ? "#008000" : "#FF0000",
                        }}
                      >
                        {answer.is_correct ? "CORRECT" : "INCORRECT"}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </Page>

          {/* Page 2: Feedback Analysis */}
          <Page style={styles.page} size="A4">
            <Watermark />
            {commonHeader("INVESTMENT ASSESSMENT REPORT - FEEDBACK")}

            <View style={styles.section}>
              {/* Investment Basics Analysis */}
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.subheading}>
                  Investment Basics Analysis
                </Text>
                <Text style={styles.text}>
                  {aiAnalysis
                    ?.split("\n\n")
                    .find((section) =>
                      section.toLowerCase().includes("investment basics")
                    )
                    ?.replace("Investment Basics:", "")
                    ?.trim() || "No analysis available"}
                </Text>
              </View>

              {/* Risk Management Analysis */}
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.subheading}>Risk Management Analysis</Text>
                <Text style={styles.text}>
                  {aiAnalysis
                    ?.split("\n\n")
                    .find((section) =>
                      section.toLowerCase().includes("risk management")
                    )
                    ?.replace("Risk Management:", "")
                    ?.replace("AI Analysis:", "")
                    ?.trim() || "No analysis available"}
                </Text>
              </View>

              {/* Market Analysis */}
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.subheading}>Market Analysis Feedback</Text>
                <Text style={styles.text}>
                  {aiAnalysis
                    ?.split("\n\n")
                    .find((section) =>
                      section.toLowerCase().includes("market analysis")
                    )
                    ?.replace("Market Analysis:", "")
                    ?.replace("AI Analysis:", "")
                    ?.trim() || "No analysis available"}
                </Text>
              </View>
            </View>
          </Page>

          {/* Page 3: Detailed Category Analysis */}
          <Page style={styles.page} size="A4">
            <Watermark />
            {commonHeader("INVESTMENT ASSESSMENT REPORT - DETAILED ANALYSIS")}

            <View style={styles.section}>
              <Text style={styles.heading}>
                Category-wise Performance Breakdown
              </Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={{ ...styles.tableCol, width: "30%" }}>
                    <Text style={styles.tableCell}>Category</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "70%" }}>
                    <Text style={styles.tableCell}>Analysis</Text>
                  </View>
                </View>
                {[
                  "Investment Basics",
                  "Risk Management",
                  "Market Analysis",
                ].map((category) => {
                  const categoryAnalysis = aiAnalysis
                    ?.split("\n\n")
                    .find((section) =>
                      section.toLowerCase().includes(category.toLowerCase())
                    );
                  return (
                    <View key={category} style={styles.tableRow}>
                      <View style={{ ...styles.tableCol, width: "30%" }}>
                        <Text style={styles.tableCell}>{category}</Text>
                      </View>
                      <View style={{ ...styles.tableCol, width: "70%" }}>
                        <Text style={styles.tableCell}>
                          {categoryAnalysis
                            ?.replace(`${category}:`, "")
                            .replace("AI Analysis:", "")
                            .trim()}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </Page>
        </Document>
      );
    } catch (error) {
      console.error("Error generating PDF content:", error);
      return null;
    }
  };

  // Update handleDownloadPDF to handle errors
  const handleDownloadPDF = async () => {
    try {
      const pdfContent = generatePDF();
      if (!pdfContent) {
        alert("Unable to generate PDF: No performance data available");
        return;
      }

      const blob = await pdf(pdfContent).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `investment-assessment-${new Date()
        .toLocaleDateString()
        .replace(/\//g, "-")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  Font.register({
    family: "Lilita One",
    src: "https://fonts.gstatic.com/s/lilitaone/v6/i7dPIFZ9Zz-WBtRtedDbUEY.ttf",
  });

  Font.register({
    family: "Roboto",
    src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
  });

  Font.register({
    family: "Lora",
    src: "/assets/fonts/Lora-Medium.ttf",
    fontWeight: "normal",
    format: "truetype",
  });

  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: "Roboto",
      position: "relative",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
    },
    heading: {
      fontSize: 18,
      fontFamily: "Lilita One",
      color: "black",
    },
    section: {
      marginBottom: 20,
    },
    text: {
      fontSize: 12,
      color: "#351742",
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#351742",
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#351742",
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
      color: "#351742",
    },
    watermarkContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: -1,
    },
    watermarkText: {
      fontSize: 30,
      color: "rgba(200, 200, 200, 0.3)",
      position: "absolute",
    },
    subheading: {
      fontSize: 16,
      fontFamily: "Lilita One",
      color: "#351742",
      marginBottom: 10,
    },
  });

  const Watermark = () => (
    <View style={styles.watermarkContainer}>
      {[...Array(10)].map((_, row) =>
        [...Array(5)].map((_, col) => (
          <Text
            key={`${row}-${col}`}
            style={{
              ...styles.watermarkText,
              top: row * 100,
              left: col * 150,
              transform: "rotate(-45deg)",
            }}
          >
            FinanceQuest
          </Text>
        ))
      )}
    </View>
  );

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
                    • Answer All the Questions, 10 seconds per question. (
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
                <div className="points">Points: {points}/12</div>
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
                        backgroundColor: "white", // Parang Blue-Green background
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
                            fontFamily: "'Lora, sans-serif", // Playful font
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
                              fontFamily: "'Lora, sans-serif",
                            }}
                          >
                            <h3>Category Performance Analysis</h3>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                fontFamily: "'Lora, sans-serif",
                              }}
                            >
                              {[
                                "Investment Basics",
                                "Risk Management",
                                "Market Analysis",
                              ].map((category) => {
                                const categoryAnalysis = aiAnalysis
                                  .split("\n\n")
                                  .find((section) =>
                                    section
                                      .toLowerCase()
                                      .includes(category.toLowerCase())
                                  );

                                return (
                                  <div
                                    key={category}
                                    style={{
                                      backgroundColor: "#5e3967",
                                      padding: "15px",
                                      borderRadius: "8px",
                                      border: "2px solid #00cac9",
                                      
                                    }}
                                  >
                                    <h4
                                      style={{
                                        color: "#00cac9",
                                        marginBottom: "10px",
                                        
                                      }}
                                    >
                                      {category}
                                    </h4>
                                    <div
                                      style={{
                                        fontSize: "0.9rem",
                                        lineHeight: "1.4",
                                      }}
                                    >
                                      {categoryAnalysis
                                        ?.split("\n")
                                        .map((line, index) => (
                                          <p
                                            key={index}
                                            style={{
                                              marginBottom: "8px",
                                              color: line.includes("score:")
                                                ? "#ffd700"
                                                : "#fff",
                                            }}
                                          >
                                            {line}
                                          </p>
                                        ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <h3 style={{ color: "#351742" , fontFamily: "'Lora, sans-serif",}}>
                            Performance Analysis
                          </h3>
                          <PieChart width={300} height={355} >
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
                              style={{ color: "#5e3967" , fontFamily: "'Lora, sans-serif",}}
                              label
                            >
                              <Cell key="Correct" fill="green" />
                              <Cell key="Incorrect" fill="red" />
                            </Pie>
                            <Legend />
                            <Tooltip />
                          </PieChart>
                        </div>

                        <div>
                          <h3 style={{ color: "#351742" , fontFamily: "'Lora, sans-serif", }}>Summary Table</h3>
                          <table
                            style={{
                              border: "1px solid #5e3967",
                              borderCollapse: "collapse",
                              width: "100%",
                              textAlign: "left",
                              fontFamily: "'Lora, sans-serif",
                            }}
                          >
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: "#5e3967",
                                  color: "#fff",
                                  fontFamily: "'Lora, sans-serif",
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
                                    color: "black",
                                  }}
                                >
                                  Correct Answers
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                    color: "black",
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
                                    color: "black",
                                  }}
                                >
                                  Incorrect Answers
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                    color: "black",
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
                                    color: "black",
                                  }}
                                >
                                  Accuracy Rate
                                </td>
                                <td
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #351742",
                                    color: "black",
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

                      <div className="performance-charts">
                        {/* Existing PieChart and Summary Table */}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "20px",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            onClick={handleDownloadPDF}
                            style={{
                              padding: "15px 30px",
                              backgroundColor: "#8c2fc7",
                              color: "#fff",
                              border: "none",
                              borderRadius: "10px",
                              cursor: "pointer",
                              fontSize: "1.2rem",
                              fontFamily:
                                "'Lora, sans-serif",
                              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                              margin: "20px",
                            }}
                          >
                            Download Assessment Report
                          </button>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        <Link
                          to="/About_Page_Investing"
                          style={{ textDecoration: "none" }}
                        >
                          <button
                            style={{
                              padding: "15px 30px",
                              backgroundColor: "#8c2fc7",
                              color: "#fff",
                              border: "none",
                              borderRadius: "10px",
                              cursor: "pointer",
                              fontSize: "1.2rem",
                              fontFamily:
                                "'Lora', sans-serif",
                              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                              margin: "20px",
                            }}
                          >
                            Back
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    // Show current question if the game isn't over
                    currentQuestion && (
                      <div>
                        <div style={{ marginBottom: "10px", color: "#FFD700" }}>
                          Category: {currentQuestion.category}
                        </div>
                        <p>{currentQuestion.question}</p>
                        <div
                          className="game-option"
                          style={{
                            top: "50px",
                            bottom: "20px",
                            marginTop: "20px",
                          }}
                        >
                          {currentQuestion?.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              className={`
                                ${
                                  selectedIndex === index
                                    ? selectedIndex === currentQuestion.answer
                                      ? "correct"
                                      : "incorrect"
                                    : ""
                                }
                                ${
                                  selectedIndex !== null &&
                                  index === currentQuestion.answer
                                    ? "show-correct"
                                    : ""
                                }
                            `}
                              disabled={isButtonDisabled}
                            >
                              {String.fromCharCode(65 + index)}. {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
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
