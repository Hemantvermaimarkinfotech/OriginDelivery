import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import mStyle from '../../AppStyles';
import ImagePaths from '../utils/ImagePaths';
import colors from '../utils/Colors';
import Geolocation from '@react-native-community/geolocation';
import axios from 'react-native-axios';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../components/AuthProvider';
import Loader from '../components/Loader';

const MapRouteScreen = ({route, navigation}) => {
  
  const { orderIds, status } = route.params;

  console.log('Order IDs:', orderIds);
  console.log('Status:', status);


  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [showCustomerAddress, setShowCustomerAddress] = useState(true);
  const [showWarehouseAddress, setShowWarehouseAddress] = useState(true);
  const [showCurrentAddress, setShowCurrentAddress] = useState(true);
  const [showSideLine, setShowSideLine] = useState(true);
  const [showmarkedline,setShowMarkedLine]=useState(true)
  const {userToken, updateUserToken} = useContext(AuthContext);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [orderStatus, setOrderStatus] = useState('Accepted'); // Initial order status is 'Accepted'


  const handleNavigateToSecondPage = (latitude, longitude) => {
    // Navigate to the second page with coordinates as route params
    navigation.navigate('GoogleMap', {latitude, longitude});
  };

  const GetShippingAddresses = async orderIds => {
    try {
      const addressPromises = orderIds.map(async orderId => {
        console.log('Order ID:', orderId); // Log the orderId
        try {
          const response = await axios.get(
            `https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/shipping-address/${orderId}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log('Response data:', response?.data); // Log the response data
          if (response.data && response.data.shipping_address) {
            // Decode HTML-encoded shipping address
            const decodedAddress = response.data.shipping_address.replace(
              /<br\s*\/?>/gi,
              '\n',
            );
            return {id: orderId, address: decodedAddress};
          } else {
            console.error(
              `Shipping address not found for order ID: ${orderId}`,
              response.data,
            );
            return null;
          }
        } catch (error) {
          console.error(
            `Error fetching Shipping Address for order ID: ${orderId}`,
            error,
          );
          return null;
        }
      });

      const addresses = await Promise.all(addressPromises);
      // Filter out null addresses
      const filteredAddresses = addresses.filter(address => address !== null);
      setAddresses(filteredAddresses);
    } catch (error) {
      console.error('Error fetching Shipping Addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(orderIds) && orderIds.length > 0) {
      GetShippingAddresses(orderIds);
    } else {
      console.error('Invalid order IDs:', orderIds);
    }
  }, [orderIds]);

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
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
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

  const handleAcceptThisOrder = async orderId => {
    setLoading(true);
    try {
      // Update order status to "Accepted"
      await updateOrderStatus(orderId, 'accepted');
      console.log('Order status updated to "Accepted"');
      setShowCurrentAddress(true);
      setShowWarehouseAddress(true);
      setShowCustomerAddress(false);
      setOrderStatus('accepted'); // Update order status to 'accepted'
      Alert.alert(
        'Order Accepted',
        'Order status has been updated to "Accepted".',
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status. Please try again.');
    } finally {
      setLoading(false); // Reset loading state after the API call completes
    }
  };
  

  const handleMarkAsPickedUp = async orderId => {
    setLoading(true)
    try {
      // Update order status to "Picked Up"
      await updateOrderStatus(orderId, 'pickedup');
      setShowCurrentAddress(false);
      setShowWarehouseAddress(true);
      setShowCustomerAddress(true);
      setShowMarkedLine(false)
      
      console.log('Order status updated to "Picked Up"');
      setOrderStatus('pickedup');
      Alert.alert(
        'Order Pickedup',
        'Order status has been updated to "Picked Up".',
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status. Please try again.');
    }finally {
      setLoading(false); // Reset loading state after the API call completes
    
      }
  };
  const handleMarkAsDelivered = async orderId => {
    setLoading(true)
    try {
      // Update order status to "Picked Up"
      await updateOrderStatus(orderId, 'Delivered');
      console.log('Order status updated to "Picked Up"');
      setShowMarkedLine(true)
      setOrderStatus('Delivered');
      navigation.navigate("Home")
      Alert.alert(
        'Order Delivered',
        'Order status has been updated to "Picked Up".',
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status. Please try again.');
    } finally {
    setLoading(false); // Reset loading state after the API call completes
  
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        `https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/update-order-status/${orderId}/${status}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken?.token}`,
          },
        },
      );
      console.log('Order status updated:', response.data);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };



  return (
    <ImageBackground
      source={ImagePaths.mapBackground}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.infoView}>
        
     {loading ?
     <ActivityIndicator size={"large"} color="#30B0C9"/>:(
      <View style={{}}>
      {addresses.map((item, index) => (
        <View style={{marginTop: 10}} key={index}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                marginTop: 5,
                alignItems: 'center',
                height: '100%',
              }}>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: '#30B0C9',
                  borderRadius: 8,
                }}
              />
          
            <View
              style={{
                height: '28%',
                width: 2,
                backgroundColor: '#30B0C9',
              }}/>
          
          
          <View
            style={{
              height: 15,
              width: 15,
              borderWidth: 1,
              borderColor: '#30B0C9',
              borderRadius: 8,
              // display: index !== addresses.length - 1 ? 'flex' : 'none', // Conditionally show or hide this view
            }}
          />
          {showmarkedline  && (
            <View
              style={{
                height: '30%',
                width: 2,
                backgroundColor: '#30B0C9',
              }}
            />
          )} 
              <View
                style={{
                  height: 15,
                  width: 15,
                  borderWidth: 1,
                  borderColor: '#30B0C9',
                  borderRadius: 8,
                }}
              />
            </View>
    
            <View style={{paddingHorizontal: 20, gap: 20}}>
              {showCurrentAddress && (
                <View>
                  <Text style={styles.infoTitle}>Current Address</Text>
                  <Text>Latitude: {location?.latitude}</Text>
                  <Text>Longitude: {location?.longitude}</Text>
                </View>
              )}
              {showWarehouseAddress && (
                <View>
                  <Text style={styles.infoTitle}>
                    Warehouse Address
                  </Text>
                  <Text style={styles.infoSubTitle}>
                    Girls’ Home, 1 Defu Ave 1, Singapore
                  </Text>
                  <Text style={styles.infoSubTitle}>
                    <Text style={{fontWeight: 600, color: '#000'}}>
                      2KM
                    </Text>{' '}
                    6min
                  </Text>
                </View>
              )}
              {showCustomerAddress && (
                <View style={{marginTop: 20}}>
                  <Text style={styles.infoTitle}>Customer Address</Text>
                  <Text style={styles.infoSubTitle}>
                    {item.address}
                  </Text>
                </View>
              )}
            </View>
          </View>
    
          <View style={{paddingHorizontal: 20}}>
      <View style={{paddingHorizontal: 20}}>
      {orderStatus !== 'pickedup' && orderStatus !== 'accepted' ? (
  <TouchableOpacity 
    style={[mStyle.button, {marginTop:20}]}
    onPress={() => handleAcceptThisOrder(item.id)}
    disabled={loading}> 
    {loading ? ( 
      <Loader />
    ) : (
      <Text
        style={[
          mStyle.buttonText,
          {fontFamily: 'Montserrat-Bold'},
        ]}>
        Accept this order
      </Text>
    )}
  </TouchableOpacity>
) : null}

        {orderStatus === 'accepted' &&
          orderStatus !== 'pickedup' && (
            <TouchableOpacity
              style={[mStyle.button,{marginTop:20}]}
              onPress={() => handleMarkAsPickedUp(item.id)}>
              <Text
                style={[
                  mStyle.buttonText,
                  {fontFamily: 'Montserrat-Bold'},
                ]}>
                Mark as Picked Up
              </Text>
            </TouchableOpacity>
          )}
        {orderStatus === 'pickedup' && (
          <TouchableOpacity
            style={[mStyle.button,{marginTop:20}]}
            onPress={() => handleMarkAsDelivered(item.id)}>
            <Text
              style={[
                mStyle.buttonText,
                {fontFamily: 'Montserrat-Bold'},
              ]}>
              Mark as Delivered
            </Text>
          </TouchableOpacity>
        )}
      </View>



    
      <TouchableOpacity
        onPress={() =>
          handleNavigateToSecondPage(
            item.latitude,
            item.longitude,
          )
        }>
        <Text style={styles.googleMapText}>Visit Google Map</Text>
      </TouchableOpacity>
    </View>
    
    
          
        </View>
      ))}
    </View>
     )}




          
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
    marginBottom: '30%',
    minHeight: 300,
    justifyContent:"center",
    height: 500,
    alignItems:"center"
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#23233C',
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium',
  },
  infoSubTitle: {
    fontSize: 15,
    color: '#838383',
    lineHeight: 20,
    fontFamily: 'Montserrat-Medium',
  },
  googleMapText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: '#000000',
    marginTop: 10,
    fontFamily: 'Montserrat-SemiBold',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapRouteScreen;
