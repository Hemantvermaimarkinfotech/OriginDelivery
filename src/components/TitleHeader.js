// HeaderComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
import ImagePaths from '../utils/ImagePaths';

import colors from '../utils/Colors';
import mStyle from '../../AppStyles';

const TitleHeader = ({ title, navigation }) => {

  return (
    <>
    <SafeAreaView style={{backgroundColor: colors.white}} />

    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Image
          source={ImagePaths.back} // Replace with your back button icon
          style={styles.icon}
        />
      </TouchableOpacity>

      <View style={{flexDirection :'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.title, {fontWeight: '700'}]}>{title}</Text>
      </View>
    </View>


    {/* <View style={styles.headerContainer}>
 
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Image
          source={ImagePaths.back} // Replace with your image/icon source
          style={styles.icon}
        />
      </TouchableOpacity>

   
      <View style={{flexDirection :'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.title, {fontWeight: '700'}]}>{title}</Text>
      </View>

    </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    // paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: colors.white, // Header background color
    // borderColor: colors.lightT,
    // borderBottomWidth: 0.2,
  },
  button: {
    // padding: 10,
    position: 'absolute', 
    left: 10,
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    objectFit: 'contain',
    // tintColor: colors.primary, // Icon color
  },
  title: {
    fontSize: 20,
    color: colors.secondary, // Title color
    letterSpacing: 1,
    fontFamily:"Montserrat, Bold"
  }
});

export default TitleHeader;
