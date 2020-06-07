import { createStackNavigator } from '@react-navigation/stack';


import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import StatusScreen from '../screens/StatusScreen';
import HomeScreen from '../screens/HomeScreen';
import TimeStampScreen from '../screens/TimeStampScreen';
import ListComponent from '../screens/HomeScreen';

import LinksScreen from '../screens/LinksScreen';
import { NavigationContainer, Link } from '@react-navigation/native';

const Stack = createStackNavigator()
const INITIAL_ROUTE_NAME = 'Status';
export default function CookScreenNavigator({navigation, route}){
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return(
        <Stack.Navigator initialRouteName = 'Status'>
            <Stack.Screen name = 'Status' component = {StatusScreen}/>
            <Stack.Screen name = 'Dashboard' component = {HomeScreen}/>
            <Stack.Screen name = 'Recipe Component' component = {TimeStampScreen}/>
        </Stack.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  
    switch (routeName) {
      case 'Status':
        return 'Status';
      case 'Dashboard':
        return 'Dashboard';
    }
}