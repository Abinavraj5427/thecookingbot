import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View, StyleSheet, Text } from 'react-native'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import firebase from '../firebase.js';
class PotOverflow extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            msec: 0,
            startHeight: 0,
            curHeight: 0,

            percentFull: 0.1,
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

        firebase.database().ref('distance2').once('value').then(
            (snapshot) => {
                var height = snapshot.val();
                
                this.setState({
                    startHeight: 20,
                });
            }
        )
        
        this.handleToggle();
    }

    componentWillUnmount(){
        this.handleToggle();
    }


    handleStart = () => {
        if (this.state.start) {
            this.interval = setInterval(() => {
                
                    this.setState({
                        msec: this.state.msec + 1
                    });
                if(this.state.msec > 200){
                    this.updateValues();
                    this.setState({
                        msec: 0,
                    })
                }
            }, 1);

        } else {
            clearInterval(this.interval);
        }
    };
    
    
    updateValues(){
        // console.log("W.")
        firebase.database().ref('distance2').once('value').then(
            (snapshot) => {
                var height = snapshot.val();
                console.log("startheight:")
                console.log(this.state.startHeight)
                console.log("curheight:")
                console.log(height)
                const totalHeight = 20;
                var percentFull = (this.state.startHeight - this.state.curHeight)/parseFloat(totalHeight);
                console.log("percentFull")
                console.log(percentFull)
                this.setState({
                    curHeight: height,
                    percent: percentFull, 
                });
            }
        )
    }

    render() {

        const contentInset = { top: 50, bottom: 50 };
        
        //  console.log(this.state.startHeight)

        const Gradient = ({ index }) => (
            <Defs key={index}>
                <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgba(0, 177, 106, 0.8)'} stopOpacity={0.8}/>
                    <Stop offset={'100%'} stopColor={'rgba(226, 106, 106, 0.8)'} stopOpacity={1}/>
                </LinearGradient>
            </Defs>
        )

        return (
           
              
            <ProgressCircle style={{ height: 200 }} progress={0.3} progressColor={'rgb(134, 65, 244)'} />
           
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
export default PotOverflow;