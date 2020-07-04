import React, { useState } from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, ImageBackground} from 'react-native';

import Header from '../../components/Header';
import area from '../../assets/area.png';
import styles from './styles';

export default function AreaRegister({navigation}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState(1);
    const [types, setTypes] = useState([
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
    ])

    return (
        <View style={styles.container} >
            <Header navigation={navigation} />
            <KeyboardAvoidingView style={styles.areaViewKeyboard}>
                <View style={styles.containerHeader}>
                    <Text style={styles.textHeader}> Cadastro de Áreas</Text>
                </View>
                <View style={styles.containerForm}>
                    <TextInput 
                        style={styles.input}
                        value={name}
                        placeholder={'Nome'}
                        autoCorrect={false}
                        onChangeText={name => setName(name)} 
                    />
                    <TextInput 
                        style={styles.inputMultiline}
                        value={description}
                        placeholder={'Descrição'}
                        numberOfLines={3}
                        multiline={true}
                        onChangeText={description => setDescription(description)} 
                    />
                    <TextInput 
                        style={styles.input}
                        value={location}
                        placeholder={'Localização'}
                        keyboardType = 'numeric'
                        onChangeText={location => setLocation(location)} 
                    />
                    
                </View>

            </KeyboardAvoidingView>
            <ImageBackground source={area} style={styles.imageBackground}/>
        </View>
    );
};