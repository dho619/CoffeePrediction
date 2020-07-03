import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

import Login from '../pages/Login';
import Register from '../pages/Register';
import Drawer from './drawerRoutes';

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