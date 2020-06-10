import React from 'react';
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const AppDrawer = createDrawerNavigator();

import CustomDrawer from './components/CustomDrawer';
import Home from './pages/Home';
import Incidents from './pages/Incidents';
import LatestReviews from './pages/LatestReviews';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppDrawer.Navigator 
                initialRouteName="Inicio" 
                drawerContent= {CustomDrawer}
                drawerContentOptions={{
                    activeTintColor: '#A0522D',
                    activeBackgroundColor: '#00622D',
                    itemStyle: { marginVertical: 5, },
                    labelStyle: { color: '#FFF', fontSize: 15},
                }}
            >
                { true ? (
                    <>
                        <AppDrawer.Screen name = "Inicio" component={Home} />
                        <AppDrawer.Screen name = "Últimas Análises" component={LatestReviews}/>
                        <AppDrawer.Screen name = "Ocorrências" component={Incidents}/>
                    </>
                ): (
                    <AppDrawer.Screen name = "Inicio" component={Home}/>
                )}
            </AppDrawer.Navigator>
        </NavigationContainer>
    )

}
//screenOptions={{headerShown: false}