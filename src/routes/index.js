import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {AuthProvider} from '../context/contextAuth';
import Stack from './stackRoutes';

export default function Routes() {

    return (
        <NavigationContainer>
            <AuthProvider>
                <Stack />
            </AuthProvider>    
        </NavigationContainer>
    )
}
