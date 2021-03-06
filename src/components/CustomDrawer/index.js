import React from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { AntDesign, } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { execute_db_offline } from '../../db/db_offline';

import styles from './styles';

//itens da gaveta que ficarao escondidos
const hiddenItems = ['Profile', 'AreaRegister', 'NewClassifications', 'Classification', 'Feedback'];

export default function CustomDrawer({ ...props }) {
    const { state, ...rest } = props; // pegar os state (os itens que aparecerao na gaveta)
    const newState = { ...state }  //copia o state para não altera o original 
    newState.routes = newState.routes.filter(item => hiddenItems.indexOf(item.name) === -1)
    //pega todos que nao estao em hiddenItems

    const { user, onSignOut } = props.descriptors[props.state.routes[0].key].options;

    const loadUser = async () => {
        let userOffline = []
        try {
            userOffline = await execute_db_offline("SELECT * FROM users WHERE id = ?", [user.id]);
        } catch{

        }
        if (userOffline.length) {
            try {
                user.name = userOffline[0].name;
                user.email = userOffline[0].email;
            } catch{
            }
        }
    }

    const signOut = () => {
        onSignOut()
        props.navigation.navigate('Login');
    }

    const accessProfile = () => {
        props.navigation.navigate('Profile');
    }

    loadUser();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.btBack}
                    onPress={props.navigation.closeDrawer}
                >
                    <Ionicons
                        name="md-arrow-round-back"
                        size={35}
                        color="black"
                    />
                </TouchableOpacity>
                <View style={styles.userArea}>
                    <TouchableOpacity onPress={accessProfile} >
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{`${user.name}`.substring(0, 1)}</Text>
                        </View>
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