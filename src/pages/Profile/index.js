import React, { useState, useEffect, useContext} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import { Context } from '../../context/contextAuth';
import { formatDate } from '../../utils/format';
import Header from '../../components/Header';
import styles from './styles';

var avatar = require('../../assets/perfil.jpeg');

export default function Profile({navigation}) {
    const [loggedUser, setLoggedUser] = useState({});
    const { user } = useContext(Context);

    useEffect(() => {
        setLoggedUser(user);
    }, []);//se mudou o usuario logado, recarrega o usuario usado no drawer

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.header}>
                <Image 
                    source={avatar}
                    style={styles.avatar}
                />
                <View style={styles.infHeader}>
                    <Text style={styles.dtAtivacao}>Ativo desde: {formatDate(user.created_at)}</Text>
                    <TouchableOpacity><Text>Editar informações de perfil</Text></TouchableOpacity>
                </View>
            </View>
            <View style={styles.infGerais}>
                <Text style={styles.name}>Nome: {user.name}</Text>
                <Text style={styles.email}>Email: {user.email} </Text>
            </View>
        </View>
    );
}
