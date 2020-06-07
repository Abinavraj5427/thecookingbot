import React from 'react'
import { AreaChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View, StyleSheet, Text } from 'react-native'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import firebase from '../firebase.js';
class HumidText extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            msec: 0,
            temperature: 0,
        }

        this.lapArr = [];

        this.interval = null;
    }

    handleToggle = () => {
        //console.log("C");
        this.setState(
            {
                start: !this.state.start
            },
            () => this.handleStart()
        );
    };

    componentDidMount(){
        //console.log("D");
        this.handleToggle();
        //console.log(this.state.td);
    }

    componentWillUnmount(){
        this.handleToggle();
    }


    handleStart = () => {
        //console.log("B");
        if (this.state.start) {
            this.interval = setInterval(() => {
                
                    this.setState({
                        msec: this.state.msec + 1
                    });
                // console.log(this.state.msec)
                if(this.state.msec > 200){
                    // console.log("A");
                    this.updateTemp();
                    this.setState({
                        msec: 0,
                    })
                }
            }, 1);

        } else {
            clearInterval(this.interval);
        }
    };
    
    
    updateTemp(){
        // console.log("W.")
        firebase.database().ref('humidity').once('value').then(
            (snapshot) => {
                var temperature = snapshot.val();
                
                this.setState({
                    temperature: temperature,
                });
            }
        )
    }

    render() {

        const contentInset = { top: 50, bottom: 50 };

        const Gradient = ({ index }) => (
            <Defs key={index}>
                <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgba(0, 177, 106, 0.8)'} stopOpacity={0.8}/>
                    <Stop offset={'100%'} stopColor={'rgba(226, 106, 106, 0.8)'} stopOpacity={1}/>
                </LinearGradient>
            </Defs>
        )

        return (
            <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>
              {this.state.temperature}
              {this.state.temperature < 60? " IT IS DRY HERE (BURN WARNING)": " IT'S PRETTY MOIST (SAFE)"}
          </Text>
        </View>
        )
    }
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
      fontSize: 50,
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
export default HumidText;