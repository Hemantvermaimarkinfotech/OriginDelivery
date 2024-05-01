import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import SignUpOtp from '../screens/Authscreens/SignUpOtp';
// import Login from '../screens/Authscreens/Login';
// import Register from '../screens/Authscreens/Register';
// import Realid from '../screens/Authscreens/AppScreens/Realid';
// import Welcome from '../screens/Authscreens/Welcome';
// import Invite from '../screens/Authscreens/Invite';
// import ChooseLanguage from '../screens/Authscreens/ChooseLanguage';
// import Forgot from '../screens/Authscreens/Forgot';
// import OTPScreen from '../screens/Authscreens/Otp';
// import OnboardingScreen from '../screens/Authscreens/AppScreens/OnBoarding';
// import ChangePassword from '../screens/Authscreens/ChangePassword'
import Login from "../screens/Login"
import GetStartedScreen from "../screens/GetStarted"


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
        
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});