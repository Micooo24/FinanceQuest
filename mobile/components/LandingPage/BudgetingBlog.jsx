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

const BudgetingBlog = () => {
  const navigation = useNavigation();

  const budgetingTips = [
    {
      title: "Track Your Spending",
      icon: "receipt-long",
      description: "Record all purchases and expenses. You can't manage what you don't measure."
    },
    {
      title: "Use the 50/30/20 Rule",
      icon: "pie-chart",
      description: "Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment."
    },
    {
      title: "Plan for Irregular Expenses",
      icon: "event",
      description: "Set aside money monthly for expenses that don't occur every month like car repairs or holidays."
    },
    {
      title: "Avoid Impulse Purchases",
      icon: "shopping-bag",
      description: "Wait 24 hours before making unplanned purchases to decide if you really need them."
    },
    {
      title: "Use Cash Envelopes",
      icon: "account-balance-wallet",
      description: "Withdraw cash for different spending categories to help stick to your budget limits."
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
        <View style={{ flex: 1 }} />
        <View style={{ width: 50 }} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={{ uri: 'https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388942/savings_efocff.jpg' }}
          style={styles.headerImage}
        />
        
        <View style={styles.content}>
          <View style={styles.metaInfo}>
            <Text style={styles.date}>February 7, 2025</Text>
            <Text style={styles.readTime}>5 min read</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Why Budgeting Matters</Text>
          <Text style={styles.paragraph}>
            Budgeting is the foundation of financial health. It helps you understand where your money goes, 
            ensures you live within your means, and allows you to plan for future goals. Without a budget, 
            you might find yourself wondering where all your money went at the end of each month.
          </Text>
          
          <Text style={styles.sectionTitle}>Getting Started with Budgeting</Text>
          <Text style={styles.paragraph}>
            Creating your first budget might seem overwhelming, but it doesn't have to be complicated. 
            Start by tracking your income and expenses for a month to get a clear picture of your financial habits. 
            Then, categorize your spending and set reasonable limits for each category.
          </Text>

          <Card style={styles.quoteCard}>
            <Card.Content>
              <Text style={styles.quote}>
                "A budget is telling your money where to go instead of wondering where it went."
              </Text>
              <Text style={styles.quoteAuthor}>- Dave Ramsey</Text>
            </Card.Content>
          </Card>

          <Text style={styles.sectionTitle}>Top 5 Budgeting Tips</Text>
          
          {budgetingTips.map((tip, index) => (
            <Card key={index} style={styles.tipCard}>
              <Card.Content style={styles.tipContent}>
                <View style={styles.tipIconContainer}>
                  <Icon name={tip.icon} size={28} color="#8F7BE8" />
                </View>
                <View style={styles.tipTextContainer}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
          
          <Text style={styles.sectionTitle}>Budgeting Methods</Text>
          <Text style={styles.paragraph}>
            There are many budgeting approaches to choose from:
          </Text>
          
          <View style={styles.methodsContainer}>
            <View style={styles.methodItem}>
              <Text style={styles.methodTitle}>Zero-Based Budget</Text>
              <Text style={styles.methodDescription}>
                Assign every peso a job so your income minus expenses equals zero.
              </Text>
            </View>
            
            <View style={styles.methodItem}>
              <Text style={styles.methodTitle}>Envelope System</Text>
              <Text style={styles.methodDescription}>
                Divide cash into envelopes for different spending categories.
              </Text>
            </View>
            
            <View style={styles.methodItem}>
              <Text style={styles.methodTitle}>50/30/20 Budget</Text>
              <Text style={styles.methodDescription}>
                Split income between needs (50%), wants (30%), and savings/debt (20%).
              </Text>
            </View>
            
            <View style={styles.methodItem}>
              <Text style={styles.methodTitle}>Pay Yourself First</Text>
              <Text style={styles.methodDescription}>
                Set aside savings before spending on anything else.
              </Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Common Budgeting Mistakes to Avoid</Text>
          <Text style={styles.paragraph}>
            • Setting unrealistic spending limits that you can't maintain long-term
          </Text>
          <Text style={styles.paragraph}>
            • Forgetting to budget for occasional expenses like car maintenance
          </Text>
          <Text style={styles.paragraph}>
            • Not updating your budget as your income or expenses change
          </Text>
          <Text style={styles.paragraph}>
            • Failing to track small expenses that add up over time
          </Text>
          <Text style={styles.paragraph}>
            • Not having an emergency fund for unexpected expenses
          </Text>

          <Card style={styles.conclusionCard}>
            <Card.Content>
              <Text style={styles.conclusionTitle}>Start Your Budgeting Journey Today</Text>
              <Text style={styles.conclusionText}>
                Remember, budgeting is not about restricting your spending—it's about making intentional choices 
                with your money. The perfect budget is one that you can stick to consistently and that helps you 
                achieve your financial goals. Start small, be patient with yourself, and adjust as needed.
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
  tipCard: {
    marginBottom: 12,
    elevation: 2,
    backgroundColor: '#FFFAFA',
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(143, 123, 232, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
  },
  methodsContainer: {
    marginVertical: 16,
  },
  methodItem: {
    backgroundColor: '#FFFAFA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginBottom: 4,
  },
  methodDescription: {
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
  },
});

export default BudgetingBlog;