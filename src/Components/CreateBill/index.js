import React from 'react';
import {View, Text, LayoutAnimation, Dimensions, NativeModules} from 'react-native';
import {Button, Input, CheckBox} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

const errorMessage = 'This Field Required.';
const {width} = Dimensions.get('screen');

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const CreateBill = () => {
  const {control, handleSubmit, getValues, errors, watch, setValue} = useForm({
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
    },
  });

  const watchFields = watch(['totalHours', 'perHourCharge', 'creditedToAccount', 'hasCommission', 'commission']);

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

  const onSubmit = (data) => console.log('data: ', data);

  const getExchangeRate = async () => {
    const response = await fetch(`https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=ca8a685f3cc79423a0a0`);
    const data = await response.json();
    return Number(data && data.USD_INR);
  };

  const calculateTax = () => {
    const {creditedToAccount, subTotalInr} = getValues(['creditedToAccount', 'subTotalInr']);
    console.log('creditedToAccount, subTotalInr: ', creditedToAccount, subTotalInr);
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

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <View>
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

        <Controller control={control} render={({onChange, onBlur, value}) => <CheckBox title="Deduct Commission" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={value} onPress={() => onChange(!value)} />} name="hasCommission" />
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
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default CreateBill;
