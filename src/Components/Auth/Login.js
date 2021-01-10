import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
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
import {signInWithEmailAndPassword} from '../../Store/Actions/Auth';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Login = ({navigation}) => {
  React.useEffect(() => {}, []);

  const dispatch = useDispatch();

  const {getValues, control, trigger, errors} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const result = await trigger();

    if (result) {
      setIsLoading(true);

      const data = getValues();
      const response = await dispatch(signInWithEmailAndPassword(data));
      console.log('response: ', response);
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
          error={errors.email}
          required
          control={control}
          label="Email"
          name="email"
        />
        <CustomTextInput
          editable={!isLoading}
          error={errors.password}
          required
          control={control}
          label="Password"
          name="password"
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingTop: 20,
          }}>
          <CustomButton
            isLoading={isLoading}
            onPress={() => handleLogin()}
            title="Sign In"
          />
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => navigation.push('Register')}
            style={{paddingVertical: 15}}>
            <Text style={styles.secondary}>Register</Text>
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
