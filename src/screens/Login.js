import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, SafeAreaView } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "react-native-axios"
import Loader from '../components/Loader';
import { AuthContext } from '../components/AuthProvider';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import Feather from "react-native-vector-icons/Feather"
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValidEmail);
    if (!text.trim()) {
      setEmailError('Please enter your email.');
    } else if (!isValidEmail) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!text.trim()) {
      setPasswordError('Please enter your password.');
    } else {
      setPasswordError('');
    }
  };

  const handleContinue = () => {
    navigation.navigate('ForgotPassword'); 
  };

  const handleLogin = async () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Please enter your email.');
      valid = false;
    } else if (!isEmailValid) {
      setEmailError('Please enter a valid email.');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    setLoading(true);

    const Data = JSON.stringify({
      Email: `${email}`,
      password: `${password}`,
    });

    try {
      const response = await axios.post(
        'https://staging11.originmattress.com.sg/wp-json/custom/v1/login',
        Data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Login response:', response.data);
      setUserToken(response?.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.response);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title and Logo */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Log in</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={ImagePaths.logoImage}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Email and Password Input */}
      <View style={styles.inputContainer}>
        <View style={{ height: 90 }}>
          <View style={[mStyle.input, styles.shadow, { backgroundColor: colors.white, borderWidth: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight:40 }]}>
            <FloatingLabelInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              containerStyles={{ width: "80%", opacity: 0.6, fontFamily: "Montserrat-SemiBold", fontSize: 12 ,height:45}}
              placeholderTextColor={"#23233C"}
              labelActiveColor={"red"} // Change the label color when active
              labelFontSize={isEmailValid || email ? 30 : 12} // Change the label font size based on state
            />
            <TouchableOpacity>
              {isEmailValid ? (
                <AntDesign name="checkcircle" size={20} color="#6CC57C" />
              ) : (
                null
              )}
            </TouchableOpacity>
          </View>
          {emailError ? <Text style={{ color: 'red', marginLeft: 20, fontSize: 13 }}>{emailError}</Text> : null}
        </View>

        <View style={{ height: 90 }}>
          <View style={[mStyle.input, styles.shadow, { backgroundColor: colors.white, borderWidth: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center",paddingRight:40 }]}>
            <FloatingLabelInput
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              containerStyles={{ width: "10%", opacity: 0.6, fontFamily: "Montserrat-SemiBold", fontSize: 12,height:45 }}
              placeholderTextColor={"#23233C"}
              secureTextEntry={!showPassword}
              labelStyles={{paddingLeft:4}}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather name={showPassword ? "eye-off" : "eye"} size={22} color={"#23233C"} />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={{ color: 'red', marginLeft: 20, fontSize: 13 }}> {passwordError}</Text> : null}
          <TouchableOpacity style={{ alignSelf: 'flex-end', position: "absolute", bottom: 0, fontSize: 16, color: "#000000", fontFamily: "Montserrat-SemiBold" }} onPress={handleContinue}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }} />
      </View>

      <View style={{ marginVertical: "3%" }} />
      {/* Submit Button */}
      {loading ?
        <Loader /> : (
          <TouchableOpacity style={[mStyle.button, styles.shadow]} onPress={handleLogin}>
            <Text style={mStyle.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

      <View style={{ marginVertical: 10 }} />
      {/* Signup and Social Media Buttons */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={[mStyle.button, { width: 80, backgroundColor: colors.white }]}>
          <Text style={[mStyle.buttonText, { color: '#000', fontSize: 30, color: "#0F279E" }]}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mStyle.button, { width: 80, backgroundColor: colors.white }]}>
          <Image source={require('../assets/images/google.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 20 }} />
      <View style={{ marginVertical: 15 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#F4F5FA',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '25%',
  },
  logoContainer: {
    alignItems: 'center',
    width: 220,
    height: 55,
    alignSelf: 'center',
    backgroundColor: colors.primary
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: colors.secondary,
    fontFamily: "Montserrat-Bold"
  },
  logo: {
    width: 220,
    height: 55,
  },
  inputContainer: {
    marginTop: "20%",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  forgotPassword: {
    marginTop: 2,
    textAlign: 'right',
    color: colors.black,
    fontWeight: '500',
    fontSize: 15,
  },
  socialButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
});

export default LoginScreen;
