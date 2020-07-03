import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const AppDrawer = createDrawerNavigator();

import CustomDrawer from './components/CustomDrawer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Incidents from './pages/Incidents';
import LatestAnalysis from './pages/LatestAnalysis';
import NewPhotos from './pages/NewPhotos';

var logado = false;

export default function Routes() {
    return (
        <NavigationContainer>
            <AppDrawer.Navigator
                initialRouteName= {logado? "Inicio": "Login"}
                drawerContent= {CustomDrawer}
                drawerContentOptions={{
                    activeTintColor: '#A0522D',
                    activeBackgroundColor: '#00622D',
                    itemStyle: { marginVertical: 5, },
                    labelStyle: { color: '#FFF', fontSize: 15},
                }}
            >
                { logado ? (
                    <>
                        <AppDrawer.Screen dr name = "Inicio" component={Home} />
                        <AppDrawer.Screen name = "Nova Análise" options={{unmountOnBlur: true}} component={NewPhotos}/>
                        <AppDrawer.Screen name = "Últimas Análises" component={LatestAnalysis}/>
                        <AppDrawer.Screen name = "Ocorrências" component={Incidents}/>
                    </>
                ): (
                    <>
                        <AppDrawer.Screen name = "Login" component={Login}/>
                        <AppDrawer.Screen name = "Register" component={Register}/>
                    </>
                )}
            </AppDrawer.Navigator>
        </NavigationContainer>
    )

}