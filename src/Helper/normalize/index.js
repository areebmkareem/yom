import {PixelRatio, Dimensions} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const normalize = (size) => RFPercentage(size);

export default normalize;
