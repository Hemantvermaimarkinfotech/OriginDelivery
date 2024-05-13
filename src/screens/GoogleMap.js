import React,{useEffect} from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

const GoogleMap = () => {
    const route = useRoute();

    useEffect(() => {
      // Get coordinates from route params
      const { latitude, longitude } = route.params;
  
      // Form the URL for Google Maps with the coordinates
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  
      // Open Google Maps with the coordinates
      Linking.openURL(url);
    }, [route]);
  
    // No need to render anything in this page
    return null;
  };

export default GoogleMap ;
