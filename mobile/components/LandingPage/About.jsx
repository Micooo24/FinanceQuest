import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const About = () => {
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
            <Icon name="arrow-back" size={28} color="#FFFAFA" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.appName}>Financial Quest</Text>
          <Text style={styles.tagline}>Your path to money smarts</Text>
        </View>

        <Card style={styles.section}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="eye" size={24} color="#8F7BE8" />
              <Text style={styles.sectionTitle}>Our Vision</Text>
            </View>
            <Text style={styles.sectionText}>
            We aim to implement financial education by making learning fun, interactive, and impactful through gamified experiences and real-world scenarios. We believe that financial literacy is essential for everyone, regardless of age or background, and should be accessible, engaging, and practical. By transforming complex financial concepts into interactive adventures.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="bullseye" size={24} color="#8F7BE8" />
              <Text style={styles.sectionTitle}>Our Mission</Text>
            </View>
            <Text style={styles.sectionText}>
            Our mission is to empower individuals with the knowledge and tools they need to make informed financial decisions and reach their goals. We are dedicated to bridging the financial literacy gap by providing an immersive and educational gaming platform that encourages strategic thinking, problem-solving, and informed decision-making.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="info-circle" size={24} color="#8F7BE8" />
              <Text style={styles.sectionTitle}>About The App</Text>
            </View>
            <Text style={styles.sectionText}>
              Financial Quest is a game where you learn money skills through fun challenges and stories. Make smart choices, solve problems, and level up your financial knowledge. With real-life examples from the Philippines, you'll learn about saving, debt, investing, and smart spending in a way that's easy to understand and remember.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="users" size={24} color="#8F7BE8" />
              <Text style={styles.sectionTitle}>Our Team</Text>
            </View>
            <Text style={styles.sectionText}>
            Our team is dedicated to providing a comprehensive and engaging learning experience for players.
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Financial Quest © 2025</Text>
          <Text style={styles.footerText}>Version 1.0.0</Text>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFAFA',
    textAlign: 'center',
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#8F7BE8',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFAFA',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#FFFAFA',
    borderWidth: 1,
    borderColor: 'rgba(143, 123, 232, 0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8F7BE8',
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#8F7BE8',
    marginBottom: 4,
  },
});

export default About;