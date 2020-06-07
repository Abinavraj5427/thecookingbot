import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';


import { MonoText } from '../components/StyledText';
import Area from '../components/Area.js'
import Temperature from '../components/Temperature.js'

import PotOverflow from '../components/PotOverflow.js'
import Stopwatch from '../components/Stopwatch/StopwatchContainer.js'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Open up the code for this screen:</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Fo Sho we in the Shizzle???
          </Text>
        </View> */}

        

        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>
            98.9ºF
          </Text>
        </View>

        <View style={styles.graphContainer}>
          <Text style={styles.developmentModeText}>Hot! Hot!</Text>
          <Temperature />
        </View>

        <View style={styles.graphContainer}>
          <Text style={styles.developmentModeText}>How full is my pot?</Text>
          <PotOverflow />
        </View>

        <View>
          <Stopwatch />
        </View>

        {/* <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 100,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  graphContainer: {
    backgroundColor: "rgba(232,236,241,1)",
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
  temperatureContainer: {
    backgroundColor: "rgba(226, 106, 106, 0.8)",
    color:  "rgba(232,236,241,1)",
    borderRadius: 20,
    shadowOpacity: 1,
    shadowColor: "rgba(103,128,159,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 0,
    flex:1,
    flexDirection: 'column',
    margin: 5,
  },
  temperatureText:{
    margin: 10,
    color:  "rgba(232,236,241,1)",
    fontSize: 100,
    flex:1,
    flexDirection:'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    lineHeight: 0,
  },
  clockBox: {
    backgroundColor: "rgba(232,236,241,1)",
    borderRadius: 500,
    shadowOpacity: 1,
    shadowColor: "rgba(103,128,159,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 0,
    flex:1,
    marginVertical: 0,
    marginHorizontal:100,
  },
});
