import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, Modal } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import baseURL from '../../assets/common/baseurl';
import { Formik } from 'formik';
import * as Yup from 'yup';


// Define validation schema with Yup
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  birthday: Yup.date()
    .max(new Date(), 'Birthday cannot be in the future')
    .required('Birthday is required')
});

const Signup = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const [activeDateField, setActiveDateField] = useState(null);
  const navigation = useNavigation();
  const animation = useRef(null);

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, []);
  const [otp, setOtp] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  //reference
  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use the correct API
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('ImagePicker result:', result); // Log the entire result object

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;  
  
      setImage(selectedImageUri);
      console.log('Selected image URI:', selectedImageUri); // Log the selected image URI
    } else {
      console.log('Image selection was canceled');
    }
  };

  //reference for register 
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('birthday', values.birthday.toISOString().split('T')[0]);
    
    if (image) {
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('img', {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await axios.post(`${baseURL}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'User registered successfully');
      setRegisteredEmail(values.email); // Save the registered email
      setOtpDialogOpen(true); // Open the OTP modal
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'Failed to register user');
    }
  };
  
  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`${baseURL}/users/verify-email`, { email: registeredEmail, otp });
      if (response.status === 200) {
        Alert.alert("Success", "Email verification successful!");
        setOtpDialogOpen(false);
        navigation.navigate('Login');
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "OTP verification failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation}
          style={styles.lottieAnimation}
          source={require('../../assets/animations/signup.json')}
          autoPlay
          loop
        />
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Signup</Text>
          
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              birthday: new Date()
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
              <>
                <View style={styles.formContainer}>
                  <TextInput
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    mode="outlined"
                    left={<TextInput.Icon icon={() => <Icon name="email" size={24} color="white" />} />}
                    style={styles.input}
                    theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
                    outlineColor={errors.email && touched.email ? "red" : "rgba(255,255,255,0.5)"}
                    placeholderTextColor="white"
                  />
                  {errors.email && touched.email && (
                    <HelperText type="error" visible={true} style={styles.errorText}>
                      {errors.email}
                    </HelperText>
                  )}
                  
                  <TextInput
                    label="Username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    mode="outlined"
                    left={<TextInput.Icon icon={() => <Icon name="person" size={24} color="white" />} />}
                    style={styles.input}
                    theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
                    outlineColor={errors.username && touched.username ? "red" : "rgba(255,255,255,0.5)"}
                    placeholderTextColor="white"
                  />
                  {errors.username && touched.username && (
                    <HelperText type="error" visible={true} style={styles.errorText}>
                      {errors.username}
                    </HelperText>
                  )}
                  
                  <TextInput
                    label="Birthday"
                    value={values.birthday.toDateString()}
                    onFocus={() => {
                      setShowDatePicker(true);
                      setActiveDateField('birthday');
                    }}
                    mode="outlined"
                    left={<TextInput.Icon icon={() => <Icon name="cake" size={24} color="white" />} />}
                    style={styles.input}
                    theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
                    outlineColor={errors.birthday && touched.birthday ? "red" : "rgba(255,255,255,0.5)"}
                    placeholderTextColor="white"
                  />
                  {errors.birthday && touched.birthday && (
                    <HelperText type="error" visible={true} style={styles.errorText}>
                      {errors.birthday}
                    </HelperText>
                  )}
                  
                  {showDatePicker && (
                    <DateTimePicker
                      value={values.birthday}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          setFieldValue('birthday', selectedDate);
                        }
                      }}
                    />
                  )}
                  
                  <TextInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    mode="outlined"
                    secureTextEntry
                    left={<TextInput.Icon icon={() => <Icon name="lock" size={24} color="white" />} />}
                    style={styles.input}
                    theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
                    outlineColor={errors.password && touched.password ? "red" : "rgba(255,255,255,0.5)"}
                    placeholderTextColor="white"
                  />
                  {errors.password && touched.password && (
                    <HelperText type="error" visible={true} style={styles.errorText}>
                      {errors.password}
                    </HelperText>
                  )}
                  
                  <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Icon name="photo-camera" size={22} color="#472751" style={styles.imagePickerIcon} />
                    <Text style={styles.imagePickerText}>Upload Profile Picture</Text>
                  </TouchableOpacity>
                  
                  {image && (
                    <View style={styles.imagePreviewContainer}>
                      <Text style={styles.imageText}>Image selected</Text>
                      <Image
                        source={{ uri: image }}
                        style={styles.profileImage}
                      />
                    </View>
                  )}
                </View>
                
                <Button 
                  mode="contained" 
                  onPress={handleSubmit} 
                  style={styles.signupButton}
                  labelStyle={styles.signupButtonText}
                >
                  Create Account
                </Button>
              </>
            )}
          </Formik>
          
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={16} color="#472751" style={styles.backIcon} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* OTP Verification Dialog */}
      <Modal
        visible={otpDialogOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setOtpDialogOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            
            <TextInput
              label="OTP"
              value={otp}
              onChangeText={setOtp}
              mode="outlined"
              style={styles.otpInput}
              theme={{ colors: { text: '#472751', placeholder: '#472751', primary: '#472751' } }}
            />
            
            <View style={styles.modalButtons}>
              <Button 
                mode="outlined" 
                onPress={() => setOtpDialogOpen(false)}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={handleOtpSubmit}
                style={styles.submitButton}
              >
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
  scrollView: {
    flexGrow: 1,
    paddingVertical: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
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
    marginBottom: 5, // Reduced to make room for error text
    backgroundColor: 'rgba(152, 103, 197, 0.7)',
    width: '100%',
    height: 55,
    borderRadius: 8,
  },
  errorText: {
    color: '#FF5252',
    marginBottom: 10,
    fontSize: 12,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  imagePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 3,
  },
  imagePickerIcon: {
    marginRight: 8,
  },
  imagePickerText: {
    color: '#472751',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  imageText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  signupButton: {
    marginTop: 10,
    backgroundColor: '#FF9500',
    width: '100%',
    paddingVertical: 5,
    borderRadius: 30,
    elevation: 4,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomButtons: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 3,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#472751',
    textAlign: 'center',
  },
  otpInput: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#FF9500',
  },
});

export default Signup;