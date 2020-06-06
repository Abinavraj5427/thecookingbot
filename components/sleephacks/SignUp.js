import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import RoundCheckbox from 'rn-round-checkbox';
import firebase from '../firebase.js';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      email: '',
      login: false,
      consent: false,
    };
    this.processSignUp = this.processSignUp.bind(this);
  }

  processSignUp() {
    if (this.state.consent) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(data => {
          this.props.screenProps.handleLogin(data);
          console.log('successful sign up: ' + data)
        })
        .catch(err => console.log('failure to sign up: ' + err));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Sign Up</Text>

        <View>
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

          <View style={{ flexDirection: 'row' }}>
            <View>
              <RoundCheckbox
                size={24}
                checked={this.state.consent}
                onValueChange={value => {
                  this.setState({ consent: value });
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16, color: 'white' }}>
                I have read and agree to the terms and conditions as stated in the
                consent form.
            </Text>
            </View>
          </View>

          <View styles={{}}>
            <Button
              title="Sign Up"
              onPress={() => {
                this.processSignUp();
              }
              }
            />
          </View>
        </View>
      </View>
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
