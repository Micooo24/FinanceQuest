import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import InvestingAssessmentPDF from "./InvestingAssessmentPDF";

const screenWidth = Dimensions.get("window").width;

const AssessmentResults = ({
  points,
  totalQuestions,
  resultMessage,
  aiAnalysis,
  navigation,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const correctAnswers = points;
  const incorrectAnswers = totalQuestions - points;
  const accuracyRate = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  const data = [
    {
      name: "Correct",
      population: correctAnswers,
      color: "#4CAF50", // Green that fits with theme
      legendFontColor: "#333333",
      legendFontSize: 15,
    },
    {
      name: "Incorrect",
      population: incorrectAnswers,
      color: "#FF6B6B", // Red that fits with theme
      legendFontColor: "#333333",
      legendFontSize: 15,
    },
  ];

  const handleGeneratePDF = async () => {
    setGeneratingPDF(true);
    try {
      const result = await InvestingAssessmentPDF(
        points,
        totalQuestions,
        resultMessage,
        aiAnalysis
      );
      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("PDF Generation Error:", error);
      Alert.alert(
        "PDF Generation Failed",
        "Unable to generate PDF. Please try again later."
      );
    } finally {
      setGeneratingPDF(false);
    }
  };

  const renderFirstPage = () => (
    <View style={styles.results}>
      <Text style={styles.resultMessage}>{resultMessage}</Text>
      <Text style={styles.finalScore}>
        Your final score: {points} out of {totalQuestions}
      </Text>
      <ScrollView style={styles.analysisContainer}>
        <Text style={styles.analysisTitle}>Category Performance Analysis</Text>
        {["Investment Basics", "Risk Management", "Market Analysis"].map(
          (category) => {
            const categoryAnalysis = aiAnalysis
              .split("\n\n")
              .find((section) =>
                section.toLowerCase().includes(category.toLowerCase())
              );

            return (
              <View key={category} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryText}>
                  {categoryAnalysis
                    ?.replace(`${category}:`, "")
                    .replace("AI Analysis:", "")
                    .trim() || "No analysis available"}
                </Text>
              </View>
            );
          }
        )}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => setCurrentPage(2)}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSecondPage = () => (
    <View style={styles.results}>
      <Text style={styles.resultMessage}>{resultMessage}</Text>
      <Text style={styles.finalScore}>
        Your final score: {points} out of {totalQuestions}
      </Text>
      <Text style={styles.accuracyRate}>Accuracy Rate: {accuracyRate}%</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={screenWidth - 60}
          height={220}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#F9F6FF",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(143, 123, 232, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Correct Answers:</Text>
          <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
            {correctAnswers}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Incorrect Answers:</Text>
          <Text style={[styles.summaryValue, { color: "#FF6B6B" }]}>
            {incorrectAnswers}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => setCurrentPage(1)}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.pdfButton,
            generatingPDF && styles.disabledButton,
          ]}
          onPress={handleGeneratePDF}
          disabled={generatingPDF}
        >
          <Text style={[styles.buttonText, styles.pdfButtonText]}>
            {generatingPDF ? "Generating..." : "Download PDF"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  return currentPage === 1 ? renderFirstPage() : renderSecondPage();
};

const styles = StyleSheet.create({
  results: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFAFA",
  },
  resultMessage: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
    textAlign: "center",
  },
  finalScore: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555555",
  },
  accuracyRate: {
    fontSize: 18,
    marginBottom: 20,
    color: "#8F7BE8",
    fontWeight: "bold",
  },
  analysisContainer: {
    marginTop: 20,
    width: "100%",
    maxHeight: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#8F7BE8",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(143, 123, 232, 0.2)",
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333333",
    textAlign: "center",
  },
  categoryContainer: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(143, 123, 232, 0.2)",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#8F7BE8",
  },
  categoryText: {
    fontSize: 16,
    color: "#555555",
    lineHeight: 22,
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#8F7BE8",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(143, 123, 232, 0.2)",
  },
  summaryContainer: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#8F7BE8",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(143, 123, 232, 0.2)",
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333333",
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(143, 123, 232, 0.1)",
  },
  summaryLabel: {
    fontSize: 16,
    color: "#555555",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#8F7BE8",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#8F7BE8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    minWidth: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(143, 123, 232, 0.7)",
  },
  backButtonText: {
    color: "#8F7BE8",
    fontWeight: "bold",
    fontSize: 16,
  },
  pdfButton: {
    backgroundColor: "#4CAF50",
    flex: 1,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
    opacity: 0.7,
  },
  pdfButtonText: {
    color: "#FFFFFF",
  },
  homeButton: {
    backgroundColor: "#8F7BE8",
    width: "100%",
    marginTop: 10,
  },
});

export default AssessmentResults;
