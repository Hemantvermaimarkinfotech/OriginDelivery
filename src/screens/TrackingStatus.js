import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../components/AuthProvider';
import mStyle from '../../AppStyles';
import axios from "react-native-axios"
import Loader from '../components/Loader';


const TrackingStatusScreen = ({ route }) => {
  const { id, trackingData } = route.params;
  console.log("id, trackingData ",id, trackingData )
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Dispatched', value: 'accepted' },
    { label: 'Picked up', value: 'pickedup' },
    { label: 'Delivered', value: 'completed' },
  ]);
  const [loading, setLoading] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(trackingData?.status);
  const { userToken, updateUserToken } = useContext(AuthContext);

  const updateOrderStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/update-order-status/${trackingData.id}/${value}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken?.token}`,
          },
        }
      );
      if (response.data) {
        console.log('Success', response.data);
        // Update value state with the new status
        setValue(response.data.status);
        // Update the status displayed on the UI
        setUpdatedStatus(response.data.status);
        console.log('tryyy',response.data)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ marginTop: 20 }} />

      <View style={{ marginHorizontal: 15 }}>
        <Text style={styleA.label}>{trackingData.products[0]?.name}</Text>
        <Text style={styleA.subLabel}>Order No. {trackingData?.id}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#30B0C9',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600',fontSize:14,fontFamily:'Montserrat-Medium'}}>
              Status: {updatedStatus}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }} />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'Select Status'}
          onChangeItem={(item) => setValue(item.value)}
          style={{
            borderColor: '#DEDEDE', // Change '#000' to the desired color value
            borderWidth: 1.2, // Optional: You can adjust the border width as needed
            borderRadius: 5,
            color:"#888888" // Optional: You can adjust the border radius as needed
          }}
          placeholderStyle={{
            color: '#888888',
            fontSize:14,
            fontFamily:"Montserrat-Medium" // Change 'red' to the desired color value
          }}
          arrowIconStyle={{
            tintColor: '#1E84B3', 
            height:26,
            width:26// Change 'red' to the desired color value
          }}
          dropDownContainerStyle={{
            borderWidth:1.2,
            borderColor:"#DEDEDE",
          
          }}
          listItemLabelStyle={{
            color: '#888888', // Text color of the dropdown items
            fontSize: 14, // Adjust as needed
            fontFamily: 'Montserrat-Medium', // Adjust as needed
          }}
        
        />
        <View style={{ marginTop: 20 ,}} />

        {loading ? (
          <Loader />
        ) : (
          <TouchableOpacity
            style={[mStyle.button]}
            onPress={() => updateOrderStatus(value)}
          >
            <Text style={[mStyle.buttonText,{fontFamily:"Montserrat-Bold"}]}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styleA = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color:"#000000",
    fontFamily:"Montserrat-SemiBold"
  },
  subLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
    color: '#888888',
    fontFamily:"Montserrat-Medium"
  },
});

export default TrackingStatusScreen;
