import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'react-native-axios';
import {AuthContext} from '../components/AuthProvider';
import {Dropdown} from "react-native-element-dropdown"

const data = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const PayoutScreen = () => {
  const [isFocus, setIsFocus] = useState(false);

  const [comision, setComision] = useState([]);
  const {userToken} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
 

 


  const calculateTotalAmount = () => {
    if (!comision) return 0; // Return 0 if comision is undefined
    let totalAmount = 0;
    comision.forEach(item => {
      totalAmount += parseFloat(item.commission);
    });
    return totalAmount.toFixed(2); // Convert to fixed decimal places
  };

  const GetCommision = async selectedMonth => {
    setIsLoading(true); // Show loader while fetching data
    try {
      const response = await axios.get(
        `https://staging11.originmattress.com.sg/wp-json/delivery-man/v1/comission`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken?.token}`,
          },
        },
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
  }, []);



  const payoutSection = ({item}) => {
    return (
      <View style={styleA.container}>
        <View style={styleA.column}>
          <Text style={styleA.title}>Order No.</Text>
          <Text style={styleA.subtitle}>{item?.order_number}</Text>
        </View>
        <View style={styleA.column}>
          <Text style={styleA.title}>Date</Text>
          <Text style={styleA.subtitle}>{item?.completed_date}</Text>
        </View>
        <View style={[styleA.column, {}]}>
          <Text style={styleA.title}>Amount</Text>
          <Text style={styleA.subtitle}>${item?.commission}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{marginTop: 10}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            fontFamily: 'Montserrat-SemiBold',
            color: '#23233C',
          }}>
          Filter
        </Text>
        <View style={{width: '85%', height: 30}}>
    
       
        <Dropdown
          style={[styleA.dropdown, isFocus && { borderColor: '#DEDEDE' }]}
          placeholderStyle={styleA.placeholderStyle}
          selectedTextStyle={styleA.selectedTextStyle}
          inputSearchStyle={styleA.inputSearchStyle}
          iconStyle={[styleA.iconStyle,]} 
          data={data}
          search
          maxHeight={500}
          minHeight={20}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'choose month' : ''}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        
        />
        </View>
      </View>
      <View style={{marginTop: 40}} />
      <FlatList
        data={comision}
        renderItem={payoutSection}
        style={{zIndex: -1}}
        keyExtractor={(item, index) => index.toString()}
      />
      {isLoading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            },
          ]}>
          <ActivityIndicator size="large" color="#30B0C9" />
        </View>
      )}
      <View style={{borderTopWidth: 1.6, borderColor: '#E3E3E3'}}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Text style={styleA.title}>Total Amount</Text>
          <Text style={[styleA.subtitle, {color: '#23233C',fontSize:20,fontFamily:"Montserrat-SemiBold",opacity:1}]}>
            ${calculateTotalAmount()}
          </Text>
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
    backgroundColor: '#FFFFFF',
  },
  column: {
    // flex: 1, // Each column takes an equal amount of space
    // borderWidth: 1, // Just for visibility, you can remove this
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    color: '#23233C',
    // fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  subtitle: {
    fontSize: 18,
    color: '#23233C',
    // fontWeight: '700',
    marginVertical: 5,
    width: 100,
    // fontFamily:"Arial-Medium",
    opacity: 0.6,
    fontFamily:"Montserrat-Medium"
  },
  dropdown: {
    height: 35,
    borderColor: '#DEDEDE',
    borderWidth: 1.2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color:"#888888",
    fontFamily:"Montserrat-Medium"
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 27,
    height: 27,
    tintColor:"#1E84B3"
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default PayoutScreen;
