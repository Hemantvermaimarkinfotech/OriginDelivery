

// constants.js
// export const GLOBAL_FONT_FAMILY = 'ProtestRiot-Regular';


import { Platform } from 'react-native';

export const GLOBAL_FONT_FAMILY = Platform.select({
  ios: 'ProtestRiot-Regular',
  android: 'ProtestRiot-Regular',
  default: 'ProtestRiot-Regular',
});