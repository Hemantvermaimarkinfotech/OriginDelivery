// src/screens/LoginScreen.js
import React,{useState,useContext} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import { AuthContext } from '../components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const {userToken, setUserToken} = useContext(AuthContext);

  const Logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userData');
  };
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={{flex:1}}>
      {/* <Text>SettingScreen </Text> */}
<View style={{marginHorizontal:15,marginVertical:10}}>
<TouchableOpacity onPress={() => Logout()}>
          {/* <MaterialIcons name="exit-to-app" size={24} color={'#000'} /> */}
          <Text style={{fontSize:20,fontWeight:600}}>Logout</Text>
        </TouchableOpacity>
</View>
   
  
    </View>
  );
};

export default SettingScreen;
