import React from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {getUserInfo} from '../../Store/reduxSelectors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';

import CustomButton from '../Common/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {verifyOtp, logout} from '../../Store/Actions/Auth';

const CELL_COUNT = 4;

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => getUserInfo(state));

  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleVerifyOtp = async () => {
    if (value.length !== CELL_COUNT) return setError(true);
    else setError(false);
    setIsLoading(true);
    const response = await dispatch(verifyOtp({otp: value}));
    if (response.error) setIsLoading(false);
  };
  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Animatable.View animation={'fadeIn'} style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: RFPercentage(6),
                }}>
                Verification Code
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: RFPercentage(2),
                  color: '#D3D3D3',
                }}>
                {` Please type the verification code sent to ${userInfo.email}`}
              </Text>
            </View>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              <CodeField
                editable={!isLoading}
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[
                      styles.cell,
                      isFocused && styles.focusCell,
                      error ? {borderColor: 'red'} : {},
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
            <View style={{flex: 1}}>
              <CustomButton
                isLoading={isLoading}
                onPress={() => handleVerifyOtp()}
                title="Verify"
              />
              <View style={{paddingVertical: 20}}>
                <CustomButton
                  variant="outlined"
                  disabled={isLoading}
                  onPress={() => dispatch(logout())}
                  title="Logout"
                />
              </View>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {},
  cell: {
    width: 55,
    height: 80,
    // lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#D3D3D3',
    textAlign: 'center',
    textAlignVertical: 'center',
    // backgroundColor: '#D3D3D3',
    color: '#696969',
  },
  focusCell: {
    borderColor: '#696969',
  },
});
