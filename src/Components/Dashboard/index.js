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
} from 'react-native';
import normalize from '../../Helper/normalize';
import useLayoutAnimation from '../Common/CustomHooks/useLayoutAnimation';
import Scroller from '../Common/Scroller';
import {
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryAxis,
  VictoryPolarAxis,
} from 'victory-native';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
  {quarter: 5, earnings: 19000},
  {quarter: 6, earnings: 19000},
  {quarter: 7, earnings: 19000},
];
const sampleData = [
  {x: 'Lend', y: 35},
  {x: 'Borrow', y: 40},
  {x: 'Normal', y: 55},
];

const {width} = Dimensions.get('screen');
const Dashboard = ({route, navigation}) => {
  const {isLoginScreen} = route.params;

  const [nothing, LayoutAnimation] = useLayoutAnimation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{paddingTop: 40}}>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}>
          {['This Week', 'This Month', 'This Year', 'Custom'].map(
            (item, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={{
                  padding: 10,
                  maxHeight: 30,
                  backgroundColor: index == 2 ? '#696969' : '#D3D3D3',
                  borderRadius: 50,
                  minWidth: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#fff',
                    fontSize: normalize(1.2),
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>
      </View>
      <View style={{flex: 0.2}}>
        <Scroller />
      </View>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryArea animate={{duration: 200}} data={sampleData} />
            <VictoryAxis />
          </VictoryChart>
          <VictoryChart polar theme={VictoryTheme.material}>
            <VictoryArea animate={{duration: 200}} data={sampleData} />
            <VictoryPolarAxis />
          </VictoryChart>
          {/* <VictoryChart theme={VictoryTheme.material}> */}
          <VictoryPie
            animate={{duration: 200}}
            padding={100}
            data={sampleData}
          />
          {/* </VictoryChart> */}
        </ScrollView>
      </View>
    </SafeAreaView>
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

export default Dashboard;
