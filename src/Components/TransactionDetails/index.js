import React from 'react';
import {View, Text} from 'react-native';

const TransactionDetails = ({route}) => {
  const params = route.params;

  React.useEffect(() => {
    console.log(params.receiveDetails);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>sad</Text>
    </View>
  );
};

export default TransactionDetails;
