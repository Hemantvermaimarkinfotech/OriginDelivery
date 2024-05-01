import React, { useState, useEffect }from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import mStyle from '../../AppStyles';


const TrackingScreen = ({navigation}) => {

  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmission = () => {
    // Handle the submission logic here
    console.log('Order Number submitted:', orderNumber);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
       
      <View style={{marginTop: 20}} />

      <View style={{marginHorizontal: 15}}>
        {/* <Text style={styleA.label}>Tracking</Text> */}
        <Text style={styleA.label}>Enter Order Number</Text>
        <TextInput
          style={styleA.input}
          placeholder="Order number..."
          value={orderNumber}
          onChangeText={(text) => setOrderNumber(text)}
        />
        <View style={{marginTop: 20}} />

        <TouchableOpacity style={[mStyle.button]} onPress={() => navigation.navigate('TrackingStatus')}>
            <Text style={[mStyle.buttonText]}>Submit</Text>
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
});


export default TrackingScreen;
