import { StatusBar } from 'expo-status-bar';
import react from 'react';
import { FlatList, StyleSheet, Text, View, Animated, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

const backgrounds = ['#A5BBFF', '#ffc6ac', '#b7f78a', '#DDBEFE', '#FF63ED', '#B98EFF', '#ffefac', '#acffef', '#f2b4c0'];

const Data = [
  {
    key: '1',
    description: "What is your favorite meal?"
    },
    {
      key: '2',
      description: "What sport are you good at?"
      },
      {
        key: '3',
        description: "If you were going to choose a new name for yourself, what would it be?"
        },
        {
          key: '4',
          description: "What is your favorite drink?"
          },
          {
            key: '5',
            description: "Tell me about your earliest memory."
            },
            {
              key: '6',
              description: "What is your mother like?"
              },
              {
                key: '7',
                description: "What is your dream job?"
                },
              {
                key: '8',
                description: "Do you have any pets? Tell me about them!"
                },
                {
                  key: '9',
                  description: "Tell me about one of your bad habits."
                  },
                  {
                    key: '10',
                    description: "What is your favorite dessert?"
                    },
                    {
                      key: '11',
                      description: "What is your dream job?"
                      },
                      {
                        key: '12',
                        description: "Tell me about the best day you had last week."
                        },
                        {
                          key: '13',
                          description: "Can you speak any other languages?"
                          },
                          {
                            key: '14',
                            description: "Who is your favorite TV character?"
                            },
                          {
                            key: '15',
                            description: "If you could live anywhere in the world, where would it be?"
                            },
                          {
                            key: '16',
                            description: "What is your father like?"
                            },
                          {
                            key: '17',
                            description: "Do you play any instruments?"
                            },
                          {
                            key: '18',
                            description: "Tell me about your favorite book."
                            },
                          {
                            key: '19',
                            description: "Who is your best friend? Can you tell me a story about them?"
                            },
                            {
                              key: '20',
                              description: "Do you obey rules you consider unfair?"
                              },
                            {
                              key: '21',
                              description: "What are you most proud of achieving?"
                              },
                            {
                              key: '22',
                              description: "How do you order your pizza?"
                              },
];

const Indicator = ({scrollMe}) => {
  return <View style={{position: 'absolute', bottom: 75, flexDirection: 'row'}}>
    {Data.map((_, i) => {
      return <View
      key= {'indicator-${i}'}
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 8,

      }}
      />
    }
  
  )}
  </View>
}

const Backgrounds = ({scrollMe}) => {
  const backgroundColor = scrollMe.interpolate({
      inputRange: backgrounds.map((_, i) => i * width),
      outputRange: backgrounds.map((backgrounds) => backgrounds),
  });

  return <Animated.View
            style={[
              StyleSheet.absoluteFillObject, 
              {
              backgroundColor,
            }]}
            
            />
}
export default function App() {
  const scrollMe = react.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Backgrounds scrollMe={scrollMe}/>
      <StatusBar hidden />
      <Animated.FlatList 
      data = {Data}
      keyExtractor={item => item.key}
      horizontal
      scrollEventThrottle={32}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {x: scrollMe}}}],
        {useNativeDriver: false}
      )}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      renderItem={({item}) => {
        return ( 
            <View
              style={{flex: 1, width, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                <View>
          <Text style={{fontSize: 50, fontWeight: 500, color: 'white', shadowColor: 'black'}}>{item.description}</Text>
          </View>
          </View>
        );
      }}
      />
      <Indicator scrollMe={scrollMe} />
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
});
