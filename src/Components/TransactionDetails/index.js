import React from 'react';
import {
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import normalize from '../../Helper/normalize';
import {getAllTransactions} from '../../Store/Actions/Transactions';
import {getAllTransactionsData} from '../../Store/reduxSelectors';
import dayjs from 'dayjs';
const TransactionDetails = ({route}) => {
  const dispatch = useDispatch();
  const params = route.params;
  React.useEffect(() => {
    dispatch(getAllTransactions(params.receiveDetails._id));
  }, []);

  const transactionsPayload = useSelector((state) =>
    getAllTransactionsData(state),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 10}}
          data={transactionsPayload.transactions}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <TransactionCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetails;

export const TransactionCard = ({item}) => {
  return (
    <TouchableOpacity
      style={{
        borderColor: '#eee',
        borderWidth: 1,
        // paddingHorizontal: 15,
        paddingBottom: 20,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: normalize(6),
          fontWeight: '600',
          textAlignVertical: 'bottom',
        }}>
        ₹{item.amount}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: '#36454F',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Text
            style={{
              fontWeight: '700',
              color: '#fff',
              textTransform: 'capitalize',
              fontSize: normalize(1.5),
            }}>
            {item.transactionType}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: '#eee',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: normalize(1.5),
            }}>
            {item.status ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontWeight: '600',
            fontSize: normalize(2),
          }}>
          {dayjs(item.createdAt).format('DD MMM, YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
