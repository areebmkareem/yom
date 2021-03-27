import React from 'react';
import {View, Text} from 'react-native';
import normalize from '../../Helper/normalize';
import dayjs from 'dayjs';
import {useFieldArray, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import CustomTextInput from '../Common/CustomTextInput';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {sendInvoice} from '../../Store/Actions/Invoice';

const SendToUsers = ({route, navigation}) => {
  const dispatch = useDispatch();
  const params = route && route.params;
  const {item} = params;
  const {control, register, errors, trigger, getValues} = useForm({
    defaultValues: {
      mailTo: [
        {
          address: '',
        },
      ],
    },
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'mailTo',
  });
  const handleOnSend = async () => {
    try {
      const isValidated = await trigger();
      if (isValidated) {
        const values = getValues();
        const payload = {
          mailTo: values.mailTo.map((item) => item.address),
          ...item,
        };
        let response = await dispatch(sendInvoice(payload));
        navigation.goBack();
      }
    } catch (err) {
      alert('email Send Error');
    }
  };
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => handleOnSend()} title="SEND" color="black" type="clear" />,
    });
  }, [navigation]);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 1}}>
      <View style={{padding: 20, backgroundColor: '#fff', flex: 1}}>
        <Text style={{fontSize: normalize(5), fontWeight: 'bold'}}>{'Mail' + ' ' + '#' + item._id.slice(item._id.length - 5)}</Text>
        <Text style={{fontWeight: 'bold', color: '#696969', fontSize: normalize(8)}}>{dayjs(item.billingDate).format('DD MMM YY')}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 2}}>
            {fields.map((field, index) => (
              <View key={field.id} style={{marginVertical: 10}} style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 2}}>
                  <CustomTextInput
                    textInputProps={{
                      keyboardType: 'email-address',
                    }}
                    required
                    label="Mail To"
                    error={errors.mailTo && errors.mailTo[index]}
                    control={control}
                    name={`mailTo[${index}].address`}
                    defaultValue={field.value}
                  />
                </View>

                <View style={{flex: 0.5, paddingTop: 38.5}}>
                  <Button icon={<Icon name="trash-o" size={25} />} type="clear" onPress={() => remove(index)} />
                </View>
              </View>
            ))}
          </View>
          <View style={{flex: 0.3, padding: 10}}>
            <Button style={{marginTop: 38.5}} icon={<Icon name="plus-circle" size={25} />} type="clear" onPress={() => append({address: ''})} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SendToUsers;
