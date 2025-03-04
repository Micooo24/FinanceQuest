import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions
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
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finance Quest Blog</Text>
        <View style={{ width: 24 }} />
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
                    color="#8c2fc7"
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
    backgroundColor: 'linear-gradient(135deg, #5e3967, #351742)',
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
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  blogContainer: {
    padding: 16,
    alignItems: 'center',
  },
  blogCard: {
    width: '90%',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
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
    color: '#331540',
    marginBottom: 8,
  },
  blogSummary: {
    fontSize: 14,
    color: '#451d6b',
    marginBottom: 8,
  },
  blogDate: {
    fontSize: 12,
    color: '#8c2fc7',
  },
});

export default Blog;