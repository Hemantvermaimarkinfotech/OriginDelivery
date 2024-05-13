import React, { useState, useEffect,useContext }from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/AuthProvider';
import mStyle from '../../AppStyles';


const TrackingStatusScreen = ({route}) => {
  const { id, trackingData } = route.params;
console.log("trackingData",trackingData)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      {label: 'Dispatched', value: 'dispatched'},
      {label: 'Picked up', value: 'pickedup'},
      {label: 'Delivered', value: 'delivered'},
  ]);
  const [loading,setLoading]=useState(false)
  const {userToken}=useContext(AuthContext)


  const updateOrderStatus = async () => {
    // console.log("tokn",userToken?.token)

    // console.log(`https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/update-order-status/${trackingData.id}/${value)`);
    console.log(`https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/update-order-status/${trackingData.id}/${value}`);

    setLoading(true);

    try {
      const response = await axios.post(
        `https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/update-order-status/${trackingData.id}/${value}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken?.token}`
          },
        },
      );
      console.log('OrderStaus-Update response:', response.data); 
      setUserToken(response?.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.response);
      alert(error?.response?.data?.error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
       
      <View style={{marginTop: 20}} />

      <View style={{marginHorizontal: 15}}>
        <Text style={styleA.label}>{trackingData.products[0]?.name}</Text>
        <Text style={styleA.subLabel}>Order No. {trackingData?.id}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <View style={{ backgroundColor: '#30B0C9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}>
           <Text style={{ color: 'white', fontWeight: '600' }}>Status: {trackingData?.status}</Text>
         </View>
        </View>
        <View style={{marginTop: 20}} />


        <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Select Status'}
                onChangeItem={(item) => updateOrderStatus(item.value)}
        />
        <View style={{marginTop: 20}} />
         

        <TouchableOpacity style={[mStyle.button]} onPress={() => updateOrderStatus(value)}>
            <Text style={[mStyle.buttonText]}>Update</Text>
        </TouchableOpacity>
      </View>
  
    </View>
  );
};


const styleA = StyleSheet.create({

  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  subLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
    color: '#888888'
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


export default TrackingStatusScreen;
