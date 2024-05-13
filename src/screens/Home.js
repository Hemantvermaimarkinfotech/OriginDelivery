// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet,ActivityIndicator } from 'react-native';

import MainHeader from '../components/MainHeader';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import axios from "react-native-axios"

// import '../assets/fonts/Montserrat/ProtestRiot-Regular.ttf';

const HomeScreen = ({navigation}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([]);

  
  const UndeliveredOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://staging11.originmattress.com.sg/wp-json/delivery_man/v1/processing-orders/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
 
      setOrdersData(response.data);
    } catch (error) {
      // console.log(error?.response, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    UndeliveredOrder(); // Fetch the first page when the component mounts
  }, []);
  
  const [selectedItems, setSelectedItems] = useState([]);

  // const ordersData = [
  //   {
  //     id: '1',
  //     productName: 'LumbarCloud™ Hybrid',
  //     productType: 'Hougang',
  //     imageUrl: ImagePaths.productImage,
  //     price: '$4.5',
  //     orderNo: 'Order No. SE422654',
  //     status: 'Accepted',
  //   },
  //   {
  //     id: '2',
  //     productName: 'LumbarCloud™ Hybrid',
  //     productType: 'Hougang',
  //     imageUrl: ImagePaths.productImage,
  //     price: '$4.5',
  //     orderNo: 'Order No. SE422654',
  //     status: 'Picked up',
  //   },
  //   {
  //     id: '3',
  //     productName: 'LumbarCloud™ Hybrid',
  //     productType: 'Hougang',
  //     imageUrl: ImagePaths.productImage,
  //     price: '$4.5',
  //     orderNo: 'Order No. SE422654',
  //     status: '',
  //   },
  //   {
  //     id: '4',
  //     productName: 'LumbarCloud™ Hybrid',
  //     productType: 'Hougang',
  //     imageUrl: ImagePaths.productImage,
  //     price: '$4.5',
  //     orderNo: 'Order No. SE422654',
  //     status: '',
  //   },
  //   {
  //     id: '5',
  //     productName: 'LumbarCloud™ Hybrid',
  //     productType: 'Hougang',
  //     imageUrl: ImagePaths.productImage,
  //     price: '$4.5',
  //     orderNo: 'Order No. SE422654',
  //     status: '',
  //   },
  //   {
  //     id: '6',
  //     productName: 'LumbarCloud™ Hybrid',
  //     productType: 'Hougang',
  //     imageUrl: ImagePaths.productImage,
  //     price: '$4.5',
  //     orderNo: 'Order No. SE422654',
  //     status: '',
  //   },
  //   {
  //     id: '7',
  //     productName: 'LumbarCloud™ Hybrid',
  //     productType: 'Hougang',
  //     imageUrl: ImagePaths.productImage,
  //     price: '$4.5',
  //     orderNo: 'Order No. SE422654',
  //     status: '',
  //   },
  //   // Add more orders as needed
  // ];

  const toggleSelection = (itemId) => {
    const updatedSelection = selectedItems.includes(itemId)
      ? selectedItems.filter((item) => item !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedSelection);
  };
  const MAX_NAME_LENGTH = 20; // Define the maximum length for the product name

  // Function to truncate the product name if it exceeds the maximum length
  const truncateName = (name) => {
    if (name && name.length > MAX_NAME_LENGTH) {
      return name.substring(0, MAX_NAME_LENGTH) + '...'; // Add ellipsis if the name is truncated
    }
    return name;
  };


  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
    
      <View style={styles.productContainer}>
      <Image   source={{ uri: item?.products[0]?.image || 'fallback_image_url' }} style={styles.productImage} />

        <Text style={{position: 'absolute', bottom: 12, color: colors.success, fontWeight: '500'}}>{item.status}</Text>
      </View>

      {/* Middle product information */}
      <View style={styles.productInfo}>
      <Text style={styles.productName}>{truncateName(item.products[0]?.name)}</Text>

        <Text style={[styles.productPrice, {color: colors.darkT}]}>${item.products[0]?.price}</Text>
        <Text style={[mStyle.p1, {color: colors.darkT, marginBottom :4}]}>Hougang</Text>
        <Text style={[mStyle.p2, {color: colors.lightT}]}>Order No. {item.products[0]?.id}</Text>

        <TouchableOpacity style={[mStyle.button, {width: 80, height: 30, marginVertical: 5}]} 
          onPress={() => navigation.navigate('MapRoute', { productId: item.id })}
         >
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

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator animating size="large" color={colors.primary} />
        </View>
      );
    } else {
      return null;
    }
  };

  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{marginHorizontal: 15, marginVertical: 15}}>
        <Text style={[mStyle.h5]}>Undelivered Orders</Text>
      </View>
      
      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        ListFooterComponent={renderFooter}
        onEndReached={UndeliveredOrder}
        onEndReachedThreshold={0.1} // Trigger fetchNextPage when 90% scrolled to the end
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
    objectFit: 'contain',
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
  footer:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:250,
    flex:1
  }

});

export default HomeScreen;
