import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');
// Calculate responsive sizes based on screen dimensions
const scale = Math.min(width, height) / 375; // Base scale on smaller dimension
const moderateScale = (size) => size + (scale - 1) * 0.5 * size;
const screenWidth = width - moderateScale(40);

const SummaryScreen = ({ route, navigation }) => {
  const { finalBalance, weeklyBalances } = route.params;

  // Calculate weekly expenses
  const weeklyExpenses = weeklyBalances.map((balance, index) => {
    const previousBalance = index === 0 ? 5000 : weeklyBalances[index - 1];
    return previousBalance - balance;
  });

  // Calculate total weekly expenses
  const totalWeeklyExpenses = weeklyExpenses.reduce((acc, expense) => acc + expense, 0);

  // Calculate average weekly expenses
  const averageWeeklyExpenses = totalWeeklyExpenses / weeklyExpenses.length;

  // Define analysis based on balance
  let conclusion = "";
  let recommendation = "";
  let icon = "sentiment-satisfied";
  let iconColor = "#4CAF50";

  if (finalBalance >= 5000) {
    conclusion = "Great Job! You managed your finances well and saved money.";
    recommendation = "Consider investing your extra savings or setting up an emergency fund.";
    icon = "sentiment-very-satisfied";
    iconColor = "#4CAF50";
  } else if (finalBalance > 0) {
    conclusion = "You survived until payday, but there's room for improvement.";
    recommendation = "Try to reduce unnecessary expenses and plan better for unexpected costs.";
    icon = "sentiment-neutral";
    iconColor = "#FFC107";
  } else {
    conclusion = "You ran out of money before payday!";
    recommendation = "Track your spending more carefully and prioritize essentials.";
    icon = "sentiment-very-dissatisfied";
    iconColor = "#FF5252";
  }

  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: weeklyBalances,
      },
    ],
  };

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

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Your Financial Journey</Text>
          <BarChart
            data={barData}
            width={screenWidth}
            height={moderateScale(220)}
            yAxisLabel="₱"
            chartConfig={{
              backgroundColor: '#2D2D2D',
              backgroundGradientFrom: '#2D2D2D',
              backgroundGradientTo: '#2D2D2D',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(147, 112, 219, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: moderateScale(16),
              },
              barPercentage: 0.7,
              propsForLabels: {
                fontSize: moderateScale(12),
              },
            }}
            style={styles.chart}
            showValuesOnTopOfBars={true}
            withInnerLines={false}
          />
        </View>

        <View style={styles.analysisContainer}>
          <View style={styles.conclusionHeader}>
            <Icon name={icon} size={moderateScale(28)} color={iconColor} />
            <Text style={[styles.conclusion, {color: iconColor}]}>{conclusion}</Text>
          </View>
          <Text style={styles.recommendation}>💡 {recommendation}</Text>
        </View>

        <View style={styles.weeklySummaryContainer}>
          <Text style={styles.weeklySummaryTitle}>Weekly Summary</Text>
          {weeklyBalances.map((balance, index) => (
            <View key={index} style={styles.weeklySummaryItem}>
              <Text style={styles.weeklySummaryText}>Week {index + 1} Balance: ₱{balance.toLocaleString()}</Text>
              <Text style={styles.weeklySummaryText}>Weekly Expenses: ₱{weeklyExpenses[index].toLocaleString()}</Text>
            </View>
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
  chartContainer: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(24),
    elevation: 5,
  },
  chartTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  chart: {
    marginVertical: moderateScale(8),
    borderRadius: moderateScale(16),
  },
  analysisContainer: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(24),
    elevation: 5,
  },
  conclusionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  conclusion: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginLeft: moderateScale(10),
    flex: 1,
  },
  recommendation: {
    fontSize: moderateScale(16),
    color: '#BDBDBD',
    lineHeight: moderateScale(24),
  },
  weeklySummaryContainer: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(24),
    elevation: 5,
  },
  weeklySummaryTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  weeklySummaryItem: {
    marginBottom: moderateScale(12),
  },
  weeklySummaryText: {
    fontSize: moderateScale(16),
    color: '#BDBDBD',
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