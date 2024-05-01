// HeaderComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
import ImagePaths from '../utils/ImagePaths';

import colors from '../utils/Colors';
import mStyle from '../../AppStyles';

const MainHeader = ({ title, navigation }) => {

  return (
    <>
    <SafeAreaView style={{backgroundColor: colors.white}} />
    <View style={styles.headerContainer}>
      {/* Left button (image/icon) */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.openDrawer()}>
        <Image
          source={ImagePaths.menuIcon} // Replace with your image/icon source
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Middle title */}
      <View style={{flexDirection :'row'}}>
      <Text style={[styles.title, {fontWeight: '700'}]}>Hello </Text>
      <Text style={styles.title}>Richard!</Text>
      
      </View>


      {/* Right button (profile avatar) */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile')}>
        <Image
          source={ImagePaths.dummyUser} // Replace with your avatar source
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white, // Header background color
    borderColor: colors.lightT,
    borderBottomWidth: 0.2
  },
  button: {
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
    fontWeight: '400',
    color: colors.black, // Title color
    letterSpacing: 1
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18, // Half of the width/height to make it a circle
  },
});

export default MainHeader;