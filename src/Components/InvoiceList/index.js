import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, ListItem, Button} from 'react-native-elements';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getInvoices} from '../../Store/Actions/Invoice';
import {getInvoiceList} from '../../Store/reduxSelectors';
import normalize from '../../Helper/normalize';
import CustomButton from '../Common/CustomButton';

Icon.loadFont();

const CustomListItem = ({iconName, label}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
    <View style={{minWidth: 30}}>
      <Icon name={iconName} size={20} />
    </View>
    <Text style={{fontWeight: 'bold', fontSize: 20}}>{label}</Text>
  </View>
);

const InvoiceList = ({navigation}) => {
  const dispatch = useDispatch();

  const invoiceList = useSelector((state) => getInvoiceList(state));
  console.log('invoiceList: ', invoiceList);
  React.useEffect(() => {
    dispatch(getInvoices());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}>
      <FlatList
        data={(invoiceList && invoiceList.payload) || []}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <TouchableOpacity style={{paddingVertical: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} onPress={() => navigation.push('InvoiceDetails', {item})}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: normalize(2), textTransform: 'uppercase'}}>{'#' + item._id.slice(item._id.length - 5)}</Text>
              <Text style={{fontWeight: 'bold', fontSize: normalize(1.8), color: '#696969', lineHeight: 30}}>{dayjs(item.createdAt).format('DD MMM YY  hh:mm A')}</Text>
            </View>

            <View>
              <Text style={{fontWeight: 'bold', fontSize: normalize(2), textAlign: 'right'}}>{`₹${item.creditedToAccount}`}</Text>
              <Text style={{fontWeight: 'bold', fontSize: normalize(1.8), color: '#696969', lineHeight: 30, textAlign: 'right'}}>{item.totalHours}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 30, padding: 20}}>
        <CustomButton title="Create Invoice" onPress={() => navigation.push('CreateInvoice')} />
      </View>
    </View>
  );
};

export default InvoiceList;
