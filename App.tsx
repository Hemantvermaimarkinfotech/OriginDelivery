// app.js
import React, {useEffect} from 'react';
import { Text ,StyleSheet,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import Routes from './src/components/Routes';
// import './src/assets/fonts/Montserrat/ProtestRiot-Regular.ttf';

// const customFontFamily = 'ProtestRiot-Regular';

import { GLOBAL_FONT_FAMILY } from './src/utils/globalFonts';
import Provider from './src/components/Provider';
// Text.defaultProps.style = { fontFamily: GLOBAL_FONT_FAMILY };


const App = () => {

  useEffect(() => {
    // Set the global font family
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.style = { fontFamily: GLOBAL_FONT_FAMILY };
  }, []);


  return (
    
    // <NavigationContainer>
    //   <MainStack />
    // </NavigationContainer>

  //   <Provider store={Store}>
  //   <Routes />
  // </Provider>
  <View style={styles.container}>
  <Provider />
</View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
