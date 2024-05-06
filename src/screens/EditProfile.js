import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import mStyle from '../../AppStyles';

const EditProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [surName, setSurName] = useState('');
  const [PhoneNuber, setPhoneNumber] = useState('');
  const [iban, setIban] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [workAddress, setWorkAddress] = useState('');



  const UpdateProfile = async () => {
    setLoading(true);
    // setLoading(true);
    let Data = JSON.stringify({
        user_full_name: firstName,
        delivery_man_surname: surName,
        delivery_man_phone:PhoneNuber,
        delivery_man_iban:iban,
        delivery_man_gender:gender,
        delivery_man_age:age,
        delivery_man_home_address:homeAddress,
        delivery_man_work_address:workAddress
    });
    try {
      const response = await axios.put(
        'https://hotel-project.onrender.com/S-Printer-App/User/Profile/editProfile',
        Data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken?.accessToken}`,

          },
        },
      );
      navigation.goBack()
      setUserToken(response?.data?.Updated_Data);
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data?.Updated_Data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);


    }
  };



  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginHorizontal: 15, marginVertical: 20}}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          keyboardShouldPersistTaps={'handled'}
          extraHeight={140}
          style={{width: '100%', alignSelf: 'center'}}>
          <View style={styles.marginHorizontal}>
            <Text style={styles.label}>FirstName</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={text => setFirstName(text)}
              placeholder={'FirstName'}
            />
            <Text style={styles.label}>SurName</Text>
            <TextInput
              style={styles.input}
              value={surName}
              onChangeText={text => setSurName(text)}
              placeholder={'SurName'}
            />
            <Text style={styles.label}>PhoneNuber</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setPhoneNumber(text)}
              value={PhoneNuber}
              placeholder={'PhoneNumber'}
            />
            <Text style={styles.label}>Iban</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setIban(text)}
              value={iban}
              placeholder={'Iban'}
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
            <Text style={styles.label}>HomeAddress</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setHomeAddress(text)}
              value={homeAddress}
              placeholder={'HomeAddress'}
            />
            <Text style={styles.label}>WorkAddresss</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setWorkAddress(text)}
              value={workAddress}
              placeholder={'Work Address'}
            />

            <TouchableOpacity style={[mStyle.button, {marginTop: 20}]}>
              <Text style={[mStyle.buttonText]}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#23233C',
    marginBottom: 10,
  },
});

export default EditProfile;
