import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Host} from 'react-native-portalize';

import Auth from '../Components/Auth';
import Home from '../Components/Auth/Home';
import Dashboard from '../Components/Dashboard';
import Transactions from '../Components/Transactions';
import NewTransaction from '../Components/NewTransaction';
import CreateTransaction from '../Components/NewTransaction/CreateTransaction';

import TransactionDetails from '../Components/TransactionDetails';
import normalize from '../Helper/normalize';
import {getUserFetchState, getUserInfo} from '../Store/reduxSelectors';
import {useSelector} from 'react-redux';
import SplashScreen from '../Components/Common/SplashScreen';
import VerifyOtp from '../Components/VerifyOtp';
import HeaderRightButton from '../Components/Common/HeaderRightButton';
import HeaderLeftButton from '../Components/Common/HeaderLeftButton';
import CreateBill from '../Components/CreateBill';

const PublicStack = createStackNavigator();
const PrivateStack = createStackNavigator();
const RootStack = createStackNavigator();

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
      name="Transactions"
      component={CreateBill}
      options={{
        headerTitle: false,
        headerTitle: 'Transactions',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: normalize(4),
        },
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerRight: () => <HeaderRightButton />,
        headerLeft: () => <HeaderLeftButton />,
      }}
    />
    <PrivateStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerTitle: false,
        headerTitle: 'Statistics',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: normalize(4),
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
    <PrivateStack.Screen
      name="TransactionDetails"
      component={TransactionDetails}
      options={({route}) => ({
        title: route.params.receiveDetails.fullName,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: normalize(4),
        },
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
      })}
    />
    <PrivateStack.Screen
      name="NewTransaction"
      component={NewTransaction}
      options={({route}) => ({
        title: route.params.title,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: normalize(4),
        },
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
      })}
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
            <RootStack.Navigator
              mode="modal"
              screenOptions={{
                headerShown: false,
                cardStyle: {backgroundColor: 'transparent'},
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({current: {progress}}) => ({
                  cardStyle: {
                    opacity: progress.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: [0, 0.25, 0.7, 1],
                    }),
                  },
                  overlayStyle: {
                    opacity: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.5],
                      extrapolate: 'clamp',
                    }),
                  },
                }),
              }}>
              <RootStack.Screen
                name="Main"
                component={PrivateRoutes}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="MyModal"
                component={CreateTransaction}
                options={{headerShown: false}}
              />
            </RootStack.Navigator>
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
