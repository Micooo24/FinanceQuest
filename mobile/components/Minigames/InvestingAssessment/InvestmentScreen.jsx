import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import questions from "./Questions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AssessmentResults from "./AssessmentResults";
import baseURL from "../../../assets/common/baseurl";

const InvestmentScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer
  const [showHowToPlay, setShowHowToPlay] = useState(true);
  const [howToPlayTimeLeft, setHowToPlayTimeLeft] = useState(60); // 1 minute timer for How to Play

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

  const [randomizedQuestions, setRandomizedQuestions] = useState([]);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(
      [...questions.level1]
        .map((q) => ({
          ...q,
          options: shuffleArray(
            [...q.options].map((opt, i) => ({ text: opt, originalIndex: i }))
          ),
        }))
        .map((q) => {
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

    setSelectedAnswers((prev) => [...prev, newAnswer]);

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

    setTimeout(() => {
      setIsButtonDisabled(false);
      setFeedback(null);
      setSelectedIndex(null);

      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => {
          if (prevIndex + 1 < randomizedQuestions.length) {
            return prevIndex + 1;
          } else {
            setGameOver(true);
            return prevIndex;
          }
        });
      }, 50);
    }, 3000);
  };

  useEffect(() => {
    if (gameOver) {
      saveUserAnswers(selectedAnswers);
    }
  }, [gameOver]);

  const saveUserAnswers = async (userAnswers) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in AsyncStorage");
        return;
      }

      const payload = {
        user_id: userId,
        answers: userAnswers,
        score: points,
      };

      console.log("Payload:", JSON.stringify(payload, null, 2));

      const saveResponse = await axios.post(
        `${baseURL}/miniInvesting/save-answers`,
        payload
      );
      console.log(saveResponse.data.message);

      if (saveResponse.status === 200) {
        const analyzeResponse = await axios.post(
          `${baseURL}/miniInvesting_ai/analyze-miniInvest/${userId}`
        );
        console.log("Analysis:", analyzeResponse.data.analysis);
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
        `${baseURL}/miniInvesting_ai/get-miniInvest-analysis/${userId}`
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
      if (points >= 10) {
        setResultMessage("Winner! Congratulations!");
      } else {
        setResultMessage("The score is too low");
      }
      const fetchAnalysis = async () => {
        const userId = await AsyncStorage.getItem("userId");
        fetchAiAnalysis(userId);
      };
      fetchAnalysis();
    }
  }, [gameOver, points]);

  useEffect(() => {
    if (timeLeft === 0 || gameOver) {
      setGameOver(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if (showHowToPlay && howToPlayTimeLeft > 0) {
      const timer = setInterval(() => {
        setHowToPlayTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (howToPlayTimeLeft === 0) {
      setShowHowToPlay(false);
    }
  }, [howToPlayTimeLeft, showHowToPlay]);

  useEffect(() => {
    if (currentQuestionIndex < randomizedQuestions.length && !gameOver) {
      setCurrentQuestion(randomizedQuestions[currentQuestionIndex]);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex, gameOver, randomizedQuestions]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSkip = () => {
    setShowHowToPlay(false);
  };

  const handleNext = () => {
    navigation.navigate("Assessment_Result", {
      points,
      totalQuestions: questions.level1.length,
      resultMessage,
      aiAnalysis,
    });
  };

  return (
    <View style={styles.container}>
      {showHowToPlay ? (
        <View style={styles.howToPlay}>
          <Text style={styles.howToPlayText}>HOW TO PLAY</Text>
          <Text style={styles.howToPlayInstructions}>
            • Answer All the Questions, 10 seconds per question.
            {"\n"}• The passing score is at least 50%.
            {"\n"}• Do your best.
            {"\n"}• Assessing literacy is a must as it helps identify areas
            where improvement is needed, ensures effective learning, and
            supports personal and professional growth.
            {"\n"}• Read each question carefully before answering.
            {"\n"}• Choose the best answer from the options provided.
            {"\n"}• You cannot go back to a previous question once you proceed.
            {"\n"}• Keep an eye on the timer to stay within the 2-minutes limit.
          </Text>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>SKIP</Text>
          </TouchableOpacity>
        </View>
      ) : gameOver ? (
        <AssessmentResults
          points={points}
          totalQuestions={questions.level1.length}
          resultMessage={resultMessage}
          aiAnalysis={aiAnalysis}
          navigation={navigation}
          selectedAnswers={selectedAnswers} // Add this prop
        />
      ) : (
        <View style={styles.gameContainer}>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <Text style={styles.points}>Points: {points}/12</Text>
          {currentQuestion && (
            <View style={styles.questionContainer}>
              <Text style={styles.category}>
                Category: {currentQuestion.category}
              </Text>
              <Text style={styles.question}>{currentQuestion.question}</Text>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAnswer(index)}
                  style={[
                    styles.optionButton,
                    selectedIndex === index
                      ? selectedIndex === currentQuestion.answer
                        ? styles.correctOption
                        : styles.incorrectOption
                      : null,
                    selectedIndex !== null && index === currentQuestion.answer
                      ? styles.showCorrectOption
                      : null,
                  ]}
                  disabled={isButtonDisabled}
                >
                  <Text style={styles.optionText}>
                    {String.fromCharCode(65 + index)}. {option}
                  </Text>
                </TouchableOpacity>
              ))}
              {feedback && (
                <View style={styles.feedbackContainer}>
                  <Text style={styles.feedbackText}>{feedback.message}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFAFA", // Snow White primary color
  },
  howToPlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFAFA",
    padding: 20,
    borderRadius: 15,
  },
  howToPlayText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
    textAlign: "center",
  },
  howToPlayInstructions: {
    fontSize: 16,
    marginBottom: 30,
    color: "#555555",
    lineHeight: 24,
  },
  skipButton: {
    backgroundColor: "#8F7BE8",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#8F7BE8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  skipButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFAFA",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#8F7BE8", // Periwinkle Violet secondary color
  },
  points: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
  questionContainer: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#8F7BE8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(143, 123, 232, 0.2)",
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#8F7BE8", // Periwinkle Violet for category
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333333",
    lineHeight: 24,
  },
  optionButton: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#F9F6FF", // Light periwinkle background
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(143, 123, 232, 0.3)",
  },
  optionText: {
    fontSize: 16,
    color: "#555555",
  },
  correctOption: {
    backgroundColor: "#D4F8D4", // Light green
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  incorrectOption: {
    backgroundColor: "#FFE5E5", // Light red
    borderColor: "#FF6B6B",
    borderWidth: 1,
  },
  showCorrectOption: {
    backgroundColor: "#D4F8D4", // Light green
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  feedbackContainer: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#F9F6FF",
    borderLeftWidth: 3,
    borderLeftColor: "#8F7BE8",
  },
  feedbackText: {
    color: "#333333",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default InvestmentScreen;
