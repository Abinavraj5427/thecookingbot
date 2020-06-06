import * as React from 'react';
import {
  Text,
  View,
  Platform,
  TimePickerAndroid,
  DatePickerIOS,
  Vibration,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { accelerometer } from 'react-native-sensors';
import Survey from './Survey';
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import firebase from '../firebase.js';


setUpdateIntervalForType(SensorTypes.accelerometer, 100);
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      hour: 0,
      minute: 0,
      curTime: '',
      curHour: new Date().getHours(),
      curMin: new Date().getMinutes(),
      ring: false,
      accelerometerData: { x: 0, y: 0, z: 0 },
      accelerometerList: [],
      surveyOn: false,
      timeStart: false,
    };
    this.setDate = this.setDate.bind(this);
    this.androidSetTime = this.androidSetTime.bind(this);
    this.format = this.format.bind(this);
    this.checkAlarm = this.checkAlarm.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.updateSurvey = this.updateSurvey.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString(),
        curHour: new Date().getHours(),
        curMin: new Date().getMinutes(),
      });
      this.checkAlarm();
    }, 60000);
    accelerometer.subscribe(({ x, y, z }) => {

      //updates the current x, y, and z positions
      this.setState({ accelerometerData: { x, y, z } });

      if (this.state.timeStart) {
        //Updates the acceleromter historical list every second
        let list = this.state.accelerometerList;

        list.push({
          x: this.state.accelerometerData.x,
          y: this.state.accelerometerData.y,
          z: this.state.accelerometerData.z,
        });
        this.setState({ acceleromteerList: list });
      }
    }
    );
  }

  updateSurvey(val) {
    console.log(val);
    this.setState({ surveyOn: val });
  }

  onLogout() {
    firebase.auth().signOut()
      .then(console.log("sign out success"))
      .catch(console.log("sign out fail"));
    this.props.handleLogin(null);
  }

  async checkAlarm() {
    if (
      this.state.hour === this.state.curHour &&
      this.state.curMin === this.state.minute
    ) {
      Vibration.vibrate(10000, false);
      this.setState({ ring: true });
    }
  }

  format(hour, minute) {
    var string = '';
    var time = '';
    time = hour > 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;
    string += hour + ':';
    if (minute < 10) string += '0' + minute;
    else string += minute;
    return string + ' ' + time;
  }

  async androidSetTime() {
    try {
      const options = { is24Hour: false };
      const { action, hour, minute } = await TimePickerAndroid.open(options);
      if (action === TimePickerAndroid.timeSetAction) {
        this.setState({ hour: hour, minute: minute });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
      hour: newDate.getHours(),
      minute: newDate.getMinutes(),
    });
  }

  render() {
    console.log(this.state.accelerometerData);
    var timeSet;
    const platform = Platform.OS;
    if (platform === 'ios') {
      timeSet = (
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
      );
    } else if (platform === 'android') {
      timeSet = (
        <TouchableOpacity
          style={{
            width: 75,
            height: 75,
            borderRadius: 100,
            backgroundColor: '#2FFFFF',
            fontColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            this.androidSetTime();
          }}
        >
          <Text>Set Time</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#2C2F33',
          alignItems: 'center',
        }}>

        {!this.state.surveyOn &&
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <StatusBar hidden={true} />


            <View
              style={{
                flex: 2,
                marginTop: 50,
                backgroundColor: '#2C2F33',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 40,
                  color: 'red',
                }}>
                Alarm
          </Text>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 48,
                  color: 'white',
                }}>
                SET: {this.format(this.state.hour, this.state.minute)}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 48,
                  color: 'white',
                }}>
                CUR: {this.format(this.state.curHour, this.state.curMin)}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'red',
                }}>
                {this.state.timeStart ? "Alarm On" : "Alarm Off"}
              </Text>
            </View>

            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: '#2C2F33',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 100,
                  backgroundColor: '#2FFFFF',
                  fontColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  Vibration.cancel();
                  if (this.state.timeStart) {
                    this.setState({ ring: false, surveyOn: true, timeStart: false });
                    uploadData(this.state.accelerometerList);
                  }
                }}
              >
                <Text>Stop Alarm</Text>
              </TouchableOpacity>

              {timeSet}

              <TouchableOpacity
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 100,
                  backgroundColor: '#2FFFFF',
                  fontColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({ timeStart: true });
                  console.log("Started");
                }}
              >
                <Text>Start Sleep</Text>
              </TouchableOpacity>
            </View>


            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: '#2C2F33',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 100,
                  backgroundColor: '#2FFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontColor: 'red',
                }}
                onPress={() => { this.onLogout() }}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        {this.state.surveyOn && <Survey updateSurvey={(val) => this.updateSurvey(val)} />}
      </View>
    );
  }
}

function uploadData(list) {
  // var RNFS = require('react-native-fs');
  var name = new Date().toISOString();
  // var path = RNFS.DocumentDirectoryPath + '/' +name + '.txt';
  // RNFS.writeFile(path, JSON.stringify(list))
  // .then(
    var blob = new Blob([JSON.stringify(list, null, 2)], {type : 'application/json'});
    firebase.storage().ref(`/${name}.txt`)
    .put(blob)
    .then(
      RNFS.unlink(path).then(console.log("UPLOADED DATA"),),
    );
  // );
}