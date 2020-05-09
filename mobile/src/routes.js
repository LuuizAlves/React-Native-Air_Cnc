import React, { useEffect, useState } from  'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AsyncStorage} from 'react-native';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const Stack = createStackNavigator();

function Route(){
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Book" component={Book} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Route;