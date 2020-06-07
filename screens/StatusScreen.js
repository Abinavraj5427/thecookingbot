import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';


import { MonoText } from '../components/StyledText';

export default function StatusScreen(){
    return(
        <View>
            <ScrollView>
                <TouchableOpacity>
                    <MonoText>
                        Status: Ready
                    </MonoText>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}