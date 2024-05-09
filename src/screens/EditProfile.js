import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import mStyle from '../../AppStyles';
import { AuthContext } from '../components/AuthProvider';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../components/Loader';

const EditProfile = ({ navigation, route }) => {
  const { profileData } = route.params; // Access profile data from navigation parameters
  const { userToken, setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Set initial state using profile data
  const [firstName, setFirstName] = useState(profileData.user_full_name || '');
  const [surName, setSurName] = useState(profileData.delivery_man_surname || '');
  const [phoneNuber, setPhoneNumber] = useState(profileData.delivery_man_phone || '');
  const [iban, setIban] = useState(profileData.delivery_man_iban || '');
  const [age, setAge] = useState(profileData.delivery_man_age || '');
  const [gender, setGender] = useState(profileData.delivery_man_gender || '');
  const [homeAddress, setHomeAddress] = useState(profileData.delivery_man_home_address || '');
  const [workAddress, setWorkAddress] = useState(profileData.delivery_man_work_address || '');

  // Function to update profile
  const UpdateProfile = async () => {
     setLoading(true); 
    const data = JSON.stringify({
      "email": "mohammad.sameer@imarkinfotech.com",
      "user_name": "sameer",
      "user_full_name": "sameer star",
      "delivery_man_surname": "star",
      "delivery_man_phone": "66786786786",
      "delivery_man_iban": "JGHDYB7866hTHR",
      "delivery_man_gender": "Male",
      "delivery_man_age": "20",
      "delivery_man_home_address": "Malerkotla",
      "delivery_man_work_address": "Chandigarh"
    });
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://staging11.originmattress.com.sg/wp-json/delivery-man/v1/update',
      headers: { 
        'Authorization': 'uU2xzRtIVvMkl7Nmf0LlWAjPIW9AvpU4pSG7qfqdDnt_199', 
        'Content-Type': 'application/json'
      },
      data: data
    };
  
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      // Call the onUpdateProfile function to update profile data in UserProfileScreen
      route.params.onUpdateProfile(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error); // Log any errors that occur during the request
    }
  };
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
        <View style={styles.marginHorizontal}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            placeholder={'First Name'}
          />
          <Text style={styles.label}>Surname</Text>
          <TextInput
            style={styles.input}
            value={surName}
            onChangeText={text => setSurName(text)}
            placeholder={'Surname'}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNuber}
            placeholder={'Phone Number'}
          />
          <Text style={styles.label}>IBAN</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setIban(text)}
            value={iban}
            placeholder={'IBAN'}
          />
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setAge(text)}
            value={age}
            placeholder={'Age'}
          />
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setGender(text)}
            value={gender}
            placeholder={'Gender'}
          />
          <Text style={styles.label}>Home Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setHomeAddress(text)}
            value={homeAddress}
            placeholder={'Home Address'}
          />
          <Text style={styles.label}>Work Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setWorkAddress(text)}
            value={workAddress}
            placeholder={'Work Address'}
          />
          {loading?
          <Loader/>:(
            <TouchableOpacity style={[mStyle.button, { marginTop: 20 }]} onPress={() => UpdateProfile()}>
            <Text style={mStyle.buttonText}>Save</Text>
          </TouchableOpacity>
          )}
                    {loading && <Loader />} 
          {/* {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />} */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
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

export default EditProfile;
