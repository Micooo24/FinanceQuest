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

const InvestingBlog = () => {
  const navigation = useNavigation();

  const investmentTypes = [
    {
      title: "Stocks",
      icon: "trending-up",
      description: "Ownership in a company that may provide capital gains and dividends."
    },
    {
      title: "Bonds",
      icon: "account-balance",
      description: "Loans to companies or governments that typically pay fixed interest."
    },
    {
      title: "Mutual Funds",
      icon: "pie-chart",
      description: "Pools of money from many investors that buy a diverse mix of investments."
    },
    {
      title: "Real Estate",
      icon: "home",
      description: "Physical property that can generate rental income and appreciate in value."
    },
    {
      title: "ETFs",
      icon: "show-chart",
      description: "Baskets of securities that trade like individual stocks on an exchange."
    }
  ];

  const beginner_tips = [
    {
      title: "Start Small",
      content: "Begin with amounts you're comfortable with. Even small investments can grow significantly over time."
    },
    {
      title: "Diversify",
      content: "Don't put all your eggs in one basket. Spread investments across different assets and sectors."
    },
    {
      title: "Think Long-term",
      content: "Investing works best over long periods. The power of compound growth increases with time."
    },
    {
      title: "Research First",
      content: "Never invest in something you don't understand. Take time to learn about any investment before committing."
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
        <Text style={styles.headerTitle}>Investing for Beginners</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={{ uri: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388941/InvestmentIconBlog_tv0w42.jpg' }}
          style={styles.headerImage}
        />
        
        <View style={styles.content}>
          <View style={styles.metaInfo}>
            <Text style={styles.date}>February 8, 2025</Text>
            <Text style={styles.readTime}>7 min read</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Why Start Investing?</Text>
          <Text style={styles.paragraph}>
            Investing is one of the most effective ways to build wealth and achieve financial goals. 
            Unlike keeping money in a savings account where inflation can reduce its value over time, 
            investing gives your money the potential to grow and work for you.
          </Text>
          
          <Text style={styles.paragraph}>
            Whether you're saving for retirement, a home purchase, or education, investing can help 
            you reach your goals faster than saving alone. The earlier you start, the more time your 
            money has to grow through compounding returns.
          </Text>
          
          <Card style={styles.quoteCard}>
            <Card.Content>
              <Text style={styles.quote}>
                "The best time to plant a tree was 20 years ago. The second best time is now."
              </Text>
              <Text style={styles.quoteAuthor}>- Chinese Proverb</Text>
            </Card.Content>
          </Card>
          
          <Text style={styles.sectionTitle}>Understanding Risk vs. Reward</Text>
          <Text style={styles.paragraph}>
            All investments carry some level of risk, and generally, higher potential returns come with 
            higher risks. Understanding your risk tolerance—how much uncertainty you're willing to accept—is 
            key to successful investing.
          </Text>
          
          <View style={styles.riskContainer}>
            <View style={[styles.riskBar, {backgroundColor: 'rgba(143, 123, 232, 0.1)'}]}>
              <Text style={styles.riskText}>Low Risk, Low Return</Text>
              <Text style={styles.riskExample}>Cash, CDs, Treasury Bills</Text>
            </View>
            
            <View style={[styles.riskBar, {backgroundColor: 'rgba(143, 123, 232, 0.2)'}]}>
              <Text style={styles.riskText}>Medium Risk, Medium Return</Text>
              <Text style={styles.riskExample}>Bonds, Dividend Stocks, REITs</Text>
            </View>
            
            <View style={[styles.riskBar, {backgroundColor: 'rgba(143, 123, 232, 0.3)'}]}>
              <Text style={styles.riskText}>High Risk, High Return</Text>
              <Text style={styles.riskExample}>Growth Stocks, Crypto, Startups</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Common Investment Types</Text>
          
          {investmentTypes.map((type, index) => (
            <Card key={index} style={styles.typeCard}>
              <Card.Content style={styles.typeContent}>
                <View style={styles.typeIconContainer}>
                  <Icon name={type.icon} size={28} color="#8F7BE8" />
                </View>
                <View style={styles.typeTextContainer}>
                  <Text style={styles.typeTitle}>{type.title}</Text>
                  <Text style={styles.typeDescription}>{type.description}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
          
          <Text style={styles.sectionTitle}>Getting Started: Tips for Beginners</Text>
          <Text style={styles.paragraph}>
            Beginning your investment journey doesn't have to be complicated. Here are some 
            practical tips to help you get started:
          </Text>
          
          <View style={styles.tipsContainer}>
            {beginner_tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipContent}>{tip.content}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.sectionTitle}>Common Investment Strategies</Text>
          
          <View style={styles.strategyContainer}>
            <View style={styles.strategyItem}>
              <Text style={styles.strategyTitle}>Buy and Hold</Text>
              <Text style={styles.strategyDescription}>
                Purchase investments and hold them for long periods regardless of market fluctuations.
              </Text>
            </View>
            
            <View style={styles.strategyItem}>
              <Text style={styles.strategyTitle}>Dollar-Cost Averaging</Text>
              <Text style={styles.strategyDescription}>
                Invest a fixed amount regularly, regardless of market conditions, to average out the purchase price.
              </Text>
            </View>
            
            <View style={styles.strategyItem}>
              <Text style={styles.strategyTitle}>Value Investing</Text>
              <Text style={styles.strategyDescription}>
                Look for undervalued investments that have potential for growth but are currently priced below their intrinsic value.
              </Text>
            </View>
          </View>

          <Card style={styles.conclusionCard}>
            <Card.Content>
              <Text style={styles.conclusionTitle}>Your Investment Journey Awaits</Text>
              <Text style={styles.conclusionText}>
                Investing may seem intimidating at first, but taking that initial step can set you on 
                the path to financial growth and security. Start small, stay consistent, and continue 
                learning. Remember that investing is a marathon, not a sprint—patience and persistence 
                are your greatest assets.
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
  riskContainer: {
    marginVertical: 16,
  },
  riskBar: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  riskText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  riskExample: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  typeCard: {
    marginBottom: 12,
    elevation: 2,
    backgroundColor: '#FFFAFA',
  },
  typeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(143, 123, 232, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeTextContainer: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: '#666',
  },
  tipsContainer: {
    marginVertical: 16,
  },
  tipItem: {
    backgroundColor: '#FFFAFA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(143, 123, 232, 0.2)',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginBottom: 4,
  },
  tipContent: {
    fontSize: 14,
    color: '#666',
  },
  strategyContainer: {
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
  strategyDescription: {
    fontSize: 14,
    color: '#666',
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

export default InvestingBlog;