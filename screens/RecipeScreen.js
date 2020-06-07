import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = "Chai";
    const category = "Drink";
    const title = "Making Chai with Cooking Bot!";
// Didn't have time for this database functionality unforunately :(
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/oat-milk-chai-tea-latte-recipe-with-truvia-natural-sweetener-masala-chai-png-460_553.png')} />
            </View>
        </TouchableHighlight>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>Chai</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoRecipe}>10 minutes </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}> 
                -  00:01|80.63°F [put tap water into pot, boil and then add spices] {"\n"}
                -  03:47|95.18°F [add cinnamon, grate entire ginger]{"\n"}
                -  04:48|91.31°F [add tea powder]{"\n"}
                -  06:13|94.77°F [add milk]{"\n"}
                -  08:43|93.63°F [filter out tea into a measuring cup, 2 spoons of sugar per cup of tea in cup.pour team. Serve]{"\n"}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  carouselContainer: {
    minHeight: 250
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
});