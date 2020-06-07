import React, {Component} from 'react';
import { ScrollView, FlatList, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

class RecipeListComponent extends Component {
    constructor(props){
        super(props);
    }

    state = {
        textValue: 'DFSDFJSDLFJ',
        textArray: ["hello"],
    }
    onPressList(){
        this.setState({
            textValue: 'Tea Bag'
        })
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollArea_contentContainerStyle}>
                <FlatList
                    data={this.state.textArray}
                    renderItem={({item, index}) => {
                        return(
                            <TouchableOpacity style={styles.button1}>
                            <View style={styles.group1Row}>
                              <View style={styles.group1}>
                                <TouchableOpacity
                                  onPress={this.onPressList()}
                                  style={styles.button2}
                                >
                                  <View style={styles.group2}>
                                    <TouchableOpacity
                                      onPress={this.onPressList()}
                                      style={styles.button3}
                                    >
                                      <View style={styles.group3}>
                                        <Text style={styles.loremIpsum2}>+</Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </TouchableOpacity>
                              </View>
                              <Text style={styles.ingredients1}>{this.state.textValue}</Text>
                            </View>
                          </TouchableOpacity>
                        )
                    }
                }
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rect: {
      flex: 1,
      backgroundColor: "rgba(250,250,250,1)"
    },
    ellipse: {
      top: 0,
      left: 0,
      width: 643,
      height: 320,
      position: "absolute"
    },
    ellipse1: {
      top: 0,
      left: 561,
      width: 579,
      height: 320,
      position: "absolute"
    },
    loremIpsum: {
      top: 160,
      left: 437,
      position: "absolute",
      color: "rgba(243,236,236,1)",
      height: 88,
      width: 124,
      fontSize: 50
    },
    loremIpsum1: {
      top: 160,
      left: 650,
      position: "absolute",
      color: "rgba(243,236,236,1)",
      height: 88,
      width: 124,
      fontSize: 50
    },
    ellipseStack: {
      width: 1140,
      height: 320,
      marginTop: -121,
      marginLeft: -414
    },
    scrollArea: {
      width: 360,
      height: 329,
      backgroundColor: "rgba(250,249,251,1)"
    },
    scrollArea_contentContainerStyle: {
      height: 329,
      width: 360
    },
    button1: {
      width: 277,
      height: 37,
      flexDirection: "row",
      marginTop: 10,
      marginLeft: 8
    },
    group1: {
      width: 40,
      height: 37
    },
    button2: {
      width: 40,
      height: 37
    },
    group2: {
      width: 40,
      height: 37
    },
    button3: {
      width: 40,
      height: 37,
      backgroundColor: "rgba(5,221,131,0.45)",
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 5,
        height: 5
      },
      elevation: 0,
      shadowOpacity: 0.01,
      borderWidth: 0,
      borderColor: "rgba(0,0,0,0.45)",
      borderRadius: 100
    },
    group3: {
      width: 17,
      height: 35,
      marginLeft: 11
    },
    loremIpsum2: {
      color: "#121212",
      opacity: 0.43,
      fontSize: 30
    },
    ingredients1: {
      color: "#121212",
      fontSize: 30,
      marginLeft: 39
    },
    group1Row: {
      height: 37,
      flexDirection: "row",
      flex: 1
    },
    scrollArea2: {
      width: 360,
      height: 212,
      backgroundColor: "rgba(252,255,252,1)"
    },
    scrollArea2_contentContainerStyle: {
      height: 212,
      width: 360
    },
    button4: {
      width: 277,
      height: 37,
      flexDirection: "row",
      marginTop: 14,
      marginLeft: 8
    },
    group4: {
      width: 40,
      height: 37
    },
    button5: {
      width: 40,
      height: 37
    },
    group5: {
      width: 40,
      height: 37
    },
    button6: {
      width: 40,
      height: 37,
      backgroundColor: "rgba(5,221,131,0.45)",
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 5,
        height: 5
      },
      elevation: 0,
      shadowOpacity: 0.01,
      borderWidth: 0,
      borderColor: "rgba(0,0,0,0.45)",
      borderRadius: 100
    },
    group6: {
      width: 17,
      height: 35,
      marginLeft: 11
    },
    loremIpsum3: {
      color: "#121212",
      opacity: 0.43,
      fontSize: 30
    },
    instructions: {
      color: "#121212",
      fontSize: 24,
      marginLeft: 39
    },
    group4Row: {
      height: 37,
      flexDirection: "row",
      flex: 1,
      marginRight: 25
    }
  });


export default RecipeListComponent;