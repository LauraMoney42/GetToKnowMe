import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import Data from './Components/Data'; // Import the Data array 
const { width, height } = Dimensions.get('screen');

// Define a repeating pattern for backgrounds if needed
const backgrounds = ['#5ae6e8', '#A5BBFF', '#ffc6ac', '#b7f78a', '#DDBEFE', '#FF63ED', '#B98EFF', '#ffefac', '#acffef', '#f2b4c0'];

// Repeat the backgrounds pattern to match the length of the Data array
const extendedBackgrounds = Array.from({ length: Data.length }, (_, i) => backgrounds[i % backgrounds.length]);


const Backgrounds = ({ scrollMe }) => {
  const backgroundColor = scrollMe.interpolate({
    inputRange: extendedBackgrounds.map((_, i) => i * width),
    outputRange: extendedBackgrounds.map((background) => background),
  });

  return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />;
};

export default function App() {
  const scrollMe = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Backgrounds scrollMe={scrollMe} />
      <StatusBar hidden />
      <Animated.FlatList
        data={Data}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollMe } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.description}</Text>
          </View>
        )}
      />
      {/* <Indicator scrollMe={scrollMe} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  itemText: {
    fontSize: 50,
    fontWeight: '500',
    color: 'white',
    shadowColor: 'black',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 75,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 60,
  },
  indicatorDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 8,
  },
});
