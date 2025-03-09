import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../../assets/common/baseurl';

const { width, height } = Dimensions.get('window');
// Calculate responsive sizes based on screen dimensions
const scale = Math.min(width, height) / 375; // Base scale on smaller dimension
const moderateScale = (size) => size + (scale - 1) * 0.5 * size;
const screenWidth = width - moderateScale(40);

const SummaryScreen = ({ route, navigation }) => {
  const { finalBalance, weeklyBalances } = route.params;
  const [analysis, setAnalysis] = useState("");

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

  // Calculate weekly expenses
  const weeklyExpenses = weeklyBalances.map((balance, index) => {
    const previousBalance = index === 0 ? 5000 : weeklyBalances[index - 1];
    return Math.abs(previousBalance - balance); // Ensure positive values
  });

  // Calculate total weekly expenses
  const totalWeeklyExpenses = weeklyExpenses.reduce((acc, expense) => acc + expense, 0);

  // Calculate average weekly expenses
  const averageWeeklyExpenses = totalWeeklyExpenses / weeklyBalances.length;

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <FontAwesome5 name="chart-bar" size={moderateScale(28)} color="#9370DB" />
          <Text style={styles.header}>Financial Summary</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Final Balance</Text>
          <Text style={styles.balanceAmount}>₱{finalBalance.toLocaleString()}</Text>
        </View>

        <View style={styles.weeklyBalancesContainer}>
          <Text style={styles.weeklyBalancesTitle}>Weekly Balances</Text>
          {weeklyBalances.map((balance, index) => (
            <Text key={index} style={styles.weeklyBalanceText}>Week {index + 1}: ₱{balance.toLocaleString()}</Text>
          ))}
        </View>

        <View style={styles.totalExpensesContainer}>
          <Text style={styles.totalExpensesTitle}>Total Weekly Expenses</Text>
          <Text style={styles.totalExpensesAmount}>₱{totalWeeklyExpenses.toLocaleString()}</Text>
        </View>

        <View style={styles.averageExpensesContainer}>
          <Text style={styles.averageExpensesTitle}>Average Weekly Expenses</Text>
          <Text style={styles.averageExpensesAmount}>₱{averageWeeklyExpenses.toLocaleString()}</Text>
        </View>

        {analysis && (
          <View style={styles.analysisContainer}>
            <Text style={styles.analysisTitle}>Financial Quest Analysis</Text>
            <Text style={styles.analysisText}>{analysis}</Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("Intro")}
        >
          <Icon name="replay" size={moderateScale(20)} color="#fff" />
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
        
        {/* Extra space at bottom for better scrolling experience */}
        <View style={styles.bottomSpace}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    alignItems: "center",
    padding: moderateScale(20),
    paddingBottom: moderateScale(40),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(24),
    width: '100%',
  },
  header: {
    fontSize: moderateScale(28),
    fontWeight: "bold",
    color: '#F9F6FF',
    marginLeft: moderateScale(12),
  },
  balanceCard: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    marginBottom: moderateScale(24),
    elevation: 5,
  },
  balanceLabel: {
    fontSize: moderateScale(16),
    color: '#BDBDBD',
    marginBottom: moderateScale(8),
  },
  balanceAmount: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    color: '#00cac9',
    marginBottom: moderateScale(12),
  },
  weeklyBalancesContainer: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(24),
    elevation: 5,
    alignItems: 'center',
  },
  weeklyBalancesTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  weeklyBalanceText: {
    fontSize: moderateScale(16),
    color: '#BDBDBD',
    marginBottom: moderateScale(8),
  },
  totalExpensesContainer: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(24),
    elevation: 5,
    alignItems: 'center',
  },
  totalExpensesTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  totalExpensesAmount: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    color: '#FF5252',
  },
  averageExpensesContainer: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(24),
    elevation: 5,
    alignItems: 'center',
  },
  averageExpensesTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  averageExpensesAmount: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    color: '#FF5252',
  },
  analysisContainer: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(24),
    elevation: 5,
  },
  analysisTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  analysisText: {
    fontSize: moderateScale(16),
    color: '#BDBDBD',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#9370DB",
    padding: moderateScale(16),
    borderRadius: moderateScale(14),
    width: '80%',
    marginTop: moderateScale(12),
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginLeft: moderateScale(8),
  },
  bottomSpace: {
    height: moderateScale(30),
  }
});

export default SummaryScreen;