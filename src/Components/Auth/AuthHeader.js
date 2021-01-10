import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import normalize from '../../Helper/normalize';

const {width, height} = Dimensions.get('screen');

const SocialLogin = ({title}) => (
  <TouchableOpacity
    style={{
      minHeight: 70,
      minWidth: (width - 50) / 2,
      backgroundColor: '#eee',
      justifyContent: 'center',
      borderRadius: 10,
    }}>
    <Text
      style={{
        fontSize: normalize(3),
        textAlign: 'center',
        fontWeight: '700',
        color: '#000000',
      }}>
      {title}
    </Text>
  </TouchableOpacity>
);
const AuthHeader = ({isLoginScreen}) => {
  return (
    <React.Fragment>
      <View>
        <Text
          style={{
            fontSize: normalize(3),
            textAlign: 'center',
            fontWeight: '700',
            color: '#000000',
          }}>
          {isLoginScreen ? 'Login' : 'Create Account'}
        </Text>
        <Text style={styles.secondary}>Access account</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 30,
        }}>
        <SocialLogin title="G" />
        <SocialLogin title="F" />
      </View>
      <View style={{paddingBottom: 30}}>
        <Text style={styles.secondary}>or Login with Email</Text>
      </View>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  secondary: {
    fontSize: normalize(1.5),
    textAlign: 'center',
    color: '#D3D3D3',
    fontWeight: '700',
  },
});

export default AuthHeader;
