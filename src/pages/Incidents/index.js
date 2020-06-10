import React from 'react';
import { View, Text } from 'react-native'

import Header from '../../components/Header';

export default function Incidents({...props}) {
    return (
        <View style={{ flex: 1}}>
            <Header {...props}/>
            <Text>Incidents</Text>
        </View>
    )
}