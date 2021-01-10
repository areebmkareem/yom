import {NativeModules, LayoutAnimation} from 'react-native';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const useLayoutAnimation = () => {
  return [null, LayoutAnimation];
};

export default useLayoutAnimation;
