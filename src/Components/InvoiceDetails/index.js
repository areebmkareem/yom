import React from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, ListItem, Button} from 'react-native-elements';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getInvoices} from '../../Store/Actions/Invoice';
import {getInvoiceList} from '../../Store/reduxSelectors';
import normalize from '../../Helper/normalize';

Icon.loadFont();

const ItemView = ({label, value, textStyles = {}}) => (
  <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 20}}>
    <Text style={[{fontSize: normalize(2), fontWeight: 'bold'}, textStyles]}>{label}</Text>
    <Text style={[{fontSize: normalize(2), fontWeight: 'bold'}, textStyles]}>{value}</Text>
  </View>
);

const InvoiceDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const params = route && route.params;
  const {item} = params;

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => navigation.push('SendToUsers', {item})} title="CONTINUE" color="black" type="clear" />,
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <ScrollView bounces={false} showsHorizontalScrollIndicator={false}>
        <View>
          <Text style={{fontWeight: 'bold', color: '#696969', fontSize: normalize(8)}}>{dayjs(item.billingDate).format('DD MMM YY')}</Text>
        </View>

        <View style={{paddingVertical: 50, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: normalize(6)}}>{`₹${item.creditedToAccount}`}</Text>
          </View>
        </View>

        <View>
          <ItemView label="Invoice" value={'#' + item._id.slice(item._id.length - 5)} />
          <ItemView label="Total Hours" value={item.totalHours} />
          <ItemView label="Per Hour" value={`$${item.perHourCharge}`} />
          <ItemView label="Dollar Rate" value={`₹${item.currentDollarRate.toFixed(2)}`} />
          <ItemView label="Subtotal" value={`₹${item.subTotalInr} ($${item.subtotal})`} />
        </View>
        <View style={{paddingVertical: 20}}>
          <ItemView
            textStyles={{
              color: '#696969',
            }}
            label="Tax"
            value={`₹${item.tax}(${item.taxInPercentage}%)`}
          />
          <ItemView
            textStyles={{
              color: '#696969',
            }}
            label="Commission"
            value={`₹${item.commissionInInr || 0}(${item.commission || 0}%)`}
          />
        </View>
        <View>
          <ItemView
            textStyles={{
              fontSize: normalize(2.5),
            }}
            label="Total"
            value={`₹${item.subTotalInr - (item.tax || 0 + item.commissionInInr || 0)}`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default InvoiceDetails;
