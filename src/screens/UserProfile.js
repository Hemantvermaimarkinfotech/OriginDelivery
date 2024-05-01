// src/screens/LoginScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import mStyle from '../../AppStyles';

const UserProfileScreen = () => {
  return (
    <>
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
       
       <View style={{marginTop: 20}} />
 
       <View style={{  marginHorizontal: 20 }}>
         <Text style={styleA.label}>Name</Text>
         <Text style={styleA.subLabel}>Adam</Text>

         <View style={{marginTop: 25}} />
         <Text style={styleA.label}>Surname</Text>
         <Text style={styleA.subLabel}>Gillchrist</Text>

         <View style={{marginTop: 25}} />
         <Text style={styleA.label}>Phone Number</Text>
         <Text style={styleA.subLabel}>98473-64736</Text>

         <View style={{marginTop: 25}} />
         <Text style={styleA.label}>Iban</Text>
         <Text style={styleA.subLabel}>US79BARC20038064374999</Text>

         <View style={{marginTop: 25}} />
         <Text style={styleA.label}>Age</Text>
         <Text style={styleA.subLabel}>Male</Text>

         <View style={{marginTop: 25}} />
         <Text style={styleA.label}>Gender</Text>
         <Text style={styleA.subLabel}>Adam</Text>

         <View style={{marginTop: 25}} />
         <Text style={styleA.label}>Home Address</Text>
         <Text style={styleA.subLabel}>320 Havelock Road, Robertson Singapore</Text>

         <View style={{marginTop: 25}} />
         <Text style={styleA.label}>Work Address</Text>
         <Text style={styleA.subLabel}>320 Havelock Road, Robertson Singapore</Text>

         <View style={{marginTop: 40}} />
         <TouchableOpacity style={[mStyle.button]}>
            <Text style={[mStyle.buttonText]}>Edit</Text>
        </TouchableOpacity>

       </View>
    </View>
    </>
  );
};


const styleA = StyleSheet.create({
  label: {
    fontSize: 17, 
    fontWeight: 500,
    color: '#747474', 
    marginBottom: 6
  },
  subLabel: {
    fontSize: 18, 
    fontWeight: 500
  },
});



export default UserProfileScreen;
