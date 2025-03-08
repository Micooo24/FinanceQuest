import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
// Aspect ratio adjustment for 2400x1080 phones (typically 20:9 ratio)
const scale = Math.min(width / 1080, height / 2400);

const GameFeatures = () => {
  const navigation = useNavigation();

  const features = [
    {
      title: "Real-Life Scenarios",
      icon: "account-balance",
      details: "Explore realistic financial situations and learn by making impactful decisions in a simulated environment.",
      color: "#8F7BE8"
    },
    {
      title: "Budgeting Mastery",
      icon: "bar-chart",
      details: "Master the art of budgeting to balance expenses, plan savings, and optimize your financial life.",
      color: "#A597EC"
    },
    {
      title: "Savings Goals",
      icon: "savings",
      details: "Set achievable savings goals and learn strategies to make them a reality through smart planning.",
      color: "#BB9DF0"
    },
    {
      title: "Debt Management",
      icon: "trending-up",
      details: "Understand effective techniques to manage and reduce debt while maintaining financial stability.",
      color: "#C9ACF4"
    },
    {
      title: "Financial Tools",
      icon: "calculate",
      details: "Access advanced tools to track expenses, plan budgets, and calculate savings for better control over finances.",
      color: "#D2BDF6"
    },
    {
      title: "Learning Hub",
      icon: "school",
      details: "Expand your knowledge with a variety of resources, including articles, guides, and interactive quizzes.",
      color: "#E0CEF9"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8F7BE8" barStyle="light-content" />
      
      {/* More visible header with better positioning */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButtonContainer} 
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="#FFFAFA" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Features</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
      >
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={styles.featureCard}
            >
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <Icon name={feature.icon} size={36} color="#FFFAFA" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDetails}>{feature.details}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Ready to Start Learning?</Text>
          <Text style={styles.ctaText}>
            Dive into our interactive games and start your journey to financial literacy today.
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: '#8F7BE8',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 4,
  },
  backButtonContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFAFA',
    textAlign: 'center',
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  featuresGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  featureCard: {
    backgroundColor: '#FFFAFA',
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
    borderWidth: 1,
    borderColor: 'rgba(143, 123, 232, 0.2)',
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
    color: '#8F7BE8',
    marginBottom: 8,
  },
  featureDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cta: {
    backgroundColor: 'rgba(143, 123, 232, 0.1)',
    borderRadius: 15,
    padding: 24,
    margin: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8F7BE8',
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
    backgroundColor: '#8F7BE8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 2,
  },
  ctaButtonText: {
    color: '#FFFAFA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameFeatures;