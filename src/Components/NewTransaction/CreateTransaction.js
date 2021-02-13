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
  TextInput,
} from 'react-native';
import {Modalize} from 'react-native-modalize';

import normalize from '../../Helper/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {searchContacts} from '../../Store/Actions/Contacts';
import {getSearchedContacts} from '../../Store/reduxSelectors';
const {width, height} = Dimensions.get('screen');
const Transactions = ({route, navigation}) => {
  const modalizeRef = React.useRef(null);
  const dispatch = useDispatch();

  const searchedContacts = useSelector((state) => getSearchedContacts(state));

  const handleSearchContacts = (userName) => {
    dispatch(searchContacts(userName));
  };

  React.useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={true}
      onClose={() => navigation.goBack()}>
      <View style={{height: height / 2, backgroundColor: 'yellow'}}>
        {/* <FlatList
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  maxHeight: 50,
                  backgroundColor: '#eee',
                  borderRadius: 20,
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <TextInput
                  onEndEditing={(value) =>
                    handleSearchContacts(value.nativeEvent.text)
                  }
                  style={{height: 50}}
                />
              </View>
            );
          }}
          data={searchedContacts.contacts}
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
        /> */}
      </View>
    </Modalize>
    // </View>
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
