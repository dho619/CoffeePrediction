import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer'
import { AntDesign,  } from '@expo/vector-icons'; {/*name=login or logout*/}
import { Ionicons } from '@expo/vector-icons';

var avatar = require('../../assets/perfil.jpeg');
import styles from './styles';

export default function CustomDrawer({...props}){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.btBack}
                    onPress={props.navigation.closeDrawer}
                >
                    <Ionicons 
                        name="md-arrow-round-back"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
                <View style={styles.userArea}>
                    <Image 
                        source={avatar}
                        style={styles.avatar}
                    />
                    <View style={styles.userText}>
                        <Text style={styles.name}>Korapayka</Text>
                        <Text numberOfLines={1} style={styles.email}>Kora@email.com</Text>
                    </View>
                    <TouchableOpacity style={styles.btLogin}>
                        <AntDesign 
                            name="logout" 
                            size={28} 
                            color="black" 
                        />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                    style={styles.titleArea}
                    onPress={() => props.navigation.navigate('Inicio')}
                >
                    <Text style={styles.title}>Assistant of coffee Glower</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.props}>
                <DrawerItemList {...props} />
            </View>
        </View>
    );
}

