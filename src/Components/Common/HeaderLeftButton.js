import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';

import {useSelector} from 'react-redux';

import normalize from '../../Helper/normalize';
import {getUserInfo} from '../../Store/reduxSelectors';

const HeaderLeftButton = () => {
  const userInfo = useSelector((state) => getUserInfo(state));
  return (
    <View style={{paddingHorizontal: 10}}>
      <TouchableOpacity
        style={{
          // backgroundColor: 'red',
          width: 35,
          height: 35,
          borderRadius: 35 / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          source={require('../../Assets/Images/menu-bar.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeftButton;
