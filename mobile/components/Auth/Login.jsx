import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseurl';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const animation = useRef(null);

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, []);

  const logAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log('AsyncStorage contents:', result);
    } catch (error) {
      console.error('Error logging AsyncStorage:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      console.log('Login response:', response.data);
      if (response.status === 200) {
        const { access_token } = response.data;
        await AsyncStorage.setItem('authToken', access_token);

        // Fetch user data
        const userResponse = await axios.get(`${baseURL}/admin/get-users`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const user = userResponse.data.users.find(user => user.email === email);
        const userRole = user.role;
        const userId = user._id;
        const useremail = user.email;
        const username = user.username;

        // Store user data in AsyncStorage
        await AsyncStorage.setItem("email", useremail);
        await AsyncStorage.setItem("userRole", userRole);
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("username", username);

        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home');
        logAsyncStorage(); // Log AsyncStorage contents after setting the tokens
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Failed to log in');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation}
          style={styles.lottieAnimation}
          source={require('../../assets/animations/moneylogin.json')}
          autoPlay
          loop
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        
        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            left={<TextInput.Icon icon={() => <Icon name="email" size={24} color="white" />} />}
            style={styles.input}
            theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
            outlineColor="rgba(255,255,255,0.5)"
            placeholderTextColor="white"
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon={() => <Icon name="lock" size={24} color="white" />} />}
            right={<TextInput.Icon icon={() => <Icon name={showPassword ? "visibility" : "visibility-off"} size={24} color="white" onPress={() => setShowPassword(!showPassword)} />} />}
            style={styles.input}
            theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
            outlineColor="rgba(255,255,255,0.5)"
            placeholderTextColor="white"
          />
        </View>
        
        <Button 
          mode="contained" 
          onPress={handleLogin} 
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}
        >
          Login
        </Button>
        
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={16} color="#472751" style={styles.backIcon} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Need an account? Go to Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    paddingHorizontal: 25,
    paddingTop: 50, // Added some top padding to account for status bar
    zIndex: 1, // Ensure content is above the animation
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(152, 103, 197, 0.4)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(152, 103, 197, 0.7)',
    width: '100%',
    height: 55,
    borderRadius: 8,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: '#FF9500',
    width: '100%',
    paddingVertical: 5,
    borderRadius: 30,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomButtons: {
    marginTop: 25,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 3,
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 5,
  },
  backButtonText: {
    color: '#472751',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;