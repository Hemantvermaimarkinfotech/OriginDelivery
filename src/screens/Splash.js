// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a loading process and navigate to the Login screen
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 2000); // 2000 milliseconds (2 seconds) for demo purposes
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')} // Replace with your image source
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
         <Image
        source={require('../assets/images/logo.png')} // Replace with your image source
        style={styles.logoImage}
        resizeMode="contain"
       />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoImage: {
     height: 80,
     width: 260
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the overlay color and opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white', // Adjust the text color as needed
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
