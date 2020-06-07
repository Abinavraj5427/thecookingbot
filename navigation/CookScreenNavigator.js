import { createBottomTabNavigator, createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import StatusScreen from '../screens/HomeScreen';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()

export default function CookScreenNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = 'Status' component = {StatusScreen}/>
                <Stack.Screen name = 'Information' component = {HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}