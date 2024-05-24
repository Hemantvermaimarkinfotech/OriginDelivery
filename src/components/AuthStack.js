import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from "../screens/Login"
import GetStartedScreen from "../screens/GetStarted"
import ForgotPasswordScreen from '../screens/ForgotPassword';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="GetStarted">
   
 
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
  

   
      <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />

      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});