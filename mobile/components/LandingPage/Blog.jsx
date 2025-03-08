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
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const blogPosts = [
  {
    title: "Mastering Budgeting",
    summary: "Learn the key strategies to manage your finances effectively.",
    date: "March 1, 2025",
    image: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388942/savings_efocff.jpg",
    link: "BudgetingBlog",
  },
  {
    title: "Investing for Beginners",
    summary: "A step-by-step guide to getting started with investments.",
    date: "March 1, 2025",
    image: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388941/InvestmentIconBlog_tv0w42.jpg",
    link: "InvestingBlog",
  },
  {
    title: "Avoiding Common Financial Mistakes",
    summary: "Discover the pitfalls that can derail your financial success.",
    date: "March 1, 2025",
    image: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388941/savingIconBlog_o3t4gq.jpg",
    link: "SavingBlog",
  },
];

const Blog = () => {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>Finance Quest Blog</Text>
        <View style={{ width: 50 }}/>
        
         {/* Spacer to balance layout */}
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Stay updated with the latest financial tips and insights.</Text>
        </View>

        <View style={styles.blogContainer}>
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              style={[
                styles.blogCard,
                { flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }
              ]}
            >
              <Image
                source={{ uri: post.image }}
                style={styles.blogImage}
              />
              <View style={styles.blogContent}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(post.link)}
                  style={styles.arrowButton}
                >
                  <Icon
                    name="arrow-upward"
                    size={24}
                    color="#8F7BE8"
                    style={{
                      transform: [{ rotate: index % 2 === 0 ? '45deg' : '-45deg' }]
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.blogTitle}>{post.title}</Text>
                <Text style={styles.blogSummary}>{post.summary}</Text>
                <Text style={styles.blogDate}>{post.date}</Text>
              </View>
            </Card>
          ))}
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
    height: 80, // Increased height
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 8, // Increased elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24, // Increased font size
    fontWeight: '900', // Extra bold
    color: '#FFFAFA',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  introContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(143, 123, 232, 0.05)', // Very light purple background
    margin: 16,
    borderRadius: 15,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8F7BE8',
    textAlign: 'center',
  },
  blogContainer: {
    padding: 16,
    alignItems: 'center',
  },
  blogCard: {
    width: '90%',
    backgroundColor: '#FFFAFA',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(143, 123, 232, 0.2)', // Light purple border
  },
  blogImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  blogContent: {
    flex: 1,
  },
  arrowButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginBottom: 8,
  },
  blogSummary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  blogDate: {
    fontSize: 12,
    color: '#8F7BE8',
  },
});

export default Blog;