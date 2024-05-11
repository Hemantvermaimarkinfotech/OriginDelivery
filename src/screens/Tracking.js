import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from "react-native-axios";

const TrackingScreen = ({navigation}) => {
  // const [tracking, setTracking] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');

  const GetTracking = async () => {
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
      setOrderNumber(response.data);
      navigation.navigate("TrackingStatus", { id: response.data.id, trackingData: response.data });
    } catch (error) {
      Alert(error)
      console.error('Error:', error);
      setOrderNumber(null);
    }
  };

  const handleSubmission = () => {
    // Handle the submission logic here
    console.log('Order Number submitted:', orderNumber);
    // Call the function to get tracking information
    GetTracking();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{marginTop: 20}} />
      <View style={{marginHorizontal: 15}}>
        <Text style={styleA.label}>Enter Order Number</Text>
        <TextInput
          style={styleA.input}
          placeholder="Order number..."
          value={orderNumber}
          onChangeText={(text) => setOrderNumber(text)}
        />
        <View style={{marginTop: 20}} />
        <TouchableOpacity style={styleA.button} onPress={handleSubmission}>
          <Text style={styleA.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styleA = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#30B0C9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrackingScreen;
