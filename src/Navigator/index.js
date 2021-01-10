import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Host} from 'react-native-portalize';

import Auth from '../Components/Auth';
import Home from '../Components/Auth/Home';
import Dashboard from '../Components/Dashboard';
import normalize from '../Helper/normalize';
import {getUserFetchState, getUserInfo} from '../Store/reduxSelectors';
import {useSelector} from 'react-redux';
import SplashScreen from '../Components/Common/SplashScreen';
import VerifyOtp from '../Components/VerifyOtp';
import HeaderRightButton from '../Components/Common/HeaderRightButton';
import HeaderLeftButton from '../Components/Common/HeaderLeftButton';

const PublicStack = createStackNavigator();
const PrivateStack = createStackNavigator();

const PublicRoutes = () => (
  <PublicStack.Navigator>
    <PublicStack.Screen
      name="Login"
      component={Auth}
      options={{
        headerShown: false,
      }}
      initialParams={{isLoginScreen: true}}
    />
    <PublicStack.Screen
      name="Register"
      component={Auth}
      options={{
        headerTitle: false,
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
      }}
      initialParams={{isLogin: false}}
    />
  </PublicStack.Navigator>
);

const PrivateRoutes = () => (
  <PrivateStack.Navigator>
    <PrivateStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerTitle: false,
        headerTitle: 'Statistics',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: normalize(5),
        },
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerRight: () => <HeaderRightButton />,
        headerLeft: () => <HeaderLeftButton />,
      }}
      initialParams={{isLoginScreen: true}}
    />
  </PrivateStack.Navigator>
);

function Navigator() {
  const userInfo = useSelector((state) => getUserInfo(state));

  const isUserInfoFetching = useSelector((state) => getUserFetchState(state));

  return (
    <NavigationContainer>
      <Host>
        {isUserInfoFetching ? (
          <SplashScreen />
        ) : userInfo && userInfo._id ? (
          userInfo.isEmailVerified ? (
            <PrivateRoutes />
          ) : (
            <VerifyOtp />
          )
        ) : (
          <PublicRoutes />
        )}
      </Host>
    </NavigationContainer>
  );
}

export default Navigator;
