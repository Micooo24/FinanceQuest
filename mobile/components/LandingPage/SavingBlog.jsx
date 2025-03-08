import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SavingBlog = () => {
  const navigation = useNavigation();

  const commonMistakes = [
    {
      title: "Not Having an Emergency Fund",
      icon: "warning",
      description: "Without savings for emergencies, unexpected expenses can lead to debt and financial stress."
    },
    {
      title: "Living Beyond Your Means",
      icon: "credit-card",
      description: "Spending more than you earn is a guaranteed path to financial trouble and mounting debt."
    },
    {
      title: "Ignoring Retirement Planning",
      icon: "elderly",
      description: "Waiting too long to save for retirement significantly reduces the power of compound interest."
    },
    {
      title: "Paying Only Minimum on Debts",
      icon: "money-off",
      description: "Making minimum payments extends debt repayment time and costs much more in interest."
    },
    {
      title: "No Financial Goals",
      icon: "flag",
      description: "Without clear goals, it's easy to waste money on things that don't align with your priorities."
    }
  ];

  const savingStrategies = [
    {
      title: "Automate Your Savings",
      content: "Set up automatic transfers to your savings account on payday. What you don't see, you won't spend."
    },
    {
      title: "Follow the 24-Hour Rule",
      content: "Wait 24 hours before making non-essential purchases to avoid impulse buying."
    },
    {
      title: "Use the 50/30/20 Budget",
      content: "Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment."
    },
    {
      title: "Pay Yourself First",
      content: "Treat savings as a non-negotiable expense and prioritize it before discretionary spending."
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8F7BE8" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButtonContainer} 
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButton}>
            <Icon name="arrow-back" size={32} color="#FFFAFA" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avoiding Financial Mistakes</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={{ uri: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388941/savingIconBlog_o3t4gq.jpg' }}
          style={styles.headerImage}
        />
        
        <View style={styles.content}>
          <View style={styles.metaInfo}>
            <Text style={styles.date}>February 9, 2025</Text>
            <Text style={styles.readTime}>6 min read</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Financial Success Through Smart Choices</Text>
          <Text style={styles.paragraph}>
            Financial success isn't just about making more money—it's about making smart decisions 
            with the money you have. Understanding and avoiding common financial pitfalls can set 
            you on the path to financial freedom and security.
          </Text>
          
          <Text style={styles.sectionTitle}>5 Common Financial Mistakes to Avoid</Text>
          
          {commonMistakes.map((mistake, index) => (
            <Card key={index} style={styles.mistakeCard}>
              <Card.Content style={styles.mistakeContent}>
                <View style={styles.mistakeIconContainer}>
                  <Icon name={mistake.icon} size={28} color="#8F7BE8" />
                </View>
                <View style={styles.mistakeTextContainer}>
                  <Text style={styles.mistakeTitle}>{mistake.title}</Text>
                  <Text style={styles.mistakeDescription}>{mistake.description}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
          
          <Card style={styles.quoteCard}>
            <Card.Content>
              <Text style={styles.quote}>
                "Do not save what is left after spending, but spend what is left after saving."
              </Text>
              <Text style={styles.quoteAuthor}>- Warren Buffett</Text>
            </Card.Content>
          </Card>
          
          <Text style={styles.sectionTitle}>Effective Saving Strategies</Text>
          <Text style={styles.paragraph}>
            Saving money doesn't always mean sacrificing your quality of life. 
            It's about making intentional choices and developing healthy financial habits.
          </Text>
          
          <View style={styles.strategiesContainer}>
            {savingStrategies.map((strategy, index) => (
              <View key={index} style={styles.strategyItem}>
                <Text style={styles.strategyTitle}>{strategy.title}</Text>
                <Text style={styles.strategyContent}>{strategy.content}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.sectionTitle}>The Power of Small Changes</Text>
          <Text style={styles.paragraph}>
            Even small changes in your financial habits can lead to significant improvements over time. 
            Consider these simple adjustments:
          </Text>
          
          <View style={styles.tipsContainer}>
            <View style={styles.tipRow}>
              <Icon name="coffee" size={24} color="#8F7BE8" />
              <Text style={styles.tipText}>Make coffee at home instead of buying it daily</Text>
            </View>
            
            <View style={styles.tipRow}>
              <Icon name="restaurant" size={24} color="#8F7BE8" />
              <Text style={styles.tipText}>Cook more meals at home and limit eating out</Text>
            </View>
            
            <View style={styles.tipRow}>
              <Icon name="shopping-cart" size={24} color="#8F7BE8" />
              <Text style={styles.tipText}>Make a shopping list and stick to it</Text>
            </View>
            
            <View style={styles.tipRow}>
              <Icon name="subscriptions" size={24} color="#8F7BE8" />
              <Text style={styles.tipText}>Review and cancel unused subscriptions</Text>
            </View>
            
            <View style={styles.tipRow}>
              <Icon name="lightbulb" size={24} color="#8F7BE8" />
              <Text style={styles.tipText}>Use energy-efficient appliances and habits</Text>
            </View>
          </View>

          <Card style={styles.conclusionCard}>
            <Card.Content>
              <Text style={styles.conclusionTitle}>Your Financial Future Starts Today</Text>
              <Text style={styles.conclusionText}>
                Avoiding financial mistakes and developing good saving habits aren't about depriving yourself—they're 
                about taking control of your money so it works for your goals and dreams. Start with one small change 
                today, and build from there. Your future self will thank you.
              </Text>
            </Card.Content>
          </Card>
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
    paddingHorizontal: 16,
    elevation: 4,
  },
  backButtonContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  readTime: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  mistakeCard: {
    marginBottom: 12,
    elevation: 2,
    backgroundColor: '#FFFAFA',
  },
  mistakeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mistakeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(143, 123, 232, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mistakeTextContainer: {
    flex: 1,
  },
  mistakeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginBottom: 4,
  },
  mistakeDescription: {
    fontSize: 14,
    color: '#666',
  },
  quoteCard: {
    backgroundColor: 'rgba(143, 123, 232, 0.1)',
    marginVertical: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#8F7BE8',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#8F7BE8',
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    textAlign: 'right',
    color: '#666',
  },
  strategiesContainer: {
    marginVertical: 16,
  },
  strategyItem: {
    backgroundColor: '#FFFAFA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(143, 123, 232, 0.2)',
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginBottom: 4,
  },
  strategyContent: {
    fontSize: 14,
    color: '#666',
  },
  tipsContainer: {
    marginVertical: 16,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tipText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 16,
    flex: 1,
  },
  conclusionCard: {
    marginTop: 24,
    marginBottom: 40,
    backgroundColor: '#8F7BE8',
  },
  conclusionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFAFA',
    marginBottom: 8,
  },
  conclusionText: {
    fontSize: 15,
    color: '#FFFAFA',
    lineHeight: 22,
  }
});

export default SavingBlog;