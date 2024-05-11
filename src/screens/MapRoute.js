import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, PermissionsAndroid } from 'react-native';

import mStyle from '../../AppStyles';
import ImagePaths from '../utils/ImagePaths';
import colors from '../utils/Colors';
import Geolocation from '@react-native-community/geolocation';
import axios from "react-native-axios"

const MapRouteScreen = ({route}) => {
  const { productId } = route.params;
  console.log(" productId ", productId )
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null); 
  const [showCustomerAddress, setShowCustomerAddress] = useState(false);
  const [showWarehouseAddress, setShowWarehouseAddress] = useState(false);

  const GetShippingAddress = async (productId) => {
    try {
      const response = await axios.get(
        `https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/shipping-address/${productId}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      console.log('Shipping Address:', response.data); 
      setAddress(response.data); 
    } catch (error) {
      console.error('Error fetching Shipping Address:', error);
      setAddress(null);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    GetShippingAddress(productId); 
  }, [productId]); 

  useEffect(() => {
    // Request permission to access location
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If permission is granted, get the current location
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position.coords);
            },
            error => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();

    // Clean up
    return () => {
      // Clean up your location subscription here if necessary
    };
  }, []);

  const handleAcceptOrder = () => {
    setShowWarehouseAddress(true);
    setShowCustomerAddress(true);
  };


  
  return (
    <ImageBackground
      source={ImagePaths.mapBackground}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.infoView}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginTop: 5, alignItems: "center", height: "100%" }}>
              <View style={{ height: 15, width: 15, backgroundColor: "#30B0C9", borderRadius: 8 }} />
              <View style={{ height: "28%", width: 2, backgroundColor: "#30B0C9" }}></View>
              <View style={{ height: 15, width: 15, borderWidth: 1, borderColor: "#30B0C9", borderRadius: 8 }} />
              <View style={{ height: "22%", width: 2, backgroundColor: "#30B0C9" }}></View>
              <View style={{ height: 15, width: 15, borderWidth: 1, borderColor: "#30B0C9", borderRadius: 8 }} />
            </View>

            <View style={{ paddingHorizontal: 20, gap: 20 }}>
              <View>
                <Text style={styles.infoTitle}>Current Address</Text>
              
                  {/* <Text style={styles.infoSubTitle}>Richard Hotel, 320 Havelock Road, Robertson Singapore, Mob: +97354-73523</Text> */}
                   <Text>Latitude: {location?.latitude}</Text>
                  <Text>Longitude: {location?.longitude}</Text>

              </View>
              <View>
                <Text style={styles.infoTitle}>Warehouse Address</Text>
                <Text style={styles.infoSubTitle}>Girls’ Home, 1 Defu Ave 1, Singapore</Text>
                <Text style={styles.infoSubTitle}><Text style={{ fontWeight: 600, color: '#000' }}>2KM</Text> 6min</Text>
              </View>
              <View>
                <Text style={styles.infoTitle}>Customer Address</Text>
                <Text style={styles.infoSubTitle}>{address?.shipping_address}</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 30 }} />

          <View style={{ paddingHorizontal: 20, gap: 20 }}>
            <TouchableOpacity style={[mStyle.button]} onPress={() => { }}>
              <Text style={[mStyle.buttonText]}>Accept This Order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.googleMapText}>Visit Google Map</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }} />
        </View>
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width; // Get the window width

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire container
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoView: {
    width: '90%',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: '10%',
    minHeight: 300,
    justifyContent: 'flex-end',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#23233C',
    marginBottom: 5,
  },
  infoSubTitle: {
    fontSize: 14,
    color: '#838383',
    lineHeight: 20,
  },
  googleMapText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: '#000',
    marginTop: 10,
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
