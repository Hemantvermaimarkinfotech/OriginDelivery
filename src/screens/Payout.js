import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "react-native-axios"
import { AuthContext } from '../components/AuthProvider';

const PayoutScreen = () => {
  const [comision, setComision] = useState([]);
  const { userToken } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [months, setMonths] = useState([]);

  const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  };

  const getLast12Months = () => {
    const currentDate = new Date();
    const last12Months = [];

    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentDate.getMonth() - i + 12) % 12;
      const monthName = getMonthName(monthIndex);
      const year = currentDate.getFullYear();
      last12Months.push({ label: `${monthName} ${year}`, value: monthIndex });
    }

    return last12Months.reverse();
  };

  useEffect(() => {
    const monthsArray = getLast12Months();
    setMonths(monthsArray);
    setItems(monthsArray);
  }, []);

  const calculateTotalAmount = () => {
    if (!comision) return 0; // Return 0 if comision is undefined
    let totalAmount = 0;
    comision.forEach(item => {
      totalAmount += parseFloat(item.commission);
    });
    return totalAmount.toFixed(2); // Convert to fixed decimal places
  };

  const GetCommision = async (selectedMonth) => {
    setIsLoading(true); // Show loader while fetching data
    try {
      const response = await axios.get(
        `https://staging11.originmattress.com.sg/wp-json/delivery-man/v1/comission?month=${selectedMonth}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken?.token}`
          },
        }
      );
      console.log('Comision', response.data);
      setComision(response.data);
    } catch (error) {
      console.error('Error comision:', error);
      setComision([]);
    } finally {
      setIsLoading(false); // Hide loader after fetching data
    }
  };

  useEffect(() => {
    GetCommision(selectedMonth);
  }, [selectedMonth]);

  const payoutSection = ({ item }) => {
    return (
      <View style={styleA.container}>
        <View style={styleA.column}>
          <Text style={styleA.title}>Order No.</Text>
          <Text style={styleA.subtitle}>{item?.order_number}</Text>
        </View>
        <View style={styleA.column}>
          <Text style={styleA.title}>Date</Text>
          <Text numberOfLines={1} style={styleA.subtitle}>{item?.completed_date}</Text>
        </View>
        <View style={styleA.column}>
          <Text style={styleA.title}>Commission</Text>
          <Text style={styleA.subtitle}>${item?.commission}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ marginTop: 10 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>Filter:</Text>
        <View style={{ width: '80%' }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Choose a month.'}
            onChangeValue={(value) => {
              setSelectedMonth(value);
              setValue(value);
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }} />
      <FlatList
        data={comision}
        renderItem={payoutSection}
        style={{ zIndex: -1 }}
        keyExtractor={(item, index) => index.toString()}
      />
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }]}>
          <ActivityIndicator size="large" color="#30B0C9" />
        </View>
      )}
      <View style={{ borderTopWidth: 1.6, borderColor: '#E3E3E3' }}>
        <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginHorizontal: 20, paddingVertical: 10 }}>
          <Text style={styleA.title}>Total Amount</Text>
          <Text style={[styleA.subtitle, { color: '#000' }]}>${calculateTotalAmount()}</Text>
        </View>
      </View>
    </View>
  );
};

const styleA = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Arrange children horizontally
    marginHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor:"#FFFFFF"
  },
  column: {
    // flex: 1, // Each column takes an equal amount of space
    // borderWidth: 1, // Just for visibility, you can remove this
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    color: '#23233C',
    fontWeight: '500',
 
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    fontWeight: '500',
    marginVertical: 5,
    width: 100
  }
});

export default PayoutScreen;
