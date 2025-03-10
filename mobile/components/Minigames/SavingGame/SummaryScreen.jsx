import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import baseURL from '../../../assets/common/baseurl';
import SavingGamePDF from './SavingGamePDF';

const { width, height } = Dimensions.get('window');
const scale = Math.min(width, height) / 375;
const moderateScale = (size) => size + (scale - 1) * 0.5 * size;
const screenWidth = width - moderateScale(40);

const SummaryScreen = ({ route, navigation }) => {
  const { finalBalance, weeklyBalances } = route.params;
  const [analysis, setAnalysis] = useState("");
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.get(`${baseURL}/minibudget_ai/get-minibudget-analysis/${userId}`);
        setAnalysis(response.data.analysis);
      } catch (error) {
        console.error("Error fetching analysis:", error);
      }
    };

    fetchAnalysis();
  }, []);

  const weeklyExpenses = weeklyBalances.map((balance, index) => {
    const previousBalance = index === 0 ? 5000 : weeklyBalances[index - 1];
    return Math.abs(previousBalance - balance);
  });

  const totalWeeklyExpenses = weeklyExpenses.reduce((acc, expense) => acc + expense, 0);
  const averageWeeklyExpenses = totalWeeklyExpenses / weeklyBalances.length;

  const handleGeneratePDF = async () => {
    setGeneratingPDF(true);
    try {
      await SavingGamePDF(finalBalance, weeklyBalances, analysis);
    } catch (error) {
      console.error("Error in PDF generation:", error);
      Alert.alert(
        "PDF Generation Failed", 
        "There was a problem creating your PDF. Please try again later."
      );
    } finally {
      setGeneratingPDF(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <FontAwesome5 name="file-invoice-dollar" size={moderateScale(24)} color="#333" />
          <Text style={styles.header}>Financial Summary</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <FontAwesome5 name="wallet" size={moderateScale(18)} color="#4CAF50" />
            <Text style={styles.cardHeader}>Final Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>₱{finalBalance.toLocaleString()}</Text>
          <View style={styles.balanceChange}>
            <Text style={{
              color: finalBalance >= 5000 ? '#4CAF50' : '#FF6B6B',
              fontSize: moderateScale(14)
            }}>
              {finalBalance >= 5000 ? '↑' : '↓'} ₱{Math.abs(finalBalance - 5000).toLocaleString()} 
              ({((finalBalance - 5000) / 5000 * 100).toFixed(1)}%)
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <FontAwesome5 name="chart-line" size={moderateScale(18)} color="#333" />
            <Text style={styles.cardHeader}>Weekly Balances</Text>
          </View>
          {weeklyBalances.map((balance, index) => (
            <View key={index} style={styles.weeklyRow}>
              <Text style={styles.weekLabel}>Week {index + 1}</Text>
              <Text style={styles.weeklyValue}>₱{balance.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <FontAwesome5 name="money-bill-wave" size={moderateScale(18)} color="#FF6B6B" />
            <Text style={styles.cardHeader}>Expenses</Text>
          </View>
          <View style={styles.expenseRow}>
            <Text style={styles.expenseLabel}>Total:</Text>
            <Text style={styles.expenseValue}>₱{totalWeeklyExpenses.toLocaleString()}</Text>
          </View>
          <View style={styles.expenseRow}>
            <Text style={styles.expenseLabel}>Average Weekly:</Text>
            <Text style={styles.expenseValue}>₱{averageWeeklyExpenses.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <FontAwesome5 name="chart-bar" size={moderateScale(18)} color="#333" />
            <Text style={styles.cardHeader}>Weekly Expenses</Text>
          </View>
          <BarChart
            data={{
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              datasets: [
                {
                  data: weeklyExpenses,
                },
              ],
            }}
            width={screenWidth - moderateScale(40)}
            height={220}
            yAxisLabel="₱"
            chartConfig={{
              backgroundColor: "#FFFFFF",
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#FF6B6B",
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {analysis && (
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <FontAwesome5 name="brain" size={moderateScale(18)} color="#333" />
              <Text style={styles.cardHeader}>FinanceQuest Analysis</Text>
            </View>
            <Text style={styles.analysisText}>{analysis}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate("Intro")}
          >
            <Icon name="replay" size={moderateScale(20)} color="#fff" />
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.downloadButton, generatingPDF && styles.disabledButton]} 
            onPress={handleGeneratePDF}
            disabled={generatingPDF}
          >
            <FontAwesome5 name="file-pdf" size={moderateScale(20)} color="#fff" />
            <Text style={styles.buttonText}>
              {generatingPDF ? "Generating..." : "Download PDF"}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomSpace}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    alignItems: "center",
    padding: moderateScale(20),
    paddingBottom: moderateScale(40),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
    width: '100%',
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: '#333333',
    marginLeft: moderateScale(10),
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(15),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: moderateScale(8),
  },
  cardHeader: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: moderateScale(8),
  },
  balanceAmount: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: moderateScale(5),
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  weekLabel: {
    fontSize: moderateScale(14),
    color: '#555555',
  },
  weeklyValue: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#333333',
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(5),
  },
  expenseLabel: {
    fontSize: moderateScale(14),
    color: '#555555',
  },
  expenseValue: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#FF6B6B',
  },
  analysisText: {
    fontSize: moderateScale(14),
    color: '#555555',
    lineHeight: moderateScale(20),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#8F7BE8",
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
    width: '80%',
    marginBottom: moderateScale(12),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  downloadButton: {
    backgroundColor: "#4CAF50",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  bottomSpace: {
    height: moderateScale(30),
  }
});

export default SummaryScreen;