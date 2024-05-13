// src/screens/LoginScreen.js
import React, {useState,useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image , Platform, ScrollView} from 'react-native';
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
  const {userToken, setUserToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    // Validate email using regular expression
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValidEmail);
  };

  const handleContinue = () => {
      navigation.replace('DrawerNavigator'); 
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Assuming 'SignUp' is the name of your SignUp screen
  };

  const handleLogin = async () => {

    setLoading(true);
  
    let Data = JSON.stringify({
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
      alert(error?.response?.data?.error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <ScrollView style={styles.container}>
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
        <View style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
        <TextInput
          placeholderTextColor={"#23233C"}
          placeholder="Email"  
          color={"#23233C"}
          style={{flex:1}}
          onChangeText={handleEmailChange}
        />
          <TouchableOpacity>
          {isEmailValid ? (
            <AntDesign name="checkcircle" size={20} color="#6CC57C" />
          ) : (
            null
          )}
          
          </TouchableOpacity>
        </View>
        
        <View style={{marginVertical: 10}} />
        <View  style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
        <TextInput
    placeholderTextColor={"#23233C"}
    placeholder="Password"
    secureTextEntry={!showPassword}
    onChangeText={text=>setPassword(text)}
    style={{width:"60%"}}
    color={"#23233C"}
  /> 
  <TouchableOpacity onPress={togglePasswordVisibility}>
    <Feather name={showPassword ? "eye-off" : "eye"} size={22} color={"#23233C"}/>
  </TouchableOpacity>
        </View>

        <TouchableOpacity style={{alignSelf: 'flex-end'}}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={{marginVertical: 10}} />
      </View>

      <View style={{marginVertical: 10}} />
      {/* Submit Button */}
    {loading?
    <Loader/>:(
      <TouchableOpacity style={[mStyle.button, styles.shadow,]} onPress={handleLogin}>
      <Text style={mStyle.buttonText}>Login</Text>
    </TouchableOpacity>
    )}



      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
          <Text style={{fontWeight: '400', fontSize: 15}}>Don't have an account? </Text>
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={{fontWeight: '600', fontSize: 15}}>Sign up</Text>
          </TouchableOpacity>
       
      </View>

      <View style={{marginVertical: 15}} />
      {/* Signup and Social Media Buttons */}

      <View style={styles.socialButtonsContainer}>
      <TouchableOpacity style={[mStyle.button, {width: 80, backgroundColor: colors.white}]}>
        <Text style={[mStyle.buttonText, {color: '#000', fontSize: 30}]}>f</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[mStyle.button, {width: 80, backgroundColor: colors.white}]}>
        <Text style={[mStyle.buttonText, {color: '#000', fontSize: 30}]}>G</Text>
      </TouchableOpacity>
      </View>
      <View style={{marginVertical: 15}} />
      {/* <TouchableOpacity style={{alignSelf: 'center'}} onPress={handleContinue}>
          <Text style={{fontSize: 18, fontWeight: '500', textDecorationLine: 'underline'}}>Skip</Text>
      </TouchableOpacity> */}
      <View style={{marginVertical: 15}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    backgroundColor: '#F4F5FA',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '30%',
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logo: {
    width: 220,
    height: 55,
  },
  inputContainer: {
    marginTop: 50,
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
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signupLink: {
    color: '#007bff',
  },
  socialButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },


});

export default LoginScreen;

