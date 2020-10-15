import React, { useState, useEffect, useContext} from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, 
        ImageBackground, TouchableOpacity, Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { execute_db_offline, get_guid } from '../../db/db_offline';
import { isOnline } from '../../services/Network';
import { registerOnline } from './queryArea/registerOnline';
import { registerOffline } from './queryArea/registerOffline';
import { alterOnline } from './queryArea/alterOnline';
import { alterOffline } from './queryArea/alterOffline';

import Header from '../../components/Header';
import {Context} from '../../context/contextAuth';
import {styles, pickerStyle} from './styles';
import imgArea from '../../assets/area.png';

export default function AreaRegister({route, navigation}){
    const [online, setOnline] = useState(false);
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
        setOnline(isOnline())
        handleArea();
        fillTypes();
        return () => mounted = false;
    }, []);

    const handleArea = () => {
        if(area.type_area || area.type_area_id){
            try {
                setName(area.name);
                setDescription(area.description);
                setLocation(area.location);
                setType(area.type_area? area.type_area.id: area.type_area_id);
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
        let types = []
        try {
            
            const type_areas = await execute_db_offline('SELECT * from type_areas order by name');
            await type_areas.map(type => {
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
            console.log(err);
        }
    };

    const registerOrAlter = async () => {
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
        
        const type_area_name = await types.filter(function(type_area) { return type_area.value == type;})[0].label;

        const newArea = {
            name, 
            description, 
            type_area_id: type,
            type_area_name,
            location,
        };

        if(creating){
            newArea.user_id = user.id; 
            if (false){
                await registerOnline(newArea, token)
            } else {
                await registerOffline(newArea)
            }
            setName('');
            setDescription('');
            setLocation('');
            setType(-1);

        }else {
            if (false){
                await alterOnline(area.id, newArea, token)
            } else {
                newArea.user_id = user.id; 
                await alterOffline(area.id, newArea)
            }
            setName('');
            setDescription('');
            setLocation('');
            setCreating(true);
            navigation.navigate('Minhas Áreas');
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

