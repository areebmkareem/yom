import React from 'react';
import {View, Text, LayoutAnimation, Dimensions, NativeModules, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button, Input, CheckBox} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {createInvoice} from '../../Store/Actions/Invoice';
import normalize from '../../Helper/normalize';
Icon.loadFont();

const errorMessage = 'This Field Required.';
const {width} = Dimensions.get('screen');

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const CreateBill = ({navigation}) => {
  const dispatch = useDispatch();

  const {control, handleSubmit, getValues, errors, watch, setValue, register} = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      totalHours: '',
      perHourCharge: '',
      subtotal: '',
      subTotalInr: '',
      tax: '',
      creditedToAccount: '',
      taxInPercentage: '',
      hasCommission: false,
      commissionInInr: '',
      commission: '',
      currentDollarRate: '',
      billingDate: new Date(),
    },
  });

  React.useEffect(() => {
    register('currentDollarRate');
    register('billingDate');
  }, [register]);

  const watchFields = watch(['totalHours', 'perHourCharge', 'creditedToAccount', 'hasCommission', 'commission', 'billingDate']);
  console.log('watchFields: ', watchFields);

  React.useEffect(() => {
    calculateSubTotal();
  }, [watchFields.totalHours, watchFields.perHourCharge]);

  React.useEffect(() => {
    calculateTax();
  }, [watchFields.creditedToAccount]);
  React.useEffect(() => {
    const {commission, creditedToAccount, tax} = getValues(['commission', 'creditedToAccount', 'tax']);
    if (isNaN(commission)) return;
    setValue('commissionInInr', String((((creditedToAccount - tax) / 100) * commission).toFixed(2)));
  }, [watchFields.commission]);

  const getExchangeRate = async () => {
    const response = await fetch(`https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=ca8a685f3cc79423a0a0`);
    const data = await response.json();
    setValue('currentDollarRate', data && data.USD_INR);
    return Number(data && data.USD_INR);
  };

  const calculateTax = () => {
    const {creditedToAccount, subTotalInr} = getValues(['creditedToAccount', 'subTotalInr']);

    const tax = (Number(subTotalInr) - Number(creditedToAccount)).toFixed(2);
    if (isNaN(tax)) return;
    else {
      setValue('tax', String(tax));
      if (isNaN(tax / subTotalInr)) return;
      else setValue('taxInPercentage', String(((tax / subTotalInr) * 100).toFixed(2)));
    }
  };

  const calculateSubTotal = async () => {
    const {totalHours, perHourCharge} = getValues(['totalHours', 'perHourCharge']);

    if (isNaN(totalHours) || isNaN(perHourCharge)) return;
    else if (totalHours > 0 && perHourCharge > 0) {
      let subtotal = (perHourCharge * totalHours).toFixed(2);
      setValue('subtotal', String(subtotal));
      const oneDollarInInr = await getExchangeRate();
      setValue('subTotalInr', String((subtotal * oneDollarInInr).toFixed(2)));
    }
  };

  React.useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  });

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      await dispatch(createInvoice(data));
      setIsloading(false);
      navigation.goBack();
    } catch (err) {
      setIsloading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView style={{flex: 1, position: 'relative'}}>
        <View style={{backgroundColor: '#fff', paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Button disabled={isLoading} onPress={() => navigation.goBack()} containerStyle={{borderRadius: 100}} icon={<Icon name="arrow-left" size={15} color="#000000" />} type="clear" titleStyle={{color: '#000000'}} />

          <Button
            loading={isLoading}
            loadingProps={{
              color: '#000000',
            }}
            title="Save"
            type="clear"
            titleStyle={{color: '#000000'}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <Text style={{fontWeight: 'bold', color: '#696969', fontSize: normalize(8)}}>Create Invoice</Text>
        </View>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
          <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
            <View>
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Input editable={false} leftIcon={{type: 'font-awesome', name: 'calendar'}} label="Date" placeholder="Enter Billing Date" value={watchFields && watchFields.billingDate ? dayjs(watchFields && watchFields.billingDate).format('DD MMM YY ') : ''} keyboardType="decimal-pad" errorMessage={errors.billingDate && errorMessage} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    onTouchCancel={() => setShowDatePicker(false)}
                    testID="dateTimePicker"
                    value={(watchFields && watchFields.billingDate) || new Date()}
                    mode={'date'}
                    display="default"
                    onChange={(event, selectedDate) => {
                      setValue('billingDate', selectedDate);
                      setShowDatePicker(false);
                    }}
                  />
                )}
              </>

              <Controller control={control} render={({onChange, onBlur, value}) => <Input leftIcon={{type: 'font-awesome', name: 'clock-o'}} label="Total Hours" placeholder="Enter Total Hours" value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.totalHours && errorMessage} />} name="totalHours" rules={{required: true, valueAsNumber: true}} />

              <Controller control={control} render={({onChange, onBlur, value}) => <Input label="Per Hour Charge" leftIcon={{type: 'font-awesome', name: 'usd'}} placeholder="Enter Dollar Per Hour" value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.perHourCharge && errorMessage} />} name="perHourCharge" rules={{required: true, valueAsNumber: true}} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <View style={{flex: 1}}>
                  <Controller control={control} render={({onChange, onBlur, value}) => <Input label="Subotal" leftIcon={{type: 'font-awesome', name: 'usd'}} value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.perHourCharge && errorMessage} />} name="subtotal" rules={{required: true, valueAsNumber: true}} />
                </View>
                <View style={{flex: 1}}>
                  <Controller control={control} render={({onChange, onBlur, value}) => <Input label="  " leftIcon={{type: 'font-awesome', name: 'inr'}} value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.perHourCharge && errorMessage} />} name="subTotalInr" rules={{required: true, valueAsNumber: true}} />
                </View>
              </View>
              <Controller control={control} render={({onChange, onBlur, value}) => <Input label="Credited To Account" leftIcon={{type: 'font-awesome', name: 'inr'}} placeholder="Enter Amount Credited To Account" value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.perHourCharge && errorMessage} />} name="creditedToAccount" rules={{required: true, valueAsNumber: true}} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <View style={{flex: 2}}>
                  <Controller control={control} render={({onChange, onBlur, value}) => <Input label="Tax (Sub Total - Credited)" leftIcon={{type: 'font-awesome', name: 'inr'}} placeholder="Tax Deducted From Sub Total" value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.perHourCharge && errorMessage} />} name="tax" rules={{required: true, valueAsNumber: true}} />
                </View>
                <View style={{flex: 1}}>
                  <Controller control={control} render={({onChange, onBlur, value}) => <Input label="   " leftIcon={{type: 'font-awesome', name: 'percent'}} value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.perHourCharge && errorMessage} />} name="taxInPercentage" rules={{required: true, valueAsNumber: true}} />
                </View>
              </View>

              <Controller control={control} render={({onChange, onBlur, value}) => <CheckBox checkedColor="black" title="Deduct Commission" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={value} onPress={() => onChange(!value)} />} name="hasCommission" />
              {watchFields.hasCommission && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    paddingTop: 25,
                  }}>
                  <View style={{flex: 1}}>
                    <Controller control={control} render={({onChange, onBlur, value}) => <Input label="Commission" leftIcon={{type: 'font-awesome', name: 'percent'}} value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.perHourCharge && errorMessage} />} name="commission" rules={{required: true, valueAsNumber: true}} />
                  </View>
                  <View style={{flex: 2}}>
                    <Controller control={control} render={({onChange, onBlur, value}) => <Input label="(Credited To Acc - Tax)" leftIcon={{type: 'font-awesome', name: 'inr'}} placeholder="Tax Deducted From Sub Total" value={value} onChangeText={onChange} keyboardType="decimal-pad" errorMessage={errors.perHourCharge && errorMessage} />} name="commissionInInr" rules={{required: true, valueAsNumber: true}} />
                  </View>
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* <View >
          <CustomButton title="Create" onPress={handleSubmit(onSubmit)} />
        </View> */}
      </SafeAreaView>
    </View>
  );
};

export default CreateBill;
