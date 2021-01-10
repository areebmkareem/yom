import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
const SplashScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: RFPercentage(18)}}>
          YOM
        </Text>
        <View style={{padding: 20}}>
          <ActivityIndicator size={30} color="#000000" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
