import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import imgArea from '../../assets/area.png';
import Header from '../../components/Header';
import { Context } from '../../context/contextAuth';
import { execute_db_offline } from '../../db/db_offline';
import { isOnline } from '../../services/Network';
import { alterOffline } from './queryAreaRegister/alterOffline';
import { alterOnline } from './queryAreaRegister/alterOnline';
import { registerOffline } from './queryAreaRegister/registerOffline';
import { registerOnline } from './queryAreaRegister/registerOnline';
import { pickerStyle, styles } from './styles';

export default function AreaRegister({ route, navigation }) {
    const [online, setOnline] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState(-1);
    const [types, setTypes] = useState([]);
    const [creating, setCreating] = useState(true);

    const { user, token } = useContext(Context);
    const { area } = route.params;

    useEffect(() => {
        const loadInfo = async () => {
            const situation = await isOnline();
            setOnline(situation);
            await handleArea();
            await fillTypes();
        }
        let mounted = true;
        loadInfo();
        return () => mounted = false;
    }, []);

    const handleArea = async () => {
        if (area.type_area || area.type_area_id) {
            try {
                setName(area.name);
                setDescription(area.description);
                setLocation(area.location);
                setType(area.type_area ? area.type_area.id : area.type_area_id);
                setCreating(false);
            } catch {
                Alert.alert(
                    "Aviso",
                    'Erro ao carregar a Área',
                    [
                        { text: "OK" }
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
                types.push({ label: type.description, value: type.id });
            });
            setTypes(types);
        } catch (err) {
            Alert.alert(
                "Aviso",
                'Erro ao carregar os tipos de Áreas, tente recarregar a página para resolver o problema!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
            console.log(err);
        }
    };

    const registerOrAlter = async () => {
        if (!user.id) {
            Alert.alert(
                "Aviso",
                'Não foi possível identificar o usuário logado, deslogue e logue novamente para resolver o problema!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
            return '';
        }

        if (name === '') {
            Alert.alert(
                "Aviso",
                'Nescessário preencher o campo de Nome',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
            return '';
        }

        if (location === '') {
            Alert.alert(
                "Aviso",
                'Nescessário preencher o campo de Localização',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
            return '';
        }

        if (type === -1) {
            Alert.alert(
                "Aviso",
                'Nescessário preencher o Tipo de Área',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
            return '';
        }

        const type_area_name = await types.filter(type_area => type_area.value == type)[0].label;

        const newArea = {
            name,
            description,
            type_area_id: type,
            type_area_name,
            location,
        };

        if (creating) {
            newArea.user_id = user.id;
            let sucess = false;
            if (online) {
                sucess = await registerOnline(newArea, token)
            } else {
                sucess = await registerOffline(newArea)
            }
            if (sucess) {
                setName('');
                setDescription('');
                setLocation('');
                setType(-1);
            }

        } else {
            if (online) {
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
                    <Text style={styles.headerText}>{creating ? 'Cadastro de Área' : 'Atualização de Área'}:</Text>
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
                        keyboardType='numeric'
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
                        <Text style={styles.submitText}>{creating ? 'Cadastrar Área' : 'Atualizar Área'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <ImageBackground source={imgArea} style={styles.imageBackground} />
        </View>
    );
};

