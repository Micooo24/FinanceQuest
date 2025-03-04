import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const GameFeatures = () => {
  const navigation = useNavigation();

  const features = [
    {
      title: "Real-Life Scenarios",
      icon: "account-balance",
      details: "Explore realistic financial situations and learn by making impactful decisions in a simulated environment.",
      color: "#7E57C2"
    },
    {
      title: "Budgeting Mastery",
      icon: "bar-chart",
      details: "Master the art of budgeting to balance expenses, plan savings, and optimize your financial life.",
      color: "#5C6BC0"
    },
    {
      title: "Savings Goals",
      icon: "savings",
      details: "Set achievable savings goals and learn strategies to make them a reality through smart planning.",
      color: "#26A69A"
    },
    {
      title: "Debt Management",
      icon: "trending-up",
      details: "Understand effective techniques to manage and reduce debt while maintaining financial stability.",
      color: "#FFA726"
    },
    {
      title: "Financial Tools",
      icon: "calculate",
      details: "Access advanced tools to track expenses, plan budgets, and calculate savings for better control over finances.",
      color: "#EF5350"
    },
    {
      title: "Learning Hub",
      icon: "school",
      details: "Expand your knowledge with a variety of resources, including articles, guides, and interactive quizzes.",
      color: "#66BB6A"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Features</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Explore Our Features</Text>
          <Text style={styles.introText}>
            Financial Quest offers a variety of interactive features designed to make learning about personal finance engaging and effective.
          </Text>
        </View>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={styles.featureCard}
            >
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <Icon name={feature.icon} size={36} color="white" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDetails}>{feature.details}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: '#472751',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  introContainer: {
    padding: 20,
    backgroundColor: '#472751',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
  },
  featuresGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    width: '100%',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#472751',
    marginBottom: 8,
  },
  featureDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cta: {
    backgroundColor: 'rgba(71, 39, 81, 0.05)',
    borderRadius: 15,
    padding: 24,
    margin: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#472751',
    marginBottom: 12,
  },
  ctaText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 2,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameFeatures;