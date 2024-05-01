// src/screens/LoginScreen.js
import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image , Platform, ScrollView} from 'react-native';

import { FloatingLabelInput } from 'react-native-floating-label-input';

import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';


const SignUpScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState('');

  const handleContinue = () => {
      navigation.replace('DrawerNavigator'); 
  };
  const navigatehandleLogin = () => {
    navigation.navigate("Login")
};


  return (
    <ScrollView style={styles.container}>
      {/* Title and Logo */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Sign Up</Text>
      </View>

    

      {/* Email and Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />
         <TextInput
          placeholder="SurName"
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />
         <TextInput
          placeholder="Phone Number"
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />
         <TextInput
          placeholder="Mail"
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />
         <TextInput
          placeholder="Iban"
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />
         <TextInput
          placeholder="Age"
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />
         <TextInput
          placeholder="Gender"
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />
         <TextInput
          placeholder="Home Address"
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />

        <View/>
        <TextInput
          placeholder="Work Address"
          secureTextEntry={true}
          style={[mStyle.input, styles.shadow, {backgroundColor: colors.white, borderWidth: 0}]}
        />
        <View style={{marginVertical: 10}} />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={[mStyle.button, styles.shadow,]} onPress={handleContinue}>
        <Text style={mStyle.buttonText}>SignUp</Text>
      </TouchableOpacity>



      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
          <Text style={{fontWeight: '400', fontSize: 15}}>Already have an account? </Text>
          <TouchableOpacity onPress={navigatehandleLogin}>
            <Text style={{fontWeight: '600', fontSize: 15}}>Login</Text>
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
      <TouchableOpacity style={{alignSelf: 'center'}} onPress={handleContinue}>
          <Text style={{fontSize: 18, fontWeight: '500', textDecorationLine: 'underline',marginBottom:"10%"}}>Skip</Text>
      </TouchableOpacity>
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
    marginTop: '2%',
    marginBottom: '2%',
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
    marginTop: 10,
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

export default SignUpScreen;

