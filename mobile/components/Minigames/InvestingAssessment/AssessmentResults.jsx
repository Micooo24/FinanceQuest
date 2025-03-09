import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AssessmentResults = ({ points, totalQuestions, resultMessage, aiAnalysis }) => {
  return (
    <View style={styles.results}>
      <Text style={styles.resultMessage}>{resultMessage}</Text>
      <Text style={styles.finalScore}>
        Your final score: {points} out of {totalQuestions}
      </Text>
      {aiAnalysis && (
        <View style={styles.analysisContainer}>
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
        </View>
      )}
    </View>
  );
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
  analysisContainer: {
    marginTop: 20,
    width: "100%",
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
});

export default AssessmentResults;