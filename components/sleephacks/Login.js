import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, KeyboardAvoidingView, StatusBar } from 'react-native';
//import Amplify, { Auth, Storage } from 'aws-amplify';
import { AsyncStorage } from 'react-native';
import firebase from '../firebase.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      retry: '',
      login: false,
      forgotPassword: false,
      changePassword: false,
      error: "",
    };
    this.processLogin = this.processLogin.bind(this);
    this.newPassword = this.newPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  newPassword(email) {
    var actionCodeSettings = {};
    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
      .then(data => {
        this.setState({ forgotPassword: false });
        this.setState({ changePassword: true });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  changePassword(password, confirmCode) {
    firebase.auth().confirmPasswordReset(confirmCode, password)
      .then(data => { this.setState({ changePassword: false }); })
      .catch(err => this.setState({ error: err.message }));
  }

  processLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        this.setState({
          retry: false,
          login: true,
        });
        this.props.screenProps.handleLogin(data);
      }
      )
      .catch(err => {
        this.setState({ error: err.message });
      }
      );
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          {!this.state.forgotPassword && !this.state.changePassword &&
            <View>
              <Text style={styles.paragraph}>Sleep Hacker</Text>

              <View style={{ backgroundColor: '#FDFEFE' }}>
                <TextInput
                  style={{ height: 60 }}
                  placeholder="Email"
                  textContentType="email"
                  onChangeText={email => this.setState({ email })}
                />
              </View>

              <View style={{ backgroundColor: '#FDFEFE' }}>
                <TextInput
                  style={{ height: 60 }}
                  placeholder="Password"
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={password => this.setState({ password })}
                />
              </View>

              <View styles={{}}>
                <Button
                  title="Login"
                  onPress={() =>
                    this.processLogin(this.state.email, this.state.password)
                  }
                />
              </View>

              <View style={{ paddingTop: 20 }}>
                <Button title="forgot password" onPress={() => { this.setState({ forgotPassword: true }); }} />
              </View>
            </View>
          }

          {this.state.forgotPassword && !this.state.changePassword &&
            <View>
              <Text style={styles.paragraph}>Sleep Hacker</Text>
              <Text style={{
                color: 'white',
                margin: 10,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
                Forgot Password
            </Text>

              <View style={{ backgroundColor: '#FDFEFE' }}>
                <TextInput
                  style={{ height: 60 }}
                  placeholder="Email"
                  textContentType="email"
                  onChangeText={email => this.setState({ email })}
                />
              </View>

              <View style={{ paddingTop: 20 }}>
                <Button title="Submit" onPress={() => {
                  this.newPassword(this.state.email)
                }} />
              </View>

              <View style={{ paddingTop: 20 }}>
                <Button title="cancel" onPress={() => { this.setState({ forgotPassword: false }) }} />
              </View>
            </View>

          }


          {!this.state.forgotPassword && this.state.changePassword &&
            <View>
              <Text style={styles.paragraph}>Sleep Hacker</Text>
              <Text style={{
                color: 'white',
                margin: 10,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
                Change Password
            </Text>

              <View style={{ backgroundColor: '#FDFEFE' }}>
                <TextInput
                  style={{ height: 60 }}
                  placeholder="New Password"
                  textContentType="password"
                  onChangeText={password => this.setState({ password })}
                />
              </View>
              <View style={{ backgroundColor: '#FDFEFE' }}>
                <TextInput
                  style={{ height: 60 }}
                  placeholder="confirmCode"
                  onChangeText={confirmCode => this.setState({ confirmCode })}
                />
              </View>

              <View style={{ paddingTop: 20 }}>
                <Button title="Submit" onPress={() => {
                  this.changePassword(this.state.password, this.state.confirmCode);
                }} />
              </View>

              <View style={{ paddingTop: 20 }}>
                <Button title="cancel" onPress={() => { this.setState({ changePassword: false }) }} />
              </View>
            </View>

          }



          {
            <View>
              <Text
                style={{
                  color: 'red',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {this.state.error}
              </Text>
            </View>
          }

        </View>
      </KeyboardAvoidingView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2C2F33',
    padding: 8,
  },
  paragraph: {
    color: 'white',
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
