import React from 'react';
import {TouchableOpacity, ActivityIndicator, Text} from 'react-native';

const getVariantStyles = {
  outlined: {
    backgroundColor: '#fff',
    borderColor: '#696969',
    borderWidth: 2,
  },
};

const CustomButton = ({title, variant, onPress, isLoading, disabled}) => {
  const textColor = variant === 'outlined' ? '#696969' : '#fff';

  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: '#696969',
        minHeight: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        ...(getVariantStyles[variant] || {}),
      }}>
      <Text
        style={{
          fontWeight: '700',
          color: textColor,
        }}>
        {isLoading ? <ActivityIndicator color={textColor} /> : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
