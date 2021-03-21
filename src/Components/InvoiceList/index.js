import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, ListItem, Button} from 'react-native-elements';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getInvoices} from '../../Store/Actions/Invoice';
import {getInvoiceList} from '../../Store/reduxSelectors';

Icon.loadFont();

const CustomListItem = ({iconName, label}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
    <View style={{minWidth: 30}}>
      <Icon name={iconName} size={20} />
    </View>
    <Text style={{fontWeight: 'bold', fontSize: 20}}>{label}</Text>
  </View>
);

const InvoiceList = () => {
  const dispatch = useDispatch();

  const invoiceList = useSelector((state) => getInvoiceList(state));
  console.log('invoiceList: ', invoiceList);
  React.useEffect(() => {
    dispatch(getInvoices());
  }, []);

  return (
    <View>
      <FlatList
        data={(invoiceList && invoiceList.payload) || []}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <TouchableOpacity>
            <Card>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 20}}>
                <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>{'#' + item._id.slice(item._id.length - 5)}</Text>
                <Text style={{fontWeight: 'bold', color: '#696969'}}>{dayjs(item.createdAt).format('DD MMM YY  hh:mm A')}</Text>
              </View>
              <Card.Divider />
              <View>
                <CustomListItem iconName="hourglass-end" label={item.totalHours} />
                <CustomListItem iconName="inr" label={item.creditedToAccount} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default InvoiceList;
