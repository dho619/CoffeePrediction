import React, { useState, useEffect, useContext} from 'react';
import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Context } from '../../context/contextAuth';
import { formatDate } from '../../utils/format';
import Header from '../../components/Header';
import styles from './styles';

var avatar = require('../../assets/perfil.jpeg');

export default function Profile({navigation}) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const { user } = useContext(Context);

    useEffect(() => {
        fillUser();
    }, []);//se mudou o usuario logado, recarrega o usuario usado no drawer

    const fillUser = () => {
        setName(user.name);
        setEmail(user.email);
    }

    const cancelEditing = () => {
        setName(user.name);
        setEditing(false);
    }

    const sendEditing = () => {
        setName(user.name);
        setEditing(false);
    }

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
                    {
                        !editing && 
                        <TouchableOpacity onPress={() => setEditing(true)}>
                            <Text>Editar informações de perfil</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={styles.infGerais}>
                <View style={styles.agroup}>
                    <Text style={styles.field}>Nome: </Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        editable={editing}
                        autoCorrect={false}
                        onChangeText={name => setName(name)}
                    />
                </View>
                <View style={styles.agroup}>
                    <Text style={styles.field}>Email: </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        editable={false}
                        autoCorrect={false}
                        autoCompleteType='email'
                        keyboardType='email-address'    
                        onChangeText={email => setEmail(email)}
                    />
                </View>
                {editing &&    
                    <View style={styles.buttonsArea}>
                        <TouchableOpacity  style={styles.buttons} onPress={cancelEditing}>
                            <AntDesign name="closecircle" size={30} color="black"/>
                            <Text style={styles.textButtons}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.buttons} onPress={sendEditing}>
                            <AntDesign name="check" size={30} color="black" />
                            <Text style={styles.textButtons}>Salvar</Text>
                        </TouchableOpacity>
                    </View>}
            </View>
        </View>
    );
}
