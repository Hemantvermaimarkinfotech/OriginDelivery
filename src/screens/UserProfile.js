import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import mStyle from '../../AppStyles';
import { AuthContext } from '../components/AuthProvider';
import axios from 'react-native-axios'; // Importing axios properly
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook
import colors from '../utils/Colors';

const UserProfileScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // useIsFocused hook to track screen focus

  const fetchData = async () => {
    console.log("userToken?accessToken",userToken?.token)
    try {
      const response = await axios.get(
        `https://staging11.originmattress.com.sg/wp-json/delivery_man/v1/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken?.token}`
          },
        },
      );
      console.log("Profile data", response.data);
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error.response.data);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch profile data. Please try again.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]); // useEffect depends on isFocused

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="#30B0C9" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {profile && (
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.text}>{profile.user_full_name}</Text>
          <Text style={styles.label}>Surname:</Text>
          <Text style={styles.text}>{profile.delivery_man_surname}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{profile.email}</Text>

       

          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.text}>{profile.delivery_man_phone}</Text>

          <Text style={styles.label}>Iban:</Text>
          <Text style={styles.text}>{profile.delivery_man_iban}</Text>

          <Text style={styles.label}>Age:</Text>
          <Text style={styles.text}>{profile.delivery_man_age}</Text>

          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.text}>{profile.delivery_man_gender}</Text>

          <Text style={styles.label}>Home Address:</Text>
          <Text style={styles.text}>{profile.delivery_man_home_address}</Text>

          <Text style={styles.label}>Work Address:</Text>
          <Text style={styles.text}>{profile.delivery_man_work_address}</Text>
        

          <TouchableOpacity
            style={[mStyle.button, styles.button,{marginBottom:100}]}
            onPress={() => navigation.navigate('EditProfile', { profile })}>
            <Text style={mStyle.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileContainer: {
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#747474',
    marginBottom: 6,
    fontFamily:"Arial-Regular"
  },
  text: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 20,
    color:colors.secondary,
    fontFamily:"Arial-Regular"
    
  },
  button: {
    marginTop: 20,
  },
});

export default UserProfileScreen;