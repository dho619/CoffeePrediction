import React, {useState} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';

var avatar = require('../../assets/perfil.jpeg');

export default function Profile({navigation}) {

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.header}>
                <Image 
                    source={avatar}
                    style={styles.avatar}
                />
                <View style={styles.infHeader}>
                    <Text style={styles.dtAtivacao}>Ativo desde: 20/06/2020</Text>
                    <TouchableOpacity><Text>Editar informações de perfil</Text></TouchableOpacity>
                </View>
            </View>
            <View style={styles.infGerais}>
                <Text style={styles.name}>Nome: Korapayka Winchester da Silva</Text>
                <Text style={styles.email}>Email: korapaykaWinchester@hunterxhunter.com.br</Text>
            </View>
        </View>
    );
}
