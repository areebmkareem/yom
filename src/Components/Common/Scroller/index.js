// Inspiration: https://dribbble.com/shots/2343572-Countdown-timer
// 👉 Output of the code: https://twitter.com/mironcatalin/status/1321856493382238208

import * as React from 'react';
import {Vibration, Dimensions, Animated, View, StyleSheet} from 'react-native';
import normalize from '../../../Helper/normalize';
const {width, height} = Dimensions.get('window');
const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

const timers = [
  {title: 'All'},
  {title: 'Lend'},
  {title: 'Borrow'},
  {title: 'Normal'},
];
const ITEM_SIZE = width * 0.38;

const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = React.useState(timers[0]);

  const animation = React.useCallback(() => {}, [duration]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={timers}
        horizontal
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollEnd={(event) => {
          //   const index = event.nativeEvent.contentOffset.x / ITEM_SIZE;
          //   setDuration(timers[Math.round(index)]);
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: ITEM_SPACING,
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        // style={{flexGrow: 0}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
          });
          return (
            <View
              style={{
                width: ITEM_SIZE,
                // maxWidth: ITEM_SIZE,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.Text
                style={[
                  styles.text,
                  {
                    opacity,
                    transform: [
                      {
                        scale,
                      },
                    ],
                  },
                ]}>
                {item.title}
              </Animated.Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: normalize(5),
    // fontFamily: 'Menlo',
    color: '#A9A9A9',
    fontWeight: '900',
  },
});
