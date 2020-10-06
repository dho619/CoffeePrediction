import React, { useState, useEffect, useContext} from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, 
        ImageBackground, TouchableOpacity, Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';
import Header from '../../components/Header';
import {Context} from '../../context/contextAuth';
import {styles, pickerStyle} from './styles';
import imgArea from '../../assets/area.png';

export default function AreaRegister({route, navigation}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState(-1);
    const [types, setTypes] = useState([]);
    const [creating, setCreating] = useState(true);

    const { user, token } = useContext(Context);
    const { area } = route.params;

    useEffect(()=>{
        let mounted = true;
        handleArea();
        fillTypes();
        return () => mounted = false;
    }, []);

    const handleArea = () => {
        if(area.type_area){
            try {
                setName(area.name);
                setDescription(area.description);
                setLocation(area.location);
                setType(area.type_area.id);
                setCreating(false);
            } catch {
                Alert.alert(
                    "Aviso",
                    'Erro ao carregar a Área',
                    [
                        { text: "OK"}
                    ],
                    { cancelable: false }
                );
                setName('');
                setDescription('');
                setLocation('');
                setType(-1);
                setCreating(true);
                navigation.navigate('Minhas Áreas');
            }
        } else {
            setName('');
            setDescription('');
            setLocation('');
            setType(-1);
            setCreating(true);
        }
    }

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

    const registerOrAlter = async () => {
        
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
        
        const newArea = {
            name, 
            description, 
            type_area_id: type,
            location,
        };

        try{
            if(creating){ //se esta criando uma nova area
                // faz cadastro de area
                newArea.user_id = user.id; //adiciona o usuario q esta logado
                const response = await api.post('areas', newArea, {
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
            } else {
                // faz atualizacao da area
                const response = await api.put(`areas/${area.id}`, newArea, {
                    headers: { 
                        Authorization: `Bearer ${token}`
                    }
                });

                Alert.alert(
                    "Sucesso",
                    'Área atualizada com sucesso!',
                    [
                    { text: "OK"}
                    ],
                    { cancelable: false }
                );
                setName('');
                setDescription('');
                setLocation('');
                setCreating(true);
                navigation.navigate('Minhas Áreas');
            }
            
            
            
            
        }catch(err){
            Alert.alert(
                "Aviso",
                'Erro ao fazer a operação, tente novamente em alguns instantes!',
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
                    <Text style={styles.headerText}>{creating?'Cadastro de Área':'Atualização de Área'}:</Text>
                    <TouchableOpacity 
                        style={styles.btReturnig}
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
                    <TouchableOpacity style={styles.btnSubmit} onPress={registerOrAlter}>
                        <Text style={styles.submitText}>{creating?'Cadastrar Área':'Atualizar Área'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <ImageBackground source={imgArea} style={styles.imageBackground}/>
        </View>
    );
};

