import React from 'react'
import { AreaChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View, StyleSheet, Text } from 'react-native'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import firebase from '../firebase.js';
class Temperature extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            msec: 0,
            td: [0,0,0,0,0,0,0,0,0],
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
                if(this.state.msec > 300){
                    // console.log("A");
                    this.updateTempArray();
                    this.setState({
                        msec: 0,
                    })
                }
            }, 1);

        } else {
            clearInterval(this.interval);
        }
    };
    
    
    updateTempArray(){
        //console.log("W.")
        firebase.database().ref('temp').once('value').then(
            (snapshot) => {
                var temperature = snapshot.val();
                //console.log(temperature);
                var tempData = this.state.td;
                // var newData =tempData.clone();
                var newData = []
                tempData.map(e => 
                    newData.push(e)
                )
                newData.shift();
                // /console.log(newData)
                newData.push(parseFloat(temperature));
                // console.log(newData);
                // console.log(newData.length)
                
                this.setState({
                    td: newData,
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
            <View style={{height: 400, flexDirection: 'row'}}> 
                <YAxis
                    data={this.state.td}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºF`}
                />
                <AreaChart
                    style={{flex:1, marginLeft: 16, height: 400 }}
                    data={this.state.td}
                    contentInset={contentInset}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(226, 106, 106, 0.8)' }}
                    // svg = {{fill: 'url(#gradient)'}}
                >
                    <Grid />
                    <Gradient />
                </AreaChart>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    heading: {
      fontSize: 25,
      paddingTop: 0,
      paddingBottom:15,
      textAlign: 'center',
    },
    graphContainer: {
        borderRadius:40,
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        alignItems: 'center',
        minWidth: '40%',
    },
  });
export default Temperature;