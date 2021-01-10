import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {useSelector} from 'react-redux';

import normalize from '../../Helper/normalize';
import {getUserInfo} from '../../Store/reduxSelectors';

const HeaderRightButton = () => {
  const userInfo = useSelector((state) => getUserInfo(state));
  return (
    <View style={{paddingHorizontal: 10}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'grey',
          width: 35,
          height: 35,
          borderRadius: 35 / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: '700',
            color: '#fff',
            fontSize: normalize(2),
            textTransform: 'capitalize',
          }}>
          {userInfo.fullName[0]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightButton;
