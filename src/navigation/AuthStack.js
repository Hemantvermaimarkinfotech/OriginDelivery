// src/navigation/MainStack.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native'
import SplashScreen from '../screens/Splash';
import GetStartedScreen from '../screens/GetStarted';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/Signup';


const Stack = createStackNavigator();


const AuthStack = () => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Splash" 
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerStyle: { backgroundColor: '#30B0C9' }, // Set your desired header background color
        headerTintColor: 'white', // Set the text color in the header
      }}>

      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />


    </Stack.Navigator>
  );

};

export default AuthStack;

