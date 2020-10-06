import React, { useContext, useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {Context} from '../context/contextAuth';
import {isSignedIn} from '../context/authenticationFunctions';

import CustomDrawer from '../components/CustomDrawer';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Incidents from '../pages/Incidents';
import LatestAnalysis from '../pages/LatestAnalysis';
import NewPhotos from '../pages/NewPhotos';
import Areas from '../pages/Areas';
import AreaRegister from '../pages/AreaRegister';
import NewClassifications from '../pages/NewClassifications';

const AppDrawer = createDrawerNavigator();

function Drawer() {
    const [user, setUser] = useState({});
    const { user: loggedUser, onSignOut } = useContext(Context);

    useEffect(() => {
        setUser(loggedUser);
    }, [isSignedIn()]);//se mudou o usuario logado, recarrega o usuario usado no drawer

    return (
        <AppDrawer.Navigator
            initialRouteName= {"Inicio"}
            drawerContent= {CustomDrawer}
            screenOptions= {{
                                swipeEnabled: false, 
                                unmountOnBlur: true, //remota as telas quando entra nelas novamente
                                user, onSignOut,
                            }}
            drawerContentOptions={{
                activeTintColor: '#A0522D',
                activeBackgroundColor: '#00622D',
                itemStyle: { marginVertical: 5, },
                labelStyle: { color: '#FFF', fontSize: 15},
            }}
        >
            <AppDrawer.Screen name = "Inicio" component={Home} />
            <AppDrawer.Screen name = "Nova Análise" component={NewPhotos}/>
            <AppDrawer.Screen name = "Últimas Análises" component={LatestAnalysis}/>
            <AppDrawer.Screen name = "Ocorrências" component={Incidents}/>
            <AppDrawer.Screen name = "Minhas Áreas" component={Areas}/>
            <AppDrawer.Screen name = "Profile" component={Profile} />
            <AppDrawer.Screen name = "AreaRegister" component={AreaRegister}/>
            <AppDrawer.Screen name = "NewClassifications" component={NewClassifications}/>
        </AppDrawer.Navigator>
    )
}

export default Drawer;