import React from 'react';
import {View, Text, FlatList, TouchableOpacity, LayoutAnimation, NativeModules, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, ListItem, Button} from 'react-native-elements';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getInvoices} from '../../Store/Actions/Invoice';
import {getInvoiceList} from '../../Store/reduxSelectors';
import normalize from '../../Helper/normalize';
import CustomButton from '../Common/CustomButton';
import {ActivityIndicator} from 'react-native';

Icon.loadFont();
const {UIManager} = NativeModules;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InvoiceList = ({navigation}) => {
  const dispatch = useDispatch();

  const invoiceList = useSelector((state) => getInvoiceList(state));

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    _componentDidMount();
  }, []);
  const _componentDidMount = async () => {
    try {
      await dispatch(getInvoices());
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  LayoutAnimation.spring();
  return (
    <View style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}>
      {isLoading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: normalize(3)}}>Getting Your Invoices...</Text>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FlatList
            ListEmptyComponent={() => (
              <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                <Text style={{fontSize: normalize(3)}}>Such Empty!</Text>
              </View>
            )}
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
        </>
      )}
    </View>
  );
};

export default InvoiceList;
