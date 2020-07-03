import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const AppDrawer = createDrawerNavigator();
const Stack = createStackNavigator();

import CustomDrawer from './components/CustomDrawer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Incidents from './pages/Incidents';
import LatestAnalysis from './pages/LatestAnalysis';
import NewPhotos from './pages/NewPhotos';

function Drawer() {
    return (
        <AppDrawer.Navigator
            initialRouteName= {"Inicio"}
            drawerContent= {CustomDrawer}
            drawerContentOptions={{
                activeTintColor: '#A0522D',
                activeBackgroundColor: '#00622D',
                itemStyle: { marginVertical: 5, },
                labelStyle: { color: '#FFF', fontSize: 15},
            }}
        >
            <AppDrawer.Screen dr name = "Inicio" component={Home} />
            <AppDrawer.Screen name = "Nova Análise" options={{unmountOnBlur: true}} component={NewPhotos}/>
            <AppDrawer.Screen name = "Últimas Análises" component={LatestAnalysis}/>
            <AppDrawer.Screen name = "Ocorrências" component={Incidents}/>
        </AppDrawer.Navigator>
    )
}

export default function Routes() {
    return (
        <NavigationContainer>
        <Stack.Navigator 
            initialRouteName= {"Login"}
            headerMode = 'none'
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Drawer" component={Drawer} />
        </Stack.Navigator>    
        </NavigationContainer>
    )
}

//<AppDrawer.Screen name = "Login" component={Login}/>
//<AppDrawer.Screen name = "Register" component={Register}/>