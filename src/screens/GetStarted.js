// src/screens/GetStartedScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

import mStyle from '../../AppStyles';
import colors from '../utils/Colors';




const slides = [
  {
    title: 'Welcome to Origin App',
    description: 'Explore the amazing features of your app with these quick slides.',
  },
  {
    title: 'It’s Time To Upgrade Your Sleep',
    description: 'Find interesting content and enjoy a personalized experience.',
  },
  {
    title: 'Get Started Now',
    description: 'Join millions of users who already love our app.',
  },
];



const GetStartedScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleContinue = () => {
    if (activeIndex < slides.length - 1) {
      // Continue to the next slide
      setActiveIndex(activeIndex + 1);
    } else {
      // Navigate to the next screen (e.g., the login screen)
      // navigation.replace('Main'); // Replace 'Login' with the actual name of your login screen
      navigation.navigate('Login'); 
    }
  };

  return (    
    <View style={styles.container}>
      <Image
        source={require('../assets/images/getStarted.png')} // Replace with your image source
        style={styles.image}
        resizeMode="cover"
      />

      <Swiper
        showsButtons={false}
        loop={true}
        index={activeIndex}
        onIndexChanged={(index) => setActiveIndex(index)}
        dot={<View style={{backgroundColor: colors.white, width: 12, height: 12,borderRadius: 6, marginLeft: 5, marginRight: 5}} />}
        activeDot={<View style={{backgroundColor: colors.primary, width: 12, height: 12, borderRadius: 6, marginLeft: 5, marginRight: 5}} />}
        >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.slideContent}>
              <Text style={styles.title}>{slide.title}</Text>
              {/* <Text style={styles.description}>{slide.description}</Text> */}
            </View>
          </View>
        ))}
      </Swiper>

      <View style={{marginBottom: 60, marginTop: 10}}>
      <TouchableOpacity style={[mStyle.button, {width: 220}]} onPress={handleContinue}>
        <View style={mStyle.row}>
            <Text style={[mStyle.buttonText]}>
              {activeIndex === slides.length - 1 ? 'Log In' : 'Continue'}
            </Text>
        </View>
      </TouchableOpacity>
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
  slide: {
    position: 'relative',
    top: '80%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  slideContent: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 30,
    letterSpacing: 0.6,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
    color:colors.secondary
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;