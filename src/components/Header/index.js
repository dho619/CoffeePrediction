import React from 'react';
import { TouchableOpacity, View, SafeAreaView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

import styles from './styles';

export default function Header({...props}) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                style={styles.btMenu}
                onPress={props.navigation.openDrawer}
            >
                <AntDesign 
                    name="menu-fold"
                    size={50}
                    color="black"
                />
            </TouchableOpacity> 
        </SafeAreaView>
    )
}