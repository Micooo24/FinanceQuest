import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

SplashScreen.preventAutoHideAsync();

const LandingPage = () => {
  const [fontsLoaded] = useFonts({
    'GravitasOne-Regular': require('../../assets/fonts/GravitasOne-Regular.ttf'),
    'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
  });
  
  const animation = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    
    // Play the animation when the component mounts
    if (animation.current) {
      animation.current.play();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    navigation.navigate('Auth', { screen: 'Login' });
  };

  const handleSignup = () => {
    navigation.navigate('Auth', { screen: 'Signup' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#472751" barStyle="light-content" />
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation}
          style={styles.lottieAnimation}
          source={require('../../assets/animations/finance-quest.json')}
          autoPlay
          loop
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.tagline}>Your Financial Adventure Begins</Text>
        <Text style={styles.headlineText}>
          MASTER YOUR FINANCES, ONE QUEST AT A TIME
        </Text>
        <Text style={styles.subText}>
          Take control of your financial future through fun, interactive challenges. Learn to budget, save, and invest while earning rewards!
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Icon name="school" size={24} color="#FFD700" />
            <Text style={styles.featureText}>Learn by doing</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="emoji-events" size={24} color="#FFD700" />
            <Text style={styles.featureText}>Earn rewards</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="trending-up" size={24} color="#FFD700" />
            <Text style={styles.featureText}>Track progress</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.signupButton}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Start Your Journey</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Already on a quest? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#472751',
  },
  animationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  tagline: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'LilitaOne-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headlineText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'GravitasOne-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'LilitaOne-Regular',
    paddingHorizontal: 5,
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(152, 103, 197, 0.4)',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: 100,
  },
  featureText: {
    color: 'white',
    marginTop: 8,
    fontFamily: 'LilitaOne-Regular',
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginBottom: 15,
    width: '80%',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'GravitasOne-Regular',
  },
  loginButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'GravitasOne-Regular',
  },
});

export default LandingPage;