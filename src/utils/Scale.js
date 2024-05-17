import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const guidelineBaseWidth = 372;
const guidelineBaseHeight = 812;
const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;

const Inset_Bottom = () => {
  const {bottom} = useSafeAreaInsets();
  return bottom > 0;
};

export {scale, scaleVertical, Inset_Bottom};
