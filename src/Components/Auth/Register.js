import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import normalize from '../../Helper/normalize';
import CustomTextInput from '../Common/CustomTextInput';
import CustomButton from '../Common/CustomButton';
import {signUpUserWithCredentials} from '../../Store/Actions/Auth';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Login = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const {getValues, control, trigger, errors} = useForm({
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
    },
  });

  const handleCreateUser = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const result = await trigger();
    if (result) {
      setIsLoading(true);

      const data = getValues();
      const response = await dispatch(signUpUserWithCredentials(data));
      if (response.error) setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <CustomTextInput
          editable={!isLoading}
          control={control}
          required
          label="Full Name"
          name="fullName"
          error={errors.fullName}
        />

        <CustomTextInput
          editable={!isLoading}
          control={control}
          required
          label="User Name"
          name="userName"
          error={errors.userName}
        />

        <CustomTextInput
          editable={!isLoading}
          control={control}
          required
          label="Email"
          name="email"
          error={errors.email}
        />

        <CustomTextInput
          editable={!isLoading}
          control={control}
          required
          label="Password"
          name="password"
          error={errors.password}
          // textInputProps={{
          //   textContentType: 'password',
          // }}
        />
        <View
          style={{
            flex: 1,
            paddingTop: 30,
          }}>
          <CustomButton
            isLoading={isLoading}
            title="Register"
            onPress={() => handleCreateUser()}
          />
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => navigation.goBack()}
            style={{paddingVertical: 15}}>
            <Text style={styles.secondary}>Already Member? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondary: {
    fontSize: normalize(1.5),
    textAlign: 'center',
    color: '#D3D3D3',
    fontWeight: '700',
  },
});

export default Login;
