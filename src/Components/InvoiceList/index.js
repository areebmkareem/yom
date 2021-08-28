import React from 'react';
import {View, Text, FlatList, TouchableOpacity, LayoutAnimation, NativeModules, Platform, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from 'react-native-elements';
import dayjs from 'dayjs';
import {getInvoices} from '../../Store/Actions/Invoice';
import {getInvoiceList} from '../../Store/reduxSelectors';
import normalize from '../../Helper/normalize';
import CustomButton from '../Common/CustomButton';
import {ActivityIndicator} from 'react-native';
import {FAB} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
const {UIManager} = NativeModules;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InvoiceList = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  const invoiceList = useSelector((state) => getInvoiceList(state));

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
    <View style={styles.root}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Text style={{fontSize: normalize(3)}}>Getting Your Invoices...</Text>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Text style={{fontSize: normalize(3)}}>Such Empty!</Text>
              </View>
            )}
            data={(invoiceList && invoiceList.payload) || []}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.card} onPress={() => navigation.push('InvoiceDetails', {item})}>
                <View>
                  <Text style={styles.paymentId}>{'#' + item._id.slice(item._id.length - 5)}</Text>
                  <Text style={styles.date}>{dayjs(item.createdAt).format('DD MMM YY  hh:mm A')}</Text>
                </View>

                <View>
                  <Text style={styles.amount}>{`₹${item.creditedToAccount}`}</Text>
                  <Text style={styles.date}>{item.totalHours}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
      <FAB style={styles.fabBtn} color={colors.black} onPress={() => navigation.push('CreateInvoice')} icon={<Icon name="angle-double-right" size={15} color="white" />} />

      <FAB color={colors.black} onPress={() => navigation.push('Statics')} icon={<Icon name="angellist" size={15} color="white" />} />
    </View>
  );
};

export default InvoiceList;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 100,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey5,
  },
  paymentId: {
    fontWeight: 'bold',
    fontSize: normalize(2),
    textTransform: 'uppercase',
  },
  date: {
    fontWeight: 'bold',
    fontSize: normalize(1.8),
    color: '#696969',
    lineHeight: 30,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: normalize(2),
    textAlign: 'right',
  },
  fabBtn: {
    position: 'absolute',
    right: 20,
    bottom: 40,
  },
});
