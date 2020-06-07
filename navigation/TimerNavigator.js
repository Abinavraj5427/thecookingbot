import { createStackNavigator } from '@react-navigation/stack';


import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import TimerScreen from '../screens/TimerScreen';
import TimeStampScreen from '../screens/TimeStampScreen';
import ListComponent from '../screens/HomeScreen';

import LinksScreen from '../screens/LinksScreen';
import { NavigationContainer, Link } from '@react-navigation/native';

const Stack = createStackNavigator()
const INITIAL_ROUTE_NAME = 'Status';

export default function TimerNavigator({navigation, route}){
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return(
        <Stack.Navigator initialRouteName = 'Timer'>
            <Stack.Screen options={{headerShown: false}} name = 'Timer' component = {TimerScreen}/>
            <Stack.Screen name = 'Recipe Component' component = {TimeStampScreen}/>
        </Stack.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  
    switch (routeName) {
      case 'Timer':
        return 'Timer';
      case 'Recipe Component':
        return 'Recipe Component';
    }
}