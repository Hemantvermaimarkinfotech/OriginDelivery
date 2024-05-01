// src/screens/LoginScreen.js
import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import mStyle from '../../AppStyles';
import ImagePaths from '../utils/ImagePaths';
import colors from '../utils/Colors';
import ProgressSteps, { Title, Content } from '@joaosousa/react-native-progress-steps';


const MapRouteScreen = () => {

  const [step, setStep] = useState(0);
  
  const handleButtonPress = () => {
    // Handle button press action here
    console.log('Button Pressed');
  };


  return (
    <>
    {/* <View style={{flex: 1, backgroundColor: '#ffffff'}}>
       
    </View> */}
    


    <ImageBackground
      source={ImagePaths.mapBackground} // Replace with your background image source
      style={styles.backgroundImage}>

      <View style={styles.container}>
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Marker Title" />
        </MapView> */}

        {/* Information View */}
        <View style={styles.infoView}>
            <View style={{marginTop: 10}} />
            <View style={{paddingHorizontal: 20, gap: 20}}>
              <View>
                <Text style={styles.infoTitle}>Current Address</Text>
                <Text style={styles.infoSubTitle}>Richard Hotel, {'\n'}320 Havelock Road, Robertson Singapore, {'\n'}Mob: +97354-73523</Text>
              </View>
              <View>
                <Text style={styles.infoTitle}>Warehouse Address</Text>
                <Text style={styles.infoSubTitle}>Girls’ Home, 1 Defu Ave 1, Singapore</Text>
                <Text style={styles.infoSubTitle}><Text style={{fontWeight: 600, color: '#000'}}>2KM</Text> 6min</Text>
              </View>
              <View>
                <Text style={styles.infoTitle}>Customer Address</Text>
                <Text style={styles.infoSubTitle}>Adam, {'\n'}320 Havelock Road, Robertson Singapore, {'\n'}Mob: +97354-73523</Text>
              </View>
            </View>
            <View style={{marginTop: 30}} />

            <View style={{paddingHorizontal: 20, gap: 20}}>
              <TouchableOpacity style={[mStyle.button]} onPress={ () => {}}>
                <Text style={[mStyle.buttonText]}>Accept This Order</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => {}}>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 500, textDecorationLine: 'underline' }}>Visit Google Map</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}} />
        </View>
      </View>
    </ImageBackground>

    </>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    objectFit: 'contain'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
  },
  infoView: {
    width: '90%',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: '10%',
    minHeight: 400,
    justifyContent: 'flex-end'
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#23233C',
    marginBottom: 5
  },
  infoSubTitle: {
    fontSize: 14,
    color: '#838383',
    lineHeight: 20
  },
  stepContent: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // padding: 20,
    // backgroundColor: 'white',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapRouteScreen;
