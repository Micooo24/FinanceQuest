import React, { useState } from "react";
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
import week1Scenarios from './WeekScenarios/week1Scenarios';
import week2Scenarios from './WeekScenarios/week2Scenarios';
import week3Scenarios from './WeekScenarios/week3Scenarios';
import week4Scenarios from './WeekScenarios/week4Scenarios';
import JobSelection from './JobSelection';

const { width, height } = Dimensions.get('window');
// Calculate responsive sizes based on screen dimensions
const scale = Math.min(width, height) / 375; // Base scale on smaller dimension
const moderateScale = (size) => size + (scale - 1) * 0.5 * size;

const GameScreen = ({ navigation }) => {
  const [day, setDay] = useState(1);
  const [balance, setBalance] = useState(5000);
  const [stress, setStress] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    // Set initial balance based on job pay
    setBalance(job.pay);
  };

  const handleDecision = (cost, stressChange) => {
    let newBalance = balance - cost;
    let newStress = stress + stressChange;

    if (newBalance < 0) {
      Alert.alert("Game Over!", "You ran out of money before payday!");
      navigation.navigate("Summary", { finalBalance: 0, stress: newStress });
      return;
    }

    // Add weekly payment on day 7, 14, 21, and 28
    if (day === 7 || day === 14 || day === 21 || day === 28) {
      newBalance += selectedJob.pay - selectedJob.totalDeductions;
      Alert.alert("Payday!", `You received ₱${selectedJob.pay - selectedJob.totalDeductions} after deductions.`);
    }

    if (day >= 28) {
      navigation.navigate("Summary", { finalBalance: newBalance, stress: newStress });
      return;
    }

    setBalance(newBalance);
    setStress(newStress);
    setDay(day + 1);
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
          
          <View style={styles.stressContainer}>
            <Icon name="sentiment-dissatisfied" size={moderateScale(20)} color="#FF6B6B" />
            <Text style={styles.stressText}>Stress: {stress}</Text>
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
              onPress={() => handleDecision(option.cost, option.stressChange)}
            >
              <View style={styles.decisionContent}>
                <Text style={styles.decisionText}>{option.text}</Text>
                <View style={styles.decisionCost}>
                  <Text style={styles.costText}>₱{option.cost}</Text>
                  {option.stressChange !== 0 && (
                    <Text style={option.stressChange > 0 ? styles.stressIncrease : styles.stressDecrease}>
                      Stress {option.stressChange > 0 ? '+' : ''}{option.stressChange}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  stressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stressText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#FF6B6B',
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
  stressIncrease: {
    color: '#FF6B6B',
    fontSize: moderateScale(14),
  },
  stressDecrease: {
    color: '#4CAF50',
    fontSize: moderateScale(14),
  },
});

export default GameScreen;