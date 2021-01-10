import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {Controller} from 'react-hook-form';
import normalize from '../../Helper/normalize';

const errorStyles = {
  borderColor: 'red',
  borderWidth: 2,
};
const CustomTextInput = ({
  name = 'test',
  error,
  defaultValue = '',
  required = true,
  rootStyles = {},
  editable = true,
  label,
  control,
  textInputProps = {},
}) => {
  return (
    <View style={{...rootStyles}}>
      {label && (
        <Text
          style={{
            paddingVertical: 10,
            fontSize: normalize(1.8),
            fontWeight: '700',
            color: '#000000',
          }}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            editable={editable}
            style={[
              {
                backgroundColor: '#eee',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                minHeight: 50,
                fontWeight: '500',
                color: '#696969',
              },
              error
                ? errorStyles
                : {
                    borderWidth: 2,
                    borderColor: '#eee',
                  },
            ]}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            {...textInputProps}
          />
        )}
        name={name}
        rules={{required}}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default CustomTextInput;
