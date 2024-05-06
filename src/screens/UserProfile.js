// src/screens/LoginScreen.js
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import mStyle from '../../AppStyles';
import {AuthContext} from '../components/AuthProvider';
import axios from 'react-native-axios';

const UserProfileScreen = ({navigation}) => {
  const [profile, setProfile] = useState('');
  const {userToken, setUserToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://staging11.originmattress.com.sg/wp-json/delivery_man/v1/profile/201`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken?.accessToken}`,
          },
        },
      );
      setProfile(response?.data);
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.log(error?.response, 'error');
      setLoading(false); // Set loading state to false in case of error as well
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"#fff"}}>
        <ActivityIndicator size={50} color="#30B0C9" />
      </View>
    );
  }

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <View style={{marginTop: 20}} />

        <View style={{marginHorizontal: 20}}>
          <Text style={styleA.label}>Name</Text>
          <Text style={styleA.subLabel}>{profile?.user_name}</Text>

          <View style={{marginTop: 25}} />
          <Text style={styleA.label}>Surname</Text>
          <Text style={styleA.subLabel}>{profile?.delivery_man_surname}</Text>

          <View style={{marginTop: 25}} />
          <Text style={styleA.label}>Phone Number</Text>
          <Text style={styleA.subLabel}>{profile?.delivery_man_phone}</Text>

          <View style={{marginTop: 25}} />
          <Text style={styleA.label}>Iban</Text>
          <Text style={styleA.subLabel}>{profile?.delivery_man_iban}</Text>

          <View style={{marginTop: 25}} />
          <Text style={styleA.label}>Age</Text>
          <Text style={styleA.subLabel}>{profile?.delivery_man_age}</Text>

          <View style={{marginTop: 25}} />
          <Text style={styleA.label}>Gender</Text>
          <Text style={styleA.subLabel}>{profile?.delivery_man_gender}</Text>

          <View style={{marginTop: 25}} />
          <Text style={styleA.label}>Home Address</Text>
          <Text style={styleA.subLabel}>
            {profile?.delivery_man_home_address}
          </Text>

          <View style={{marginTop: 25}} />
          <Text style={styleA.label}>Work Address</Text>
          <Text style={styleA.subLabel}>
            {profile?.delivery_man_work_address}
          </Text>

          <View style={{marginTop: 40}} />
          <TouchableOpacity
            style={[mStyle.button]}
            onPress={() => navigation.navigate('EditProfile')}>
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
    fontWeight: '500',
    color: '#747474',
    marginBottom: 6,
  },
  subLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default UserProfileScreen;
