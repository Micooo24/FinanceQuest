import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const AssessmentResults = ({ points, totalQuestions, resultMessage, aiAnalysis, onNext }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const correctAnswers = points;
  const incorrectAnswers = totalQuestions - points;
  const accuracyRate = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  const data = [
    {
      name: "Correct",
      population: correctAnswers,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Incorrect",
      population: incorrectAnswers,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const renderFirstPage = () => (
    <View style={styles.results}>
      <Text style={styles.resultMessage}>{resultMessage}</Text>
      <Text style={styles.finalScore}>
        Your final score: {points} out of {totalQuestions}
      </Text>
      <ScrollView style={styles.analysisContainer}>
        <Text style={styles.analysisTitle}>Category Performance Analysis</Text>
        {["Investment Basics", "Risk Management", "Market Analysis"].map((category) => {
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
        })}
      </ScrollView>
      <Button title="Next" onPress={() => setCurrentPage(2)} />
    </View>
  );

  const renderSecondPage = () => (
    <View style={styles.results}>
      <Text style={styles.resultMessage}>{resultMessage}</Text>
      <Text style={styles.finalScore}>
        Your final score: {points} out of {totalQuestions}
      </Text>
      <Text style={styles.accuracyRate}>Accuracy Rate: {accuracyRate}%</Text>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Correct Answers:</Text>
          <Text style={styles.summaryValue}>{correctAnswers}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Incorrect Answers:</Text>
          <Text style={styles.summaryValue}>{incorrectAnswers}</Text>
        </View>
      </View>
      <Button title="Next" onPress={onNext} />
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
  },
  resultMessage: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 18,
    marginBottom: 20,
  },
  accuracyRate: {
    fontSize: 18,
    marginBottom: 20,
  },
  analysisContainer: {
    marginTop: 20,
    width: "100%",
    maxHeight: 300, // Set a max height for the scrollable area
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 16,
  },
  summaryContainer: {
    marginTop: 20,
    width: "100%",
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AssessmentResults;