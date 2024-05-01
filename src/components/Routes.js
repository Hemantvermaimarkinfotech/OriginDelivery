import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from './AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from '../navigation/MainStack';
import AuthStack from './AuthStack';

const Routes = () => {
  const {userToken} = useContext(AuthContext);
  
    return (
      <>
        <NavigationContainer>
          {/* <AppStack /> */}
          {userToken ? <MainStack /> : <AuthStack />}
          {/* <MainStack/> */}
        </NavigationContainer>
      </>
    );
};
export default Routes;

const styles = StyleSheet.create({});