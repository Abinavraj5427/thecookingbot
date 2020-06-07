import  React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Platform } from 'react-native';
import ListComponent from "./ListComponent.js";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

class StopwatchContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            min: 0,
            sec: 0,
            msec: 0,
            expoPushToken: '',
        }

        this.lapArr = [];

        this.interval = null;
    }

     // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    sendPushNotification = async () => {
        const message = {
        to: this.state.expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' },
        _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
        });
    };

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = await Notifications.getExpoPushTokenAsync();
          console.log("TOKEN")
          console.log(token);
          this.setState({ expoPushToken: token });
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
          });
        }
      };
    
      
    handleToggle = () => {
        this.setState(
            {
                start: !this.state.start
            },
            () => this.handleStart()
        );
    };

    handleLap = (min, sec, msec) => {
        this.lapArr = [
            ...this.lapArr,
            {min, sec, msec}
        ]

    };

    handleStart = () => {
        if (this.state.start) {
            this.interval = setInterval(() => {
                if (this.state.msec !== 99) {
                    this.setState({
                        msec: this.state.msec + 1
                    });
                } else if (this.state.sec !== 59) {
                    this.setState({
                        msec: 0,
                        sec: ++this.state.sec
                    });
                } else {
                    this.setState({
                        msec: 0,
                        sec: 0,
                        min: ++this.state.min
                    });
                }
                if(this.state.sec == 10 && this.state.msec == 0){
                    this.sendPushNotification();
                }
            }, 1);

        } else {
            clearInterval(this.interval);
        }
    };

    

    componentDidMount(){
        this.registerForPushNotificationsAsync();
        this.handleToggle();
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

export default StopwatchContainer;