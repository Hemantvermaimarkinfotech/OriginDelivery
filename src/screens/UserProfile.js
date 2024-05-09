import React, { useState, useContext, useEffect ,useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import mStyle from '../../AppStyles';
import { AuthContext } from '../components/AuthProvider';
import axios from 'react-native-axios'; // Importing axios properly

const UserProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null); // Changed initial state to null
  const { userToken } = useContext(AuthContext); // Removed setUserToken since it's not used
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${userToken?.token}`
          }
        };

        const response = await axios.get('https://staging11.originmattress.com.sg/wp-json/delivery_man/v1/profile', config);
        console.log('Profile data:', response.data);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching profile data:', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
          console.log('Response status:', error.response.status);
          Alert.alert('Error', `Request failed with status code ${error.response.status}`);
        } else {
          Alert.alert('Error', 'Network Error. Please check your internet connection.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  // Callback function to handle profile updates
  const handleProfileUpdate = (updatedProfile) => {
    // Update profile state with the updated profile data
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <View style={{justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="#30B0C9" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profile && (
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{profile.user_name}</Text>

          <Text style={styles.label}>Surname:</Text>
          <Text style={styles.text}>{profile.delivery_man_surname}</Text>

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
            style={[mStyle.button, styles.button]}
            onPress={() => navigation.navigate('EditProfile', { profileData: profile, onUpdateProfile: handleProfileUpdate })} >
            <Text style={mStyle.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    fontSize: 17,
    fontWeight: '500',
    color: '#747474',
    marginBottom: 6,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default UserProfileScreen;
