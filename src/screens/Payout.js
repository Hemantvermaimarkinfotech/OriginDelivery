import React, { useState, useEffect }from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const PayoutScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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
      last12Months.push({ label: `${monthName} ${year}`, value: i });
    }

    return last12Months.reverse();
  };


  useEffect(() => {
    const monthsArray = getLast12Months();
    setMonths(monthsArray);
    setItems(monthsArray);
  }, []);

 


  const payoutData = [
    {
      "id": 1,
      "order_no": "ORD12345",
      "date": "2024-02-09",
      "amount": '$75.50'
    },
    {
      "id": 2,
      "order_no": "ORD67890",
      "date": "2024-02-10",
      "amount": '$75.50'
    },
    {
      "id": 3,
      "order_no": "ORD54321",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 4,
      "order_no": "ORD44320",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 5,
      "order_no": "ORD64000",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 6,
      "order_no": "ORD75671",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 7,
      "order_no": "ORD64000",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 8,
      "order_no": "ORD64000",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 9,
      "order_no": "ORD64000",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 10,
      "order_no": "ORD64000",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 11,
      "order_no": "ORD64000",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 12,
      "order_no": "ORD64000",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
    {
      "id": 13,
      "order_no": "ORD64000",
      "date": "2024-02-11",
      "amount": '$75.50'
    },
  ];


  const payoutSection = ({item}) => {
    return (
      <View style={styleA.container}>
        <View style={styleA.column}>
          <Text style={styleA.title}>Order No.</Text>
          <Text style={styleA.subtitle}>{item.order_no}</Text>         
        </View>
        <View style={styleA.column}>
          <Text style={styleA.title}>Date</Text>  
          <Text style={styleA.subtitle}>{item.date}</Text>             
        </View>
        <View style={styleA.column}>
          <Text style={styleA.title}>Amount</Text>   
          <Text style={styleA.subtitle}>{item.amount}</Text>            
        </View>
      </View>
    )
  }


  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
       
      <View style={{marginTop: 10}} />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
        <Text style={{fontSize: 20, fontWeight: 500}}>Filter:</Text>
        <View style={{width: '80%'}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Choose a month.'}
            // style={{borderColor: '#DEDEDE'}}
          />
        </View>
      </View>



      <View style={{marginTop: 20}} />
      <FlatList 
       data={payoutData}
       renderItem={payoutSection}
       style={{zIndex: -1}}    
      />
      <View style={{borderTopWidth: 1.6, borderColor: '#E3E3E3'}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-end', marginHorizontal: 20, paddingVertical: 10}}>
            <Text style={styleA.title}>Total Amount</Text>
            <Text style={[styleA.subtitle, {color: '#000'}]}>$1500.5</Text>
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
  },
  column: {
    // flex: 1, // Each column takes an equal amount of space
    // borderWidth: 1, // Just for visibility, you can remove this
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  subtitle:{
    fontSize: 16,
    color: '#888888',
    fontWeight: '500',
    marginVertical: 5
  }
});




export default PayoutScreen;
