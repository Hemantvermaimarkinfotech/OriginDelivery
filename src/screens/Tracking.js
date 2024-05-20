import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from "react-native-axios";
import Loader from '../components/Loader';
import colors from '../utils/Colors';

const TrackingScreen = ({navigation}) => {
  // const [tracking, setTracking] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [loading,setIsLoading]=useState(false)

  const GetTracking = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://staging11.originmattress.com.sg/wp-json/delivery_man/v1/order/${orderNumber}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      console.log('Tracking', response.data);
      navigation.navigate("TrackingStatus", { id: response.data.id, trackingData: response.data });
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmission = () => {
    if (!orderNumber) {
      
      return;
    }
    console.log('Order Number submitted:', orderNumber);
    GetTracking();
  };

  useEffect(() => {
    setIsLoading(false); // Reset loading state when orderNumber changes
  }, [orderNumber]);
  
  

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{marginTop: 20}} />
      <View style={{marginHorizontal: 15}}>
        <Text style={styleA.label}>Enter Order Number</Text>
        <TextInput
          style={styleA.input}
          placeholder="Order number..."
          value={orderNumber}
  
placeholderTextColor={"#23233C"}
          onChangeText={(text) => {console.log(text);setOrderNumber(text)}}
       
        />
        <View style={{marginTop: 20}} />
       {loading?
       <Loader/>:(
        <TouchableOpacity style={styleA.button} onPress={handleSubmission}>
        <Text style={styleA.buttonText}>Submit</Text>
      </TouchableOpacity>
       )}
      </View>
    </View>
  );
};

const styleA = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color:colors.secondary,
    fontFamily:"Montserrat-SemiBold"
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    color:"#23233C",
    fontSize:16,
    fontFamily:"Montserrat-SemiBold",
    opacity:0.6
  },
  button: {
    backgroundColor: '#30B0C9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily:"Montserrat-Bold"
  },
});

export default TrackingScreen;
