import React from 'react'
import { AreaChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View, StyleSheet, Text } from 'react-native'
import { Defs, LinearGradient, Stop } from 'react-native-svg'

class Temperature extends React.PureComponent {
    render() {
        const data = [0, 10, 25, 35, 43, 54, 60, 76, 88, 90, 93, 95, 97, 98, 100]

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
                    data={data}
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
                    data={data}
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