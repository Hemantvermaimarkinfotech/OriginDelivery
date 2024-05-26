// src/screens/HomeScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';

import MainHeader from '../components/MainHeader';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import axios from 'react-native-axios';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

// import '../assets/fonts/Montserrat/ProtestRiot-Regular.ttf';

const HomeScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Change to single item

  const acceptSelectedOrders = () => {
    if (selectedItem) {
      const selectedOrderDetails = ordersData.find(order => order.id === selectedItem);
  
      console.log('Selected Order:', selectedOrderDetails);
      const orderIds = [selectedOrderDetails.id]; // Wrap in an array
  
      console.log('Order IDs:', orderIds);
  
      navigation.navigate('MapRoute', {
        selectedOrderIds: orderIds,
        orderIds, // Pass the order IDs
        selectedItems: [selectedOrderDetails],
        status: selectedOrderDetails.status // Pass the status
      });
    } else {
      Alert.alert('No orders selected', 'Please select an order to accept.');
    }
  };
  
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
      console.log('name', response?.data);
      if (response?.data?.length === 0) {
        setOrdersData([]);
      } else {
        setOrdersData(response?.data);
      }
      console.log(
        'Number of keys in response:',
        Object.keys(response?.data)?.length,
      );
    } catch (error) {
      console.log('this is catch error of undelivered data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
     alert('useFocusEffect');
      UndeliveredOrder(); // Fetch data when the screen is focused

      return () => {
        // Cleanup if necessary
      };
    }, []),
  );

  const toggleSelection = itemId => {
    setSelectedItem(selectedItem === itemId ? null : itemId);
  };

  const MAX_NAME_LENGTH = 20; // Define the maximum length for the product name

  // Function to truncate the product name if it exceeds the maximum length
  const truncateName = name => {
    if (name && name.length > MAX_NAME_LENGTH) {
      return name.substring(0, MAX_NAME_LENGTH) + '...'; // Add ellipsis if the name is truncated
    }
    return name;
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: item?.products[0]?.image || 'fallback_image_url' }}
          style={styles.productImage}
        />

        <Text
          style={{
            position: 'absolute',
            bottom: 12,
            color: colors.success,
            fontWeight: '500',
            fontSize: 13,
            fontFamily: 'Montserrat-Medium',
          }}>
          {item.status}
        </Text>
      </View>

      {/* Middle product information */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item?.products[0]?.name}</Text>

        <Text style={[styles.productPrice, { color: colors.darkT }]}>
          ${item.products[0]?.price}
        </Text>
        <Text
          style={[
            mStyle.p1,
            {
              color: colors.darkT,
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
            },
          ]}>
          Hougang
        </Text>
        <Text
          style={[
            mStyle.p2,
            {
              color: colors.lightT,
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
            },
          ]}>
          Order No. {item?.id}
        </Text>

        <TouchableOpacity
          style={[
            mStyle.button,
            { width: 70, height: 26, marginTop: 5, borderRadius: 6 },
          ]}
          onPress={() => navigation.navigate('MapRoute', { 
            orderIds: [item.id],
            status: item.status // Pass the status
          })} >
          <View style={mStyle.row}>
            <Text
              style={[
                mStyle.buttonText,
                { fontSize: 15, fontFamily: 'Montserrat, Bold' },
              ]}>
              Route
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Right side checkbox */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleSelection(item.id)}>
        {selectedItem === item.id ? (
          <Feather name="check" size={18} color={colors.primary} />
        ) : null}
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
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
        <Text
          style={[
            mStyle.h5,
            { color: colors.secondary, fontFamily: 'Montserrat-Bold' },
          ]}>
          Undelivered Orders
        </Text>
      </View>

      <FlatList
        data={ordersData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrderItem}
        ListFooterComponent={renderFooter}
        onEndReached={UndeliveredOrder}
        onEndReachedThreshold={0.1} // Trigger fetchNextPage when 90% scrolled to the end
      />

      <View style={{ marginHorizontal: 15, marginVertical: 12 }}>
        <TouchableOpacity
          style={[mStyle.button]}
          onPress={acceptSelectedOrders}>
          <View style={mStyle.row}>
            <Text style={[mStyle.buttonText, { fontFamily: 'Montserrat-Bold' }]}>
              Accept order(s)
            </Text>
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
    width: 110,
    height: 130,
    borderRadius: 6,
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
    fontSize: 17,
    marginBottom: 4,
    color: colors.secondary,
    fontFamily: 'Montserrat-SemiBold',
  },
  productPrice: {
    // fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    color: colors.secondary,
    fontFamily: 'Montserrat-Medium',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.2,
    borderColor: '#D6D6D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 16,
    height: 16,
    backgroundColor: colors.primary,
  },
  uncheckedBox: {
    width: 16,
    height: 16,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
    flex: 1,
  },
});

export default HomeScreen;
