import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  Dimensions,
  StatusBar
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import week1Scenarios from './WeekScenarios/week1Scenarios';
import week2Scenarios from './WeekScenarios/week2Scenarios';
import week3Scenarios from './WeekScenarios/week3Scenarios';
import week4Scenarios from './WeekScenarios/week4Scenarios';
import JobSelection from './JobSelection';
import baseURL from '../../../assets/common/baseurl';

const { width, height } = Dimensions.get('window');
// Calculate responsive sizes based on screen dimensions
const scale = Math.min(width, height) / 375; // Base scale on smaller dimension
const moderateScale = (size) => size + (scale - 1) * 0.5 * size;

const GameScreen = ({ navigation }) => {
  const [day, setDay] = useState(1);
  const [balance, setBalance] = useState(5000);
  const [selectedJob, setSelectedJob] = useState(null);
  const [weeklyBalances, setWeeklyBalances] = useState([]);
  const [result, setResult] = useState("");

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    // Keep initial balance at 5000 regardless of job selected
    setBalance(5000);
  };

  const handleDecision = async (cost, result) => {
    let newBalance = balance + cost; // Adjusted to add cost (negative values will subtract)

    if (newBalance < 0) {
      Alert.alert("Game Over!", "You ran out of money before payday!");
      await saveMinibudget(0, weeklyBalances);
      navigation.navigate("Intro");
      return;
    }

    // Add weekly payment on day 7, 14, 21, and 28
    if (day === 7 || day === 14 || day === 21 || day === 28) {
      newBalance += selectedJob.pay - selectedJob.totalDeductions;
      Alert.alert("Payday!", `You received ₱${selectedJob.pay - selectedJob.totalDeductions} after deductions.`);
      setWeeklyBalances([...weeklyBalances, newBalance]);
    }

    if (day >= 28) {
      await saveMinibudget(newBalance, [...weeklyBalances, newBalance]);
      navigation.navigate("Summary", { finalBalance: newBalance, weeklyBalances: [...weeklyBalances, newBalance] });
      return;
    }

    setBalance(newBalance);
    setResult(result);
    setDay(day + 1);
  };

  const saveMinibudget = async (finalBalance, weeklyBalances) => {
    const userId = await AsyncStorage.getItem("userId");
    const [firstweek, secondweek, thirdweek, fourthweek] = weeklyBalances;

    // Calculate weekly expenses
    const weeklyExpenses = [
      Math.abs(5000 - firstweek),
      Math.abs(firstweek - secondweek),
      Math.abs(secondweek - thirdweek),
      Math.abs(thirdweek - fourthweek)
    ];

    // Calculate average weekly expenses
    const averageWeeklyExpenses = weeklyExpenses.reduce((acc, expense) => acc + expense, 0) / weeklyExpenses.length;

    try {
      await axios.post(`${baseURL}/minibudget/create-minibudget`, {
        user_id: userId,
        balance: finalBalance,
        firstweek: firstweek || 0,
        secondweek: secondweek || 0,
        thirdweek: thirdweek || 0,
        fourthweek: fourthweek || 0,
        average: averageWeeklyExpenses || 0
      });

      // Call analyze-minibudget endpoint
      await axios.post(`${baseURL}/minibudget_ai/analyze-minibudget/${userId}`);
    } catch (error) {
      console.error("Error saving minibudget or analyzing minibudget:", error);
    }
  };

  let currentScenario;
  if (day <= 7) {
    currentScenario = week1Scenarios[day % week1Scenarios.length];
  } else if (day <= 14) {
    currentScenario = week2Scenarios[day % week2Scenarios.length];
  } else if (day <= 21) {
    currentScenario = week3Scenarios[day % week3Scenarios.length];
  } else {
    currentScenario = week4Scenarios[day % week4Scenarios.length];
  }

  if (!selectedJob) {
    return <JobSelection onSelectJob={handleSelectJob} />;
  }

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <View style={styles.statsContainer}>
          <View style={styles.dayContainer}>
            <FontAwesome5 name="calendar-day" size={moderateScale(20)} color="#9370DB" />
            <Text style={styles.dayText}>Day {day} of 28</Text>
          </View>
          
          <View style={styles.balanceContainer}>
            <FontAwesome5 name="wallet" size={moderateScale(20)} color="#00cac9" />
            <Text style={styles.balanceText}>₱{balance.toLocaleString()}</Text>
          </View>
        </View>
        
        <View style={styles.jobInfoContainer}>
          <Text style={styles.jobTitle}>{selectedJob.title}</Text>
          <Text style={styles.jobPay}>Weekly Pay: ₱{selectedJob.pay - selectedJob.totalDeductions} (after deductions)</Text>
        </View>

        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>Daily Situation</Text>
          <Text style={styles.questionText}>{currentScenario.question}</Text>

          {currentScenario.options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.decisionButton} 
              onPress={() => handleDecision(option.cost, option.result)}
            >
              <View style={styles.decisionContent}>
                <Text style={styles.decisionText}>{option.text}</Text>
                <View style={styles.decisionCost}>
                  <Text style={styles.costText}>₱{option.cost}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: moderateScale(20),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
    padding: moderateScale(15),
    backgroundColor: '#1E1E1E',
    borderRadius: moderateScale(15),
    elevation: 5,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginLeft: moderateScale(8),
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#00cac9',
    marginLeft: moderateScale(8),
  },
  jobInfoContainer: {
    backgroundColor: '#2D2D2D',
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    marginBottom: moderateScale(20),
    borderLeftWidth: 3,
    borderLeftColor: '#9370DB',
  },
  jobTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: moderateScale(5),
  },
  jobPay: {
    fontSize: moderateScale(14),
    color: '#BDBDBD',
  },
  scenarioCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  scenarioTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: moderateScale(12),
    textAlign: 'center',
  },
  questionText: {
    fontSize: moderateScale(18),
    color: '#BDBDBD',
    marginBottom: moderateScale(25),
    lineHeight: moderateScale(26),
  },
  decisionButton: {
    backgroundColor: '#1E1E1E',
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(12),
    borderWidth: 1,
    borderColor: 'rgba(147, 112, 219, 0.3)',
  },
  decisionContent: {
    flexDirection: 'column',
  },
  decisionText: {
    color: '#F9F6FF',
    fontSize: moderateScale(16),
    marginBottom: moderateScale(10),
  },
  decisionCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  costText: {
    color: '#00cac9',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#2D2D2D',
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
    marginTop: moderateScale(20),
  },
  resultText: {
    fontSize: moderateScale(18),
    color: '#F9F6FF',
    textAlign: 'center',
  },
});

export default GameScreen;