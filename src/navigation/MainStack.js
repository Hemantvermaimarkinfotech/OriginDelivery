// src/navigation/MainStack.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import MainHeader from '../components/MainHeader';

import SplashScreen from '../screens/Splash';
import GetStartedScreen from '../screens/GetStarted';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import PayoutScreen from '../screens/Payout';
import TrackingScreen from '../screens/Tracking';
import SettingScreen from '../screens/Setting';
import UserProfileScreen from '../screens/UserProfile';
import colors from '../utils/Colors';
import TrackingStatusScreen from '../screens/TrackingStatus';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import MapRouteScreen from '../screens/MapRoute';
import TitleHeader from '../components/TitleHeader';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    {/* <Stack.Screen name="Subpage1" component={Subpage1Screen} />
    <Stack.Screen name="Subpage2" component={Subpage2Screen} /> */}
  </Stack.Navigator>
);

const PayoutStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Payout" component={PayoutScreen} options={{ headerShown: false }} />
    {/* Add more screens for Payout subpages if needed */}
  </Stack.Navigator>
);

const TrackingStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tracking" component={TrackingScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="TrackingStatus" component={TrackingStatusScreen} options={{ headerShown: false }}/>
    {/* Add more screens for Tracking subpages if needed */}
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
    {/* Add more screens for Setting subpages if needed */}
  </Stack.Navigator>
);



const BottomTabsNavigator = ({ navigation }) => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarStyle: {
          backgroundColor: 'white', // Set background color here
          borderWidth: 0,
          shadowColor: colors.shadowColor, // Add shadow color
          shadowOpacity: 0.25, // Adjust shadow opacity as needed
          shadowRadius: 2, // Adjust shadow radius as needed
          elevation: 5, // Android only, adjust elevation as needed
        },
      }}>

      <Tab.Screen name="Home" component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/iconImages/home.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? colors.primary : colors.black,
                }}
              />
              <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Home</Text>
            </View>
          ),
          tabBarLabel: () => null,
          headerStyle: {
            height: 120, // Set the desired height value
            shadowColor: '#fff',
          },
          // headerTitle: (props) => <TopHeader />
          header: () => <MainHeader title="Home" navigation={navigation} />, // Custom header component
        }}/>

      <Tab.Screen name="Payout" component={PayoutStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/iconImages/income.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? colors.primary : colors.black,
                }}
              />
              <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Payout</Text>
            </View>
          ),
          tabBarLabel: () => null,
          headerStyle: {
            height: 120, // Set the desired height value
            shadowColor: '#fff',
          },
          // headerTitle: (props) => <TopHeader />
          header: () => <TitleHeader title="Payout" navigation={navigation} />, // Custom header component
        }}/>

      <Tab.Screen name="Tracking" component={TrackingStack}
        options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../assets/images/iconImages/order-tracking.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    tintColor: focused ? colors.primary : colors.black,
                  }}
                />
                <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Tracking</Text>
              </View>
            ),
            tabBarLabel: () => null,
            headerStyle: {
              height: 120, // Set the desired height value
              shadowColor: '#fff',
            },
            // headerTitle: (props) => <TopHeader />
            header: () => <TitleHeader title="Tracking" navigation={navigation} />, // Custom header component
        }}/>

      <Tab.Screen name="Settings" component={SettingsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/iconImages/setting.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? colors.primary : colors.black,
                }}
              />
              <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Settings</Text>
            </View>
          ),
          tabBarLabel: () => null,
          headerStyle: {
            height: 120, // Set the desired height value
            shadowColor: '#fff',
          },
          // headerTitle: (props) => <TopHeader />
          header: () => <TitleHeader title="Settings" navigation={navigation} />, // Custom header component
        }}/>
        
    </Tab.Navigator>
);

// userAvatarIcon orderIcon orderTracking2Icon income2Icon logoutIcon


const CustomDrawerContent = ({ navigation }) => {
  return (
    <>
    <SafeAreaView style={{backgroundColor: colors.white}} />
    <View style={{ flex: 1, marginHorizontal: 15 }}>
      {/* Drawer Header */}
      <View style={mStyle.drawerHeaderContainer}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Image source={ImagePaths.menuIcon} style={[mStyle.drawerIcon, {marginTop: 10}]} />
        </TouchableOpacity>
      </View>

      {/* Drawer Items */}
      <TouchableOpacity style={mStyle.drawerButton} onPress={() => navigation.navigate('UserProfile')}>        
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.userAvatarIcon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Profile</Text>
      </TouchableOpacity>
  

      <TouchableOpacity style={mStyle.drawerButton} onPress={() => navigation.navigate('Tracking')}>
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.orderIcon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={mStyle.drawerButton} onPress={() => navigation.navigate('Tracking')}>
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.orderTracking2Icon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Tracking</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={mStyle.drawerButton} onPress={() => navigation.navigate('Payout')}>
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.income2Icon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Payout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={mStyle.drawerButton} onPress={() => {}}>
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.logoutIcon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Logout</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};


const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="DrawerBottomTabs"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerStyle={{
      width: '80%', // Adjust the width of the drawer as needed
    }}
    >
    <Drawer.Screen name="DrawerBottomTabs" component={BottomTabsNavigator} options={{ headerShown: false }}/>
      {/* Add more screens for Drawer if needed */}

      {/* <Drawer.Screen  name="Homee" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen  name="Homeee" component={HomeScreen} options={{ headerShown: false }} /> */}
  </Drawer.Navigator>
);





const MainStack = () => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">


      <Stack.Screen name="UserProfile" component={UserProfileScreen} 
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#30B0C9', // Change the background color
          },
          headerTitleStyle: {
            color: '#fff', // Change the text color
          },
          header: () => <TitleHeader title="Profile" navigation={navigation} />, 
        }}/>

      <Stack.Screen name="MapRoute" component={MapRouteScreen} 
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent', // Change the background color
          },
          headerTitleStyle: {
            color: '#fff', // Change the text color
          },
          // header: () => <TitleHeader title="" navigation={navigation} />, 
          // headerLeft: () => (
          //   <TouchableOpacity
          //     style={{ marginLeft: 10 }}
          //     onPress={() => navigation.goBack()}
          //   >
          //     <Text style={{ color: 'black', fontSize: 20, fontWeight: '600' }}>Back</Text>
          //   </TouchableOpacity>
          // ),
        }} />

      {/* <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} options={{ headerShown: false }} />  */}
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />

    </Stack.Navigator>
  );

};

export default MainStack;