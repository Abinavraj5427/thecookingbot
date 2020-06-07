import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text, TextInput } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";
import firebase from '../firebase.js';

function TimeStampScreen(props) {
    function updateTemp() {
        // console.log("W.")
        firebase.database().ref('temp').once('value').then(
            (snapshot) => {
                var temperature = snapshot.val();
                return(temperature);
            }
        )
    }
  return (
    <ScrollView style={styles.rect} contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps='handled'>
      <StatusBar hidden />
      <View style={styles.ellipseStack}>
        <Svg viewBox="0 0 643.3 320.15" style={styles.ellipse}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="rgba(0, 181, 204, 1)"
            cx={322}
            cy={160}
            rx={322}
            ry={160}
          ></Ellipse>
        </Svg>
        <Svg viewBox="0 0 579.08 320.15" style={styles.ellipse1}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="rgba(226, 106, 106, 0.8)"
            cx={290}
            cy={160}
            rx={290}
            ry={160}
          ></Ellipse>
        </Svg>
        <Text style={styles.loremIpsum}>{this.state.time}</Text>
        <Text style={styles.loremIpsum1}>{this.state.temperature}</Text>
      </View>
      <TextInput
        placeholder="Add Text Here!"
        textBreakStrategy="simple"
        spellCheck={true}
        autoCorrect={true}
        multiline={true}
        style={styles.graphContainer}
      ></TextInput>
    </ScrollView>
  );
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
  textInput: {
    color: "#121212",
    height: 496,
    width: 339,
    textAlign: "center",
    backgroundColor: "rgba(235,202,202,0.46)",
    shadowOpacity: 0.55,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 5,
      height: 5
    },
    elevation: 0,
    borderRadius: 84,
    fontSize: 24,
    marginTop: 15,
    marginLeft: 12
  },
  graphContainer: {
    backgroundColor: "rgba(232,236,241,1)",
    fontSize:30,
    borderRadius: 20,
    shadowOpacity: 1,
    shadowColor: "rgba(103,128,159,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 0,
    flex:1,
    margin: 5,
  },
});

export default TimeStampScreen;
