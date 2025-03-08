import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Animated,
  BackHandler
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../../assets/common/baseurl';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
const scale = Math.min(width / 360, height / 800);
const DRAWER_WIDTH = width * 0.7;

// Game data for the Games section
const popularGames = [
  {
    id: 1,
    title: "Saving Challenge",
    description: "Save money and reach your goals",
    icon: "savings",
    color: "#8F7BE8",
    screen: "SavingGame",
    animation: require('../../assets/animations/savings.json')
  },
  {
    id: 2,
    title: "Investment Challenge",
    description: "Grow your virtual portfolio",
    icon: "show-chart",
    color: "#8F7BE8",
    screen: "InvestmentGame",
    animation: require('../../assets/animations/investing.json')
  }
];

const Home = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('User');
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnimation = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  // Handle drawer animation
  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: menuOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [menuOpen]);

  // Handle back button to close drawer if open
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (menuOpen) {
        setMenuOpen(false);
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [menuOpen]);

  useEffect(() => {
    // Get user data from AsyncStorage
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const token = await AsyncStorage.getItem('authToken');
        
        if (storedUsername) {
          setUsername(storedUsername);
        } else if (token) {
          const response = await axios.get(`${baseURL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          // Set user data
          setUsername(response.data.username);
          await AsyncStorage.setItem('username', response.data.username);
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
      await AsyncStorage.removeItem('username');
      navigation.navigate('Auth', { screen: 'Login' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  console.log("Username:", username);
  console.log("Popular Games:", popularGames);
  console.log("Menu Open:", menuOpen);
  console.log("Scale:", scale);
  console.log("Navigation:", navigation);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8F7BE8" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFAFA" barStyle="dark-content" />
  
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header with burger menu */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuOpen(true)}>
            <Icon name="menu" size={28 * scale} color="#8F7BE8" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Home</Text>
          </View>
          <View style={{ width: 28 * scale }}>
            <Text>{""}</Text> 
          </View>
        </View>
    
        {/* Sliding Menu */}
        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnimation }] }]}>
          <View style={styles.drawerHeader}>
            <Icon name="attach-money" size={40 * scale} color="#8F7BE8" />
            <Text style={styles.drawerTitle}>Financial Quest</Text>
          </View>
          <View style={styles.drawerContent}>
            <TouchableOpacity style={styles.drawerItem} onPress={() => {
              setMenuOpen(false);
              navigation.navigate('GameFeatures');
            }}>
              <Icon name="sports-esports" size={24 * scale} color="#8F7BE8" />
              <Text style={styles.drawerItemText}>Games</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.drawerItem} onPress={() => {
              setMenuOpen(false);
              navigation.navigate('Blog');
            }}>
              <Icon name="book" size={24 * scale} color="#8F7BE8" />
              <Text style={styles.drawerItemText}>Blogs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.drawerItem} onPress={() => {
              setMenuOpen(false);
              navigation.navigate('About');
            }}>
              <Icon name="info" size={24 * scale} color="#8F7BE8" />
              <Text style={styles.drawerItemText}>About</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={() => {
            setMenuOpen(false);
            logout();
          }}>
            <Icon name="logout" size={24 * scale} color="#FFFAFA" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
    
        {/* Welcome Banner */}
        <View style={styles.welcomeBanner}>
          <LottieView
            source={require('../../assets/animations/welcome.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.usernameText}>{username || "Guest"}!</Text>
            <Text style={styles.welcomeSubtext}>
              Continue your financial journey today.
            </Text>
          </View>
        </View>
    
        {/* Games Section */}
        <View style={styles.gamesSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Icon name="sports-esports" size={26 * scale} color="#8F7BE8" />
              <Text style={styles.sectionTitle}>GAMES</Text>
            </View>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.gamesScrollView}
          >
            {popularGames.map((game, index) => (
              <TouchableOpacity 
                key={game.id || index} 
                style={styles.gameCard}
                onPress={() => navigation.navigate(game.screen)}
              >
                <View style={[styles.gameIconContainer, { backgroundColor: game.color }]}>
                  <Icon name={game.icon} size={26 * scale} color="#FFFAFA" />
                </View>
                <LottieView
                  source={game.animation}
                  autoPlay
                  loop
                  style={styles.lottieAnimation}
                />
                <Text style={styles.gameTitle}>{game.title ?? "Untitled Game"}</Text>
                <Text style={styles.gameDescription}>{game.description ?? "No description available"}</Text>
                <View style={styles.playButtonContainer}>
                  <TouchableOpacity 
                    style={[styles.playButton, { backgroundColor: game.color }]}
                    onPress={() => navigation.navigate(game.screen)}
                  >
                    <Icon name="play-arrow" size={18 * scale} color="#FFFAFA" />
                    <Text style={styles.playText}>Play</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFAFA',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAFA',
  },
  loadingText: {
    color: '#8F7BE8',
    fontSize: 18 * scale,
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  header: {
    height: 70 * scale,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(143, 123, 232, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#333',
    fontSize: 24 * scale,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  // Drawer styles
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#F5F5F5',
    zIndex: 1000,
    elevation: 10,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: 'rgba(143, 123, 232, 0.3)',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  drawerTitle: {
    fontSize: 24 * scale,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(143, 123, 232, 0.2)',
  },
  drawerItemText: {
    fontSize: 18 * scale,
    color: '#333',
    marginLeft: 15,
    fontFamily: 'Poppins-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(143, 123, 232, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoutText: {
    color: '#FFFAFA',
    fontSize: 18 * scale,
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    fontWeight: 'bold', // Fixed typo: 'fontweight' -> 'fontWeight'
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100 * scale,
  },
  welcomeBanner: {
    paddingHorizontal: 24,
    paddingTop: 30 * scale,
    paddingBottom: 30 * scale,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 2,
    borderBottomColor: '#8F7BE8',
    marginBottom: 20,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  welcomeContent: {
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 18 * scale,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  usernameText: {
    fontSize: 28 * scale,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  welcomeSubtext: {
    fontSize: 16 * scale,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  
  // Games Section Styles
  gamesSection: {
    padding: 24,
    paddingBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamesScrollView: {
    marginLeft: -8,
    paddingRight: 16,
  },
  gameCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    marginRight: 16,
    marginLeft: 8,
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(143, 123, 232, 0.2)',
  },
  gameIconContainer: {
    width: 56 * scale,
    height: 56 * scale,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  gameTitle: {
    fontSize: 20 * scale,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',   
  },
  gameDescription: {
    fontSize: 16 * scale,
    color: '#666',
    marginBottom: 18,
    fontFamily: 'Poppins-Regular',
  },
  playButtonContainer: {
    alignItems: 'flex-start',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
  },
  playText: {
    color: '#FFFAFA',
    fontFamily: 'Poppins-Bold',
    marginLeft: 6,
    fontSize: 16 * scale,
    fontWeight: 'bold',
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22 * scale,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: 'rgba(143, 123, 232, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  viewAllText: {
    color: '#8F7BE8',
    fontFamily: 'Poppins-Regular',
    fontSize: 14 * scale,
  },
  
  // Bottom Navigation Bar
  bottomNavBar: {
    height: 80 * scale,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: 'rgba(143, 123, 232, 0.3)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  
  navButtonText: {
    color: '#666',
    fontSize: 14 * scale,
    marginTop: 6,
    fontFamily: 'Poppins-Regular',
  },
});

export default Home;