import React, {useContext} from 'react';
import {Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Context } from '../context/contextAuth';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Drawer from './drawerRoutes';

const AppStack = createStackNavigator();

export default function Stack() {
    //pegando as informacoes se esta logado e se esta carregando informacoes do context
    const { authenticated, loading } = useContext(Context);

    //se esta carregando, fica na tela de carregamento
    if(loading){
        return (
            <Text>Carregando...</Text>
        )
    }

    return (
        <AppStack.Navigator 
            initialRouteName= {authenticated?'Drawer':'Login'}
            headerMode = 'none'
        >
            <AppStack.Screen name="Login" component={Login} />
            <AppStack.Screen name="Register" component={Register} />
            <AppStack.Screen name="Drawer" component={Drawer} />
        </AppStack.Navigator>
    )
}
