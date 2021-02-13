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
import normalize from '../../Helper/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {getUserTransactionContacts} from '../../Store/Actions/Contacts';
import {getTransactionContacts} from '../../Store/reduxSelectors';
import CustomButton from '../Common/CustomButton';
const {width} = Dimensions.get('screen');
const Transactions = ({route, navigation}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserTransactionContacts());
  }, []);

  const transactionContacts = useSelector((state) =>
    getTransactionContacts(state),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
        position: 'relative',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{padding: 10}}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  minHeight: 50,
                  backgroundColor: '#eee',
                  borderRadius: 20,
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Text>Search Section</Text>
              </View>
            );
          }}
          data={transactionContacts.contacts}
          numColumns={3}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <ContactHead
              item={item}
              onPress={(receiveDetails) =>
                navigation.push('TransactionDetails', {receiveDetails})
              }
            />
          )}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 30,
          padding: 10,
        }}>
        <CustomButton
          onPress={() =>
            navigation.push('NewTransaction', {title: 'New Transaction'})
          }
          title="New Payment"
        />
      </View>
    </SafeAreaView>
  );
};

const ContactHead = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: 100,
      }}
      onPress={() => onPress(item)}>
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: '#eee',
          borderRadius: 20,
          paddingBottom: 10,
        }}
      />

      <Text
        style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: normalize(2),
        }}>
        {item.fullName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondary: {
    fontSize: normalize(1),
    textAlign: 'center',
    color: '#D3D3D3',
    fontWeight: '700',
  },
});

export default Transactions;
