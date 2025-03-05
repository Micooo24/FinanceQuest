import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Dimensions
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../../assets/common/baseurl';

const { width } = Dimensions.get('window');

// Game data for the Games section
const popularGames = [
  {
    id: 1,
    title: "Saving Challenge",
    description: "Save money and reach your goals",
    icon: "money-bill-wave",
    color: "#9370DB",
    screen: "SavingGame"
  },
  {
    id: 2,
    title: "Investment Challenge",
    description: "Grow your virtual portfolio",
    icon: "chart-line",
    color: "#B39DDB",
    screen: "InvestmentGame"
  },
  {
    id: 3,
    title: "Debt Destroyer",
    description: "Eliminate debt strategies",
    icon: "piggy-bank",
    color: "#7B68EE",
    screen: "DebtGame"
  }
];

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
      navigation.navigate('Auth', { screen: 'Login' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9370DB" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      
      {/* Minimal header with shadow */}
      <View style={styles.header} />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
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

        {/* Games Section */}
        <View style={styles.gamesSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Icon name="sports-esports" size={24} color="#9370DB" />
              <Text style={styles.sectionTitle}>Financial Games</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.gamesScrollView}
          >
            {popularGames.map(game => (
              <TouchableOpacity 
                key={game.id} 
                style={styles.gameCard}
                onPress={() => navigation.navigate(game.screen)}
              >
                <View style={[styles.gameIconContainer, {backgroundColor: game.color}]}>
                  <FontAwesome5 name={game.icon} size={24} color="#F9F6FF" />
                </View>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDescription}>{game.description}</Text>
                <View style={styles.playButtonContainer}>
                  <TouchableOpacity 
                    style={[styles.playButton, {backgroundColor: game.color}]}
                    onPress={() => navigation.navigate(game.screen)}
                  >
                    <Icon name="play-arrow" size={16} color="#F9F6FF" />
                    <Text style={styles.playText}>Play</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Menu Section */}
        <View style={styles.menuSection}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="menu" size={24} color="#9370DB" />
            <Text style={styles.sectionTitle}>Main Menu</Text>
          </View>

          {/* Game Features Menu */}
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('GameFeatures')}
          >
            <View style={[styles.menuIconContainer, {backgroundColor: '#9370DB'}]}>
              <FontAwesome5 name="gamepad" size={22} color="#F9F6FF" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Game Features</Text>
              <Text style={styles.menuDescription}>
                Explore quizzes, challenges, and earn rewards
              </Text>
            </View>
            <Icon name="chevron-right" size={22} color="#9370DB" />
          </TouchableOpacity>
          
          {/* Blogs Menu */}
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('Blog')}
          >
            <View style={[styles.menuIconContainer, {backgroundColor: '#B39DDB'}]}>
              <FontAwesome5 name="book-open" size={22} color="#F9F6FF" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Financial Blogs</Text>
              <Text style={styles.menuDescription}>
                Read articles on personal finance and investing
              </Text>
            </View>
            <Icon name="chevron-right" size={22} color="#9370DB" />
          </TouchableOpacity>
          
          {/* About Menu */}
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('About')}
          >
            <View style={[styles.menuIconContainer, {backgroundColor: '#7B68EE'}]}>
              <FontAwesome5 name="info-circle" size={22} color="#F9F6FF" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>About</Text>
              <Text style={styles.menuDescription}>
                Learn about Financial Quest and our mission
              </Text>
            </View>
            <Icon name="chevron-right" size={22} color="#9370DB" />
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="lightbulb" size={24} color="#9370DB" />
            <Text style={styles.sectionTitle}>Financial Tip of the Day</Text>
          </View>
          <Card style={styles.tipCard}>
            <Card.Content>
              <View style={styles.tipIconContainer}>
                <FontAwesome5 name="piggy-bank" size={18} color="#9370DB" />
              </View>
              <Text style={styles.tipTitle}>Save Early, Save Often</Text>
              <Text style={styles.tipDescription}>
                The earlier you start saving, the more time your money has to grow. Even small amounts can add up over time!
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Footer spacing padding */}
        <View style={styles.footerSpace} />
      </ScrollView>

      {/* Bottom App Title and Logout Button */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomLogoContainer}>
          <Icon name="attach-money" size={24} color="#9370DB" />
          <Text style={styles.headerTitle}>Financial Quest</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" size={20} color="#F9F6FF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#9370DB',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  header: {
    height: 15,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(147, 112, 219, 0.3)',
  },
  headerTitle: {
    color: '#F9F6FF',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: 'rgba(147, 112, 219, 0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80, // Increased for high-res screens
  },
  welcomeBanner: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 2,
    borderBottomColor: '#9370DB',
    marginBottom: 15,
  },
  welcomeContent: {
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(249, 246, 255, 0.7)',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: 5,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: 'rgba(249, 246, 255, 0.7)',
    fontWeight: '400',
  },
  
  // Games Section Styles
  gamesSection: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamesScrollView: {
    marginLeft: -5,
    paddingRight: 15,
  },
  gameCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: 16,
    padding: 16,
    width: width * 0.65,
    marginRight: 12,
    marginLeft: 5,
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(147, 112, 219, 0.2)',
  },
  gameIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: 6,
  },
  gameDescription: {
    fontSize: 14,
    color: '#BDBDBD',
    marginBottom: 15,
  },
  playButtonContainer: {
    alignItems: 'flex-start',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  playText: {
    color: '#F9F6FF',
    fontWeight: '500',
    marginLeft: 4,
    fontSize: 14,
  },
  
  menuSection: {
    padding: 20,
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9F6FF',
    marginBottom: 15,
    marginLeft: 8,
  },
  viewAllButton: {
    backgroundColor: 'rgba(147, 112, 219, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  viewAllText: {
    color: '#9370DB',
    fontWeight: '500',
    fontSize: 13,
  },
  menuCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(147, 112, 219, 0.2)',
  },
  menuIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F9F6FF',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    color: '#BDBDBD',
    lineHeight: 18,
  },
  tipsSection: {
    padding: 20,
    paddingTop: 0,
    marginBottom: 10,
  },
  tipCard: {
    borderRadius: 16,
    backgroundColor: '#2D2D2D',
    elevation: 3,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(147, 112, 219, 0.2)',
  },
  tipIconContainer: {
    backgroundColor: 'rgba(147, 112, 219, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F9F6FF',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: '#BDBDBD',
    lineHeight: 22,
  },
  // Space for footer padding
  footerSpace: {
    height: 80,
  },
  // Bottom bar for app title and logout
  bottomBar: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: 'rgba(147, 112, 219, 0.3)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: "rgba(0, 0, 0, 0.7)",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  bottomLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default Home;