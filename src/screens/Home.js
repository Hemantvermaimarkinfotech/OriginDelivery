// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

import MainHeader from '../components/MainHeader';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';

// import '../assets/fonts/Montserrat/ProtestRiot-Regular.ttf';

const HomeScreen = ({navigation}) => {

  // const customFontFamily = 'ProtestRiot-Regular';

  // useEffect(() => {
  //   // Set your custom font family here
  //   Text.defaultProps.style = { fontFamily: customFontFamily };
  // }, []);
  
//   // Import the custom font
// import './src/assets/fonts/Montserrat/ProtestRiot-Regular.ttf';

// // Define the custom font family
// const customFontFamily = 'ProtestRiot-Regular';

// // Set the custom font family as the default for the entire app
// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.style = Text.defaultProps.style || {};
// Text.defaultProps.style.fontFamily = customFontFamily;

// useEffect(() => {
//   // Set your custom font family here
//   Text.defaultProps.style = { fontFamily: 'YourCustomFont' };
// }, []);




  const [selectedItems, setSelectedItems] = useState([]);

  const ordersData = [
    {
      id: '1',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      status: 'Accepted',
    },
    {
      id: '2',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      status: 'Picked up',
    },
    {
      id: '3',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      status: '',
    },
    {
      id: '4',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      status: '',
    },
    {
      id: '5',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      status: '',
    },
    {
      id: '6',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      status: '',
    },
    {
      id: '7',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      status: '',
    },
    // Add more orders as needed
  ];

  const toggleSelection = (itemId) => {
    const updatedSelection = selectedItems.includes(itemId)
      ? selectedItems.filter((item) => item !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedSelection);
  };



  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
    
      <View style={styles.productContainer}>
        <Image source={item.imageUrl} style={styles.productImage} />
        <Text style={{position: 'absolute', bottom: 12, color: colors.success, fontWeight: '500'}}>{item.status}</Text>
      </View>

      {/* Middle product information */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={[styles.productPrice, {color: colors.darkT}]}>{item.price}</Text>
        <Text style={[mStyle.p1, {color: colors.darkT, marginBottom :4}]}>{item.productType}</Text>
        <Text style={[mStyle.p2, {color: colors.lightT}]}>{item.orderNo}</Text>

        <TouchableOpacity style={[mStyle.button, {width: 80, height: 30, marginVertical: 5}]} 
        onPress={() => navigation.navigate('MapRoute')}>
        <View style={mStyle.row}>
            <Text style={[mStyle.buttonText, {fontSize: 14}]}>Route</Text>
        </View>
      </TouchableOpacity>
        
      </View>

      {/* Right side checkbox */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleSelection(item.id)}
      >
        {selectedItems.includes(item.id) ? (
          <View style={styles.checkedBox} />
        ) : (
          <View style={styles.uncheckedBox} />
        )}
      </TouchableOpacity>
    </View>
  );

  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{marginHorizontal: 15, marginVertical: 15}}>
        <Text style={[mStyle.h5]}>Undelivered Orders</Text>
      </View>
      
      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
      />

      <View style={{marginHorizontal: 15, marginVertical: 12}}>
        <TouchableOpacity style={[mStyle.button]}>
          <View style={mStyle.row}>
              <Text style={[mStyle.buttonText]}>Accept order(s)</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginRight: 15,
   
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 120,
    borderRadius: 6
  },
  productImage: {
    height: 80,
    width: 80,
    objectFit: 'contain'
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: '600',
    fontSize: 16.5,
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1.2,
    borderColor: '#D6D6D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 18,
    height: 18,
    backgroundColor: colors.primary,
  },
  uncheckedBox: {
    width: 18,
    height: 18,
  },
});

export default HomeScreen;
