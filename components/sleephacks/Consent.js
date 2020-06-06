import * as React from 'react';
import { Text, View, StyleSheet, Image, WebView } from 'react-native';

export default class Consent extends React.Component {
  render() {
    return (
     <WebView
      source = {{uri: 'https://drive.google.com/file/d/1V3Q1xpz8STQaNWChzFqEDku8xz9hfjag/view'}}
     />
    );
  }
}

