import React, { useState } from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, ImageBackground, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';

import Header from '../../components/Header';
import area from '../../assets/area.png';
import folhas from '../../assets/folhas.png';
import {styles, pickerStyle} from './styles';

export default function AreaRegister({navigation}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState(0);
    const [types, setTypes] = useState([
        {label: 'Fazenda', value: 0},
        {label: 'Chácara', value: 1},
    ]);

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
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione um tipo de área',
                            value: -1,
                        }}
                        items={types}
                        onValueChange={value => setType(value)}
                        value={type}
                        style={pickerStyle}
                        useNativeAndroidPickerStyle={false} //android only
                        Icon={() => {
                            return <AntDesign name="downcircleo" size={24} color="black" />;
                        }}
                    />
                    
                </View>

            </KeyboardAvoidingView>
            <ImageBackground source={area} style={styles.imageBackground}/>
        </View>
    );
};

