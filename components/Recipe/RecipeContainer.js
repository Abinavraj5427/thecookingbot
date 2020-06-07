import  React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ListComponent from "./RecipeListComponent.js";

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

class RecipeContainer extends Component {

    constructor(props){
        super(props);

        this.lapArr = [];
    }


    handleLap = () => {
        this.lapArr = [
            ...this.lapArr,
            {min, sec, msec}
        ]

    };

    componentDidMount(){
        
    }

    render(){
        return(
            <View style={styles.container}>

                <View style = {styles.clockContainer}>
                    <TouchableOpacity onPress={()=>this.handleLap(this.state.min, this.state.sec, this.state.msec)}>
                        <Text style={styles.child}>{this.state.min}</Text>
                        <Text style={styles.child}>{padToTwo(this.state.sec)}</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.buttonParent}>
                    <TouchableOpacity style={styles.button} onPress={this.handleReset}><Text style={styles.buttonText}>Reset</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleToggle}><Text style={styles.buttonText}>{!this.state.start? 'Start': 'Stop'}</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>this.handleLap(this.state.min, this.state.sec, this.state.msec)} disabled={!this.state.start}><Text style={styles.buttonText}>Lap</Text></TouchableOpacity>
                </View> */}

                <ListComponent lap={this.lapArr} timeStamp = {this.props.timeStamp}/>

            </View>
        );
    }


}

const styles = StyleSheet.create({

    parent: {
        display: "flex",
        flexDirection: "row",
        flex:1,
        borderWidth:0,
        borderRadius: 40,
        borderColor: "#694966",
        backgroundColor: '#694966',
        margin: 5,
    },
    clockContainer: {
        backgroundColor: "rgba(232,236,241,1)",
        borderRadius: 500,
        shadowOpacity: 1,
        shadowColor: "rgba(103,128,159,1)",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        elevation: 0,
        flex:10,
        marginVertical: 5,
        marginHorizontal:100,
      },

    temperatureText:{
        margin: 10,
        color:  "rgba(232,236,241,1)",
        fontSize: 80,
        flex:1,
        flexDirection:'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        lineHeight: 0,
    },
    child: {
      fontSize: 90,
      color: "rgba(0, 181, 204, 1)",
      textAlign:"center",
      flex:1,
      flexDirection: 'row',
    },

    buttonParent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "12%",
        marginBottom: "16%"
    },

    button: {
        backgroundColor: "#694966",
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
        display: "flex",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#694966",
        height: 60,
    },

    buttonText: {
        color: "#C89933",
        fontSize: 20,
        alignSelf: "center"
    }
});

export default RecipeContainer;