import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../../assets/common/baseurl';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('User');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from AsyncStorage
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const token = await AsyncStorage.getItem('authToken');
        
        if (email && token) {
          const response = await axios.get(`${baseURL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          // Set user data
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('email');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9500" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Financial Quest</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Banner */}
        <View style={styles.welcomeBanner}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.usernameText}>{username}!</Text>
            <Text style={styles.welcomeSubtext}>
              Continue your financial journey today.
            </Text>
          </View>
        </View>

        {/* Main Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Main Menu</Text>

          {/* Game Features Menu */}
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('GameFeatures')}
          >
            <View style={[styles.menuIconContainer, styles.gameIconContainer]}>
              <View style={styles.iconBackground}>
                <FontAwesome5 name="gamepad" size={32} color="white" />
              </View>
              <View style={styles.miniIcon}>
                <FontAwesome5 name="trophy" size={14} color="#FFD700" />
              </View>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Game Features</Text>
              <Text style={styles.menuDescription}>
                Explore quizzes, challenges, and earn rewards
              </Text>
            </View>
            <Icon name="chevron-right" size={30} color="#472751" />
          </TouchableOpacity>
          
          {/* Blogs Menu */}
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('Blog')}
          >
            <View style={[styles.menuIconContainer, styles.blogsIconContainer]}>
              <View style={styles.iconBackground}>
                <FontAwesome5 name="book-open" size={30} color="white" />
              </View>
              <View style={styles.miniIcon}>
                <FontAwesome5 name="lightbulb" size={14} color="#FFC107" />
              </View>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Financial Blogs</Text>
              <Text style={styles.menuDescription}>
                Read articles on personal finance and investing
              </Text>
            </View>
            <Icon name="chevron-right" size={30} color="#472751" />
          </TouchableOpacity>
          
          {/* About Menu */}
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('About')}
          >
            <View style={[styles.menuIconContainer, styles.aboutIconContainer]}>
              <View style={styles.iconBackground}>
                <FontAwesome5 name="info-circle" size={30} color="white" />
              </View>
              <View style={styles.miniIcon}>
                <FontAwesome5 name="question" size={14} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>About</Text>
              <Text style={styles.menuDescription}>
                Learn about Financial Quest and our mission
              </Text>
            </View>
            <Icon name="chevron-right" size={30} color="#472751" />
          </TouchableOpacity>
        </View>



        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Financial Tip of the Day</Text>
          <Card style={styles.tipCard}>
            <Card.Content>
              <Text style={styles.tipTitle}>Save Early, Save Often</Text>
              <Text style={styles.tipDescription}>
                The earlier you start saving, the more time your money has to grow. Even small amounts can add up over time!
              </Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Financial Quest © 2025</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#472751',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  header: {
    backgroundColor: '#472751',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30, // Added padding to ensure visibility
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
  },
  container: {
    flex: 1,
  },
  welcomeBanner: {
    backgroundColor: '#472751',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeContent: {
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  usernameText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  menuSection: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#472751',
    marginBottom: 16,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  menuIconContainer: {
    width: 65,
    height: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  iconBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameIconContainer: {
    backgroundColor: '#7E57C2',
    borderWidth: 2,
    borderColor: '#673AB7',
  },
  blogsIconContainer: {
    backgroundColor: '#FF9800',
    borderWidth: 2,
    borderColor: '#F57C00',
  },
  aboutIconContainer: {
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#388E3C',
  },
  miniIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#472751',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#472751',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  transactionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    color: '#FF9500',
    fontWeight: '500',
  },
  activityCard: {
    borderRadius: 15,
    elevation: 4,
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#472751',
    marginBottom: 10,
  },
  activityDescription: {
    fontSize: 15,
    color: '#757575',
    lineHeight: 22,
  },
  tipsSection: {
    padding: 20,
    paddingTop: 0,
    marginBottom: 10,
  },
  tipCard: {
    borderRadius: 15,
    elevation: 4,
    backgroundColor: '#FFF9C4',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#472751',
    marginBottom: 10,
  },
  tipDescription: {
    fontSize: 15,
    color: '#5D4037',
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#757575',
  },
});

export default Home;