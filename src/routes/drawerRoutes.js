import React, { useContext, useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {Context} from '../context/contextAuth';
import {isSignedIn} from '../services/auth'

import CustomDrawer from '../components/CustomDrawer';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Incidents from '../pages/Incidents';
import LatestAnalysis from '../pages/LatestAnalysis';
import NewPhotos from '../pages/NewPhotos';
import AreaRegister from '../pages/AreaRegister';

const AppDrawer = createDrawerNavigator();

function Drawer({navigation}) {
    const [user, setUser] = useState({});
    const { user: loggedUser} = useContext(Context);

    useEffect(() => {
        setUser(loggedUser);
        console.log(loggedUser.name)
    }, [isSignedIn()]);

    return (
        <AppDrawer.Navigator
            initialRouteName= {"Inicio"}
            drawerContent= {CustomDrawer}
            screenOptions= {{swipeEnabled: false, user}}
            drawerContentOptions={{
                activeTintColor: '#A0522D',
                activeBackgroundColor: '#00622D',
                itemStyle: { marginVertical: 5, },
                labelStyle: { color: '#FFF', fontSize: 15},
            }}
        >
            <AppDrawer.Screen name = "Inicio" component={Home} />
            <AppDrawer.Screen name = "Profile" options={{ }} component={Profile} />
            <AppDrawer.Screen name = "Nova Análise" options={{unmountOnBlur: true}} component={NewPhotos}/>
            <AppDrawer.Screen name = "Últimas Análises" component={LatestAnalysis}/>
            <AppDrawer.Screen name = "Ocorrências" component={Incidents}/>
            <AppDrawer.Screen name = "Cadastrar Nova Área" component={AreaRegister}/>
        </AppDrawer.Navigator>
    )
}

export default Drawer;