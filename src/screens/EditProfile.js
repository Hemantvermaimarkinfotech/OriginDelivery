import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { AuthContext } from '../components/AuthProvider';
import axios from "react-native-axios"
import mStyle from '../../AppStyles';

const UpdateProfile = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("mohammad.sameer@imarkinfotech.com");
  const [userName, setUserName] = useState("sameerrr");
  const [userFullName, setUserFullName] = useState("sameer star");
  const [surName, setSurName] = useState("star");
  const [phoneNumber, setPhoneNumber] = useState("66786786786");
  const [iban, setIban] = useState("JGHDYB7866hTHR");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("20");
  const [homeAddress, setHomeAddress] = useState("Malerkotla");
  const [workAddress, setWorkAddress] = useState("Chandigarh");

  const UpdateProfile = async () => {
    setLoading(true);
    const userData = {
      email: email,
      user_name: userName,
      user_full_name: userFullName,
      delivery_man_surname: surName,
      delivery_man_phone: phoneNumber,
      delivery_man_iban: iban,
      delivery_man_gender: gender,
      delivery_man_age: age,
      delivery_man_home_address: homeAddress,
      delivery_man_work_address: workAddress
    };

    try {
      const response = await axios.post(
        'https://staging11.originmattress.com.sg/wp-json/delivery-man/v1/update',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken?.token}`
          }
        }
      );

      if (response.data.success) {
        console.log('Success', response.data.message)
        Alert.alert('Success', response.data.message);
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder={'Email'}
        placeholderTextColor={"#23233C"}
        color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={text => setUserName(text)}
        placeholder={'User Name'}
        placeholderTextColor={"#23233C"}
        color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={userFullName}
        onChangeText={text => setUserFullName(text)}
        placeholder={'User Full Name'}
        placeholderTextColor={"#23233C"}
        color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={surName}
        onChangeText={text => setSurName(text)}
        placeholder={'Surname'}
        placeholderTextColor={"#23233C"}
        color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        placeholder={'Phone Number'}
        placeholderTextColor={"#23233C"}
        color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={iban}
        onChangeText={text => setIban(text)}
        placeholder={'IBAN'}
        placeholderTextColor={"#23233C"}
        color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={text => setGender(text)}
        placeholder={'Gender'}
        placeholderTextColor={"#23233C"}
        color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={text => setAge(text)}
        placeholder={'Age'}
        placeholderTextColor={"#23233C"}
        color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={homeAddress}
        onChangeText={text => setHomeAddress(text)}
        placeholder={'Home Address'}
        placeholderTextColor={"#23233C"}
      color={"#23233C"}
      />
      <TextInput
        style={styles.input}
        value={workAddress}
        onChangeText={text => setWorkAddress(text)}
        placeholder={'Work Address'}
        placeholderTextColor={"#23233C"}
      color={"#23233C"}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={[mStyle.button, styles.button]} onPress={UpdateProfile}>
          <Text style={mStyle.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#fff",
    paddingBottom:20
  },
  input: {
    width: '90%',
    height: 55,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 5,
    paddingLeft: 10,
    
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width:"90%"
  },
});

export default UpdateProfile;
