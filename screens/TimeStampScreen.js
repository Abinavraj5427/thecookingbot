import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';


import { MonoText } from '../components/StyledText';

export default function TimeStampScreen(props){
    const {navigation} = props
    return(
        <View>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.replace('Dashboard')}>
                    <MonoText style={styles.developmentModeText}>
                        TimeSTAMP SCREEEN
                    </MonoText>
                    <MonoText style = {styles.readyMessage}>
                        Ready
                    </MonoText>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    developmentModeText: {
      margin:40,
      fontSize: 24,
      textAlign: 'center',
    },
    readyMessage: {
        margin:40, 
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'green'
    },
});