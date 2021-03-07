import React from 'react';
import {StatusBar, View, SafeAreaView, Image, StyleSheet} from 'react-native';
import normalize from '../../Helper/normalize';
import useLayoutAnimation from '../Common/CustomHooks/useLayoutAnimation';
import AuthHeader from './AuthHeader';
import Login from './Login';
import Register from './Register';
import * as Animatable from 'react-native-animatable';

const Auth = ({route, navigation}) => {
  const {isLoginScreen} = route.params;

  const [nothing, LayoutAnimation] = useLayoutAnimation();

  return (
    <SafeAreaView
      style={{
        flex: 1,

        paddingBottom: 30,
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Animatable.View
        animation={'fadeIn'}
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: isLoginScreen ? 56 : 0,
        }}>
        <AuthHeader isLoginScreen={isLoginScreen} />
        {isLoginScreen ? (
          <Login navigation={navigation} />
        ) : (
          <Register navigation={navigation} />
        )}
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  secondary: {
    fontSize: normalize(10),
    textAlign: 'center',
    color: '#D3D3D3',
    fontWeight: '700',
  },
});

export default Auth;
