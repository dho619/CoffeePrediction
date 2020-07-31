import React, { useState, useEffect, useContext} from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, 
        ImageBackground, TouchableOpacity, Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';
import Header from '../../components/Header';
import area from '../../assets/area.png';
import {Context} from '../../context/contextAuth';
import {styles, pickerStyle} from './styles';

export default function AreaRegister({navigation}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState(-1);
    const [types, setTypes] = useState([]);

    const { user, token } = useContext(Context);

    useEffect(()=>{
        fillTypes();
    }, []);

    const fillTypes = async () => {
        try {
            const response = await api.get('typeAreas', {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
              });
            const types = []
            await response.data.data.map(type => {
                types.push({label: type.description, value: type.id});
            });
            setTypes(types);
        } catch (err) {
            Alert.alert(
                "Aviso",
                'Erro ao carregar os tipos de Áreas, tente recarregar a página para resolver o problema!',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
        }
    };

    const register = async () => {
        
        //verificar se nome esta vazio
        if(!user.id){
            Alert.alert(
                "Aviso",
                'Não foi possível identificar o usuário logado, deslogue e logue novamente para resolver o problema!',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return '';
        }

        //verificar se nome esta vazio
        if(name === ''){
            Alert.alert(
                "Aviso",
                'Nescessário preencher o campo de Nome',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return '';
        }

        //verificar se a localizacao esta vazio
        if(location === ''){
            Alert.alert(
                "Aviso",
                'Nescessário preencher o campo de Localização',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return '';
        }

        //verificar se o Type esta vazio
        if(type === -1){
            Alert.alert(
                "Aviso",
                'Nescessário preencher o Tipo de Área',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return '';
        }
        
        const area = {
            name, 
            description, 
            type_area_id: type,
            location,
            user_id: user.id,
        };

        try{
            // faz cadastro de area
            const response = await api.post('areas', area, {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
            });

            Alert.alert(
                "Sucesso",
                'Área cadastrada com sucesso!',
                [
                  { text: "OK"}
                ],
                { cancelable: false }
            );

            setName('');
            setDescription('');
            setLocation('');
            
            
        }catch(err){
            Alert.alert(
                "Aviso",
                'Erro ao fazer o cadastro, tente novamente em alguns instantes!',
                [
                { text: "OK"}
                ],
                { cancelable: false }
            );
        }

    }

    return (
        <View style={styles.container} >
            <Header navigation={navigation} />
            <KeyboardAvoidingView style={styles.areaViewKeyboard}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Cadastro de Áreas:</Text>
                    <TouchableOpacity 
                        style={styles.btNewArea}
                        onPress={() => navigation.navigate('Minhas Áreas')}
                    >
                        <Ionicons name="ios-arrow-round-back" size={60} color="white" />
                    </TouchableOpacity>
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
                        maxLength={500}
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
                    <TouchableOpacity style={styles.btnSubmit} onPress={register}>
                        <Text style={styles.submitText}>Cadastrar Área</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <ImageBackground source={area} style={styles.imageBackground}/>
        </View>
    );
};

