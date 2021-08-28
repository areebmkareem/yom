import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getStatics} from '../../Store/Actions/Statics';
import AnimateNumber from 'react-native-animate-number';
import {getTotalStaticsData} from '../../Store/reduxSelectors';
import normalize from '../../Helper/normalize';
import {colors} from 'react-native-elements';

const Statics = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStatics());
  }, []);

  const data = useSelector((state) => getTotalStaticsData(state));

  return (
    <View>
      <View>
        <AnimateNumber
          style={styles.value}
          value={data.totalCreditedToAccount}
          countBy={data.totalCreditedToAccount / 5}
          formatter={(val) => {
            return '₹' + parseFloat(val).toFixed(2);
          }}
        />
        <Text style={styles.title}>Total Earned</Text>
      </View>
      <View>
        <AnimateNumber
          style={styles.value}
          value={data.totalTax}
          countBy={data.totalTax / 5}
          formatter={(val) => {
            return '₹' + parseFloat(val).toFixed(2);
          }}
        />
        <Text style={styles.title}>Tax Payed</Text>
      </View>
      <View>
        <AnimateNumber
          style={styles.value}
          value={data.totalCommission}
          countBy={data.totalCommission / 5}
          formatter={(val) => {
            return '₹' + parseFloat(val).toFixed(2);
          }}
        />
        <Text style={styles.title}>Commission</Text>
      </View>
      <View>
        <AnimateNumber
          style={styles.value}
          value={data.totalHours}
          countBy={data.totalHours / 5}
          formatter={(val) => {
            return parseFloat(val).toFixed(2);
          }}
        />
        <Text style={styles.title}>Total Hours</Text>
      </View>
    </View>
  );
};

export default Statics;

const styles = StyleSheet.create({
  title: {
    fontSize: normalize(2.5),
    textAlign: 'center',
    color: colors.grey4,
    fontWeight: '700',
  },
  value: {
    fontSize: normalize(5),
    textAlign: 'center',
    color: colors.black,
    fontWeight: '700',
  },
});
