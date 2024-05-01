import React, { useState, useEffect }from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import mStyle from '../../AppStyles';


const TrackingStatusScreen = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      {label: 'Dispatched', value: 'Dispatched'},
      {label: 'Picked up', value: 'Picked up'},
      {label: 'Delivered', value: 'Delivered'},
  ]);


  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
       
      <View style={{marginTop: 20}} />

      <View style={{marginHorizontal: 15}}>
        <Text style={styleA.label}>LumbarCloud™ Hybrid</Text>
        <Text style={styleA.subLabel}>Order No. SE422654</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <View style={{ backgroundColor: '#30B0C9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}>
           <Text style={{ color: 'white', fontWeight: '600' }}>Status: Picked up</Text>
         </View>
        </View>
        <View style={{marginTop: 20}} />


        {/* <TextInput
          style={styleA.input}
          placeholder="Order number..."
          value={orderNumber}
          onChangeText={(text) => setOrderNumber(text)}
        /> */}

        <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Select Status'}
        />
        <View style={{marginTop: 20}} />
         

        <TouchableOpacity style={[mStyle.button]}>
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
