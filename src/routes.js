import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const AppDrawer = createDrawerNavigator();

import Home from './pages/Home';
import Incidents from './pages/Incidents';
import LatestReviews from './pages/LatestReviews';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppDrawer.Navigator screenOptions={{headerShown: false}}>
                <AppDrawer.Screen name = "Inicio" component={Home}/>
                <AppDrawer.Screen name = "Últimas Análises" component={LatestReviews}/>
                <AppDrawer.Screen name = "Ocorrências" component={Incidents}/>
            </AppDrawer.Navigator>
        </NavigationContainer>
    )

}