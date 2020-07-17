import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { AntDesign, } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

var avatar = require('../../assets/perfil.jpeg');
import styles from './styles';

export default function CustomDrawer({...props}){
    const { state, ...rest } = props; // pegar os state (os itens que aparecerao na gaveta)
    const newState = { ...state}  //copia o state para não altera o original 
    newState.routes = newState.routes.filter(item => item.name !== 'Profile') //pega todos menos o Profile
    
    const {user, onSignOut} = props.descriptors[props.state.routes[0].key].options;
    
    const signOut = () => {
        onSignOut()
        props.navigation.navigate('Login')
    }

    const accessProfile = () => {
        props.navigation.navigate('Profile')
    }

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
                    <TouchableOpacity onPress={accessProfile} >
                        <Image 
                            source={avatar}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                    <View style={styles.userText}>
                        <TouchableOpacity onPress={accessProfile} >
                            <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.email}>{user.email}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.btLogout}
                        onPress={signOut}   
                    >
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
                <DrawerItemList state={newState} {...rest} />
            </View>
        </View>
    );
}