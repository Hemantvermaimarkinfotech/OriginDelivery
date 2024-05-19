// import React, { useState, useContext } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
// import { AuthContext } from '../components/AuthProvider';
// import axios from "react-native-axios"
// import mStyle from '../../AppStyles';
// import Loader from '../components/Loader';

// const UpdateProfile = ({ navigation }) => {
//   const { userToken } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("mohammad.sameer@imarkinfotech.com");
//   const [userName, setUserName] = useState("sameerrr");
//   const [userFullName, setUserFullName] = useState("sameer star");
//   const [surName, setSurName] = useState("star");
//   const [phoneNumber, setPhoneNumber] = useState("66786786786");
//   const [iban, setIban] = useState("JGHDYB7866hTHR");
//   const [gender, setGender] = useState("Male");
//   const [age, setAge] = useState("20");
//   const [homeAddress, setHomeAddress] = useState("Malerkotla");
//   const [workAddress, setWorkAddress] = useState("Chandigarh");

//   const UpdateProfile = async () => {
//     setLoading(true);
//     const userData = {
//       email: email,
//       user_name: userName,
//       user_full_name: userFullName,
//       delivery_man_surname: surName,
//       delivery_man_phone: phoneNumber,
//       delivery_man_iban: iban,
//       delivery_man_gender: gender,
//       delivery_man_age: age,
//       delivery_man_home_address: homeAddress,
//       delivery_man_work_address: workAddress
//     };

//     try {
//       const response = await axios.post(
//         'https://staging11.originmattress.com.sg/wp-json/delivery-man/v1/update',
//         userData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${userToken?.token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         console.log('Success', response.data.message)
//         Alert.alert('Success', response.data.message);
//         navigation.goBack();
//       } else {
//         Alert.alert('Error', response.data.message);
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       Alert.alert('Error', 'Failed to update profile. Please try again.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={text => setEmail(text)}
//         placeholder={'Email'}
//         placeholderTextColor={"#23233C"}
//         color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={userName}
//         onChangeText={text => setUserName(text)}
//         placeholder={'User Name'}
//         placeholderTextColor={"#23233C"}
//         color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={userFullName}
//         onChangeText={text => setUserFullName(text)}
//         placeholder={'User Full Name'}
//         placeholderTextColor={"#23233C"}
//         color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={surName}
//         onChangeText={text => setSurName(text)}
//         placeholder={'Surname'}
//         placeholderTextColor={"#23233C"}
//         color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={phoneNumber}
//         onChangeText={text => setPhoneNumber(text)}
//         placeholder={'Phone Number'}
//         placeholderTextColor={"#23233C"}
//         color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={iban}
//         onChangeText={text => setIban(text)}
//         placeholder={'IBAN'}
//         placeholderTextColor={"#23233C"}
//         color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={gender}
//         onChangeText={text => setGender(text)}
//         placeholder={'Gender'}
//         placeholderTextColor={"#23233C"}
//         color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={age}
//         onChangeText={text => setAge(text)}
//         placeholder={'Age'}
//         placeholderTextColor={"#23233C"}
//         color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={homeAddress}
//         onChangeText={text => setHomeAddress(text)}
//         placeholder={'Home Address'}
//         placeholderTextColor={"#23233C"}
//       color={"#23233C"}
//       />
//       <TextInput
//         style={styles.input}
//         value={workAddress}
//         onChangeText={text => setWorkAddress(text)}
//         placeholder={'Work Address'}
//         placeholderTextColor={"#23233C"}
//       color={"#23233C"}
//       />

//        {loading?
//        <Loader/>:(
//         <TouchableOpacity style={[mStyle.button,{width:"90%",marginVertical:20}]} onPress={UpdateProfile}>
//         <Text style={mStyle.buttonText}>Update Profile</Text>
//       </TouchableOpacity>
//        )}

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:"#fff",
//     paddingBottom:20
//   },
//   input: {
//     width: '90%',
//     height: 55,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#DEDEDE',
//     borderRadius: 5,
//     paddingLeft: 10,

//   },
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 20,
//     width:"90%"
//   },
// });

// export default UpdateProfile;

// src/screens/LoginScreen.js
import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
// import mStyle from '../../AppStyles';
import CreateUserInput from '../components/CreateUserInput';
import TitleHeader from '../components/TitleHeader';
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from 'react-native';
import {scale} from '../utils/Scale';
import {FontName} from '../utils/globalFonts';
import DropDownPicker from 'react-native-dropdown-picker';
const {Bold, Medium, SemiBold, Regular} = FontName;
import colors from '../utils/Colors';
import mStyle from '../../AppStyles';
import {AuthContext} from '../components/AuthProvider';
import axios from 'react-native-axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../components/Loader';

const UpdateProfile = ({navigation,route}) => {
  const { profile } = route.params;
  console.log("Profile",profile)
 
  const [firstName, setFirstName] = useState(profile?.user_full_name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [surName, setSurName] = useState(profile?.delivery_man_surname || '');
  const [number, setNumber] = useState(profile?.delivery_man_phone || '');
  const [age, setAge] = useState(profile?.delivery_man_age || '');
  const [userName, setUserName] = useState(profile?.user_name || '');
  const [Iban, setIban] = useState(profile?.delivery_man_iban || '');
  const [workdaddress, setWorkAddress] = useState(profile?.delivery_man_work_address || '');
  const [homeaddress, setHomeAddress] = useState(profile?.delivery_man_home_address || '');
  const [isVisible, setIsVisible] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userFullName, setUserFullName] = useState(profile?.user_full_name || '');
  const [opengender, setOpenGender] = useState(false);
  const [gendervalue, setGenderValue] = useState(profile?.delivery_man_gender || null);
  const [genderitems, setGenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ]);

  useEffect(() => {
    console.log('Profile data received:', profile);
  }, [profile]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const validateForm = () => {
    if (
      firstName.trim() === '' ||
      email.trim() === '' ||
      subject.trim() === '' ||
      message.trim() === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    } else if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', {
        firstName,
        email,
        subject,
        message,
      });
      toggleModal();
    }
  };
  const calculateAge = selectedDate => {
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

    const EditProfile = async () => {
    setLoading(true);
    const userData = {
      user_name: userName,
      user_full_name: userFullName,
      delivery_man_surname: surName,
      email: email,
      delivery_man_phone: number,
      delivery_man_iban: Iban,
      delivery_man_age: age,
      delivery_man_gender: gendervalue,
      delivery_man_home_address: homeaddress,
      delivery_man_work_address: workdaddress
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
    <>
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        {/* <TitleHeader title={'Edit Profile'} navigation={navigation} /> */}
        <View />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          keyboardShouldPersistTaps={'handled'}
          extraHeight={140}
          style={{width: '95%', alignSelf: 'center'}}>
          <View style={styles.marginHorizontal}>
          <CreateUserInput
              inputHeader={'Name'}
              value={userName}
              onChangeText={text => setUserName(text)}
              placeholder={'Write'}
              color={'#23233C'}
            />

            <CreateUserInput
              inputHeader={'Full Name'}
              value={userFullName}
              onChangeText={text => setUserFullName(text)}
              placeholder={'Write'}
              color={'#23233C'}
            />

            <CreateUserInput
              inputHeader={'Surname'}
              onChangeText={text => setSurName(text)}
              value={surName}
              placeholder={'Write'}
            />

            <CreateUserInput
              inputHeader={'Mail'}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder={'Write'}
            />

            <CreateUserInput
              inputHeader={'Phone Number'}
              onChangeText={text => setNumber(text)}
              value={number}
              placeholder={'Write'}
            />

            <CreateUserInput
              inputHeader={'Iban'}
              onChangeText={text => setIban(text)}
              value={Iban}
              placeholder={'Write'}
            />

            <Text
              style={[
                styles.label,
                {marginTop: 10, marginBottom: -11, color: colors.secondary},
              ]}>
              {(inputHeader = 'Age')}
            </Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setOpenDatePicker(true)}>
              <Text style={styles.datePickerText}>{age}</Text>
              <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                <AntDesign name="calendar" size={22} color={'gray'} />
              </TouchableOpacity>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={openDatePicker}
              date={date}
              onConfirm={selectedDate => {
                setOpenDatePicker(false);
                setDate(selectedDate);
                const calculatedAge = calculateAge(selectedDate);
                setAge(calculatedAge.toString());
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />

            <Text
              style={[
                styles.label,
                {marginTop: 25, marginBottom: -11, color: colors.secondary},
              ]}>
              {(inputHeader = 'Gender')}
            </Text>
            <DropDownPicker
              open={opengender}
              value={gendervalue}
              items={genderitems}
              setOpen={setOpenGender}
              setValue={setGenderValue}
              setItems={setGenderItems}
              placeholder={'--choose--'}
              dropDownDirection={'BOTTOM'}
              showTickIcon={false}
              style={styles.firstDropDown}
              arrowIconStyle={styles.placeHolderIcon}
              placeholderStyle={styles.placeHolderDropDown}
              dropDownContainerStyle={styles.firstDropDownOption}
            />

            <CreateUserInput
              inputHeader={'Home Address'}
              onChangeText={text => setHomeAddress(text)}
              value={homeaddress}
              placeholder={'Write'}
            />

            <CreateUserInput
              inputHeader={'Work Address'}
              onChangeText={text => setWorkAddress(text)}
              value={workdaddress}
              placeholder={'Write'}
            />

           {loading?
           <Loader/>:(
            <TouchableOpacity onPress={EditProfile}
            style={[mStyle.button, styles.button, {marginBottom: 40}]}>
            <Text style={mStyle.buttonText}>Save</Text>
          </TouchableOpacity>
           )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {},
  subLabel: {
    fontSize: 18,
    fontWeight: 500,
  },
  continueButton: {
    backgroundColor: '#30B0C9',
    minHeight: 55,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  continueButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 250,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#30B0C9',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  modalText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#30B0C9',
    minHeight: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 200,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  firstDropDown: {
    borderColor: '#DEDEDE',
    borderWidth: 1.2,
    zIndex: 2,
    marginTop: 20,
    height: 60,
  },
  firstDropDownOption: {
    borderWidth: 1.2,
    borderRadius: scale(8),
    borderStartStartRadius: scale(8),
    borderStartEndRadius: scale(8),
    borderColor: 'transparent',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    backgroundColor: '#fff',
    borderColor: '#DEDEDE',
  },
  dropDownView: {zIndex: 2, marginTop: scale(26)},
  dropDownView1: {zIndex: 1, marginTop: scale(22), marginBottom: scale(26)},
  dropDownView2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  width: {width: scale(133)},
  secondDropDown: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  placeHolderDropDown: {
    color: 'gray',
    fontSize: scale(14),
    fontFamily: Medium,
  },
  placeHolderIcon: {tintColor: '#1E84B3', height: 28, width: 28},
  label: {
    fontSize: scale(16),
    fontFamily: FontName.SemiBold,
  },
  mandatoryField: {color: colors.red},
  label: {
    fontSize: scale(16),
    fontFamily: FontName.SemiBold,
    marginBottom: scale(6),
  },
  datePickerButton: {
    flexDirection: 'row',
    borderColor: '#DEDEDE',
    borderWidth: 1.2,
    zIndex: 2,
    marginTop: 20,
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 16,
    fontFamily: FontName.Regular,
  },
  ageText: {
    fontSize: 16,
    // Add any additional styles for the age text
  },
  calendarIcon: {
    width: 24,
    height: 24,
    // Add any additional styles for the calendar icon
  },
});

export default UpdateProfile;
