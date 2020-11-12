import React, { useState, useEffect, useContext } from 'react';
import {
    Text, View, TouchableOpacity, KeyboardAvoidingView,
    TextInput, Image, Alert
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';

import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import { registerOnline } from './queryClassificatioons/insertOnline';
import { registerOffline } from './queryClassificatioons/insertOffline';
import { fillAreasOffline } from '../Areas/queryArea/fillAreasOffline';
import { fillAreasOnline } from '../Areas/queryArea/fillAreasOnline';
import Header from '../../components/Header';
import { styles, pickerStyle } from './styles';

export default function NewPhotos({ route, navigation }) {
    const [online, setOnline] = useState(false);
    const [uri, setUri] = useState('../../assets/loading.png');
    const [photo, setPhoto] = useState('');
    const [location, setLocation] = useState('');
    const [areas, setAreas] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState(-1);

    const { user, token } = useContext(Context);

    useEffect(() => {
        const loadInfo = async () => {
            const { uriPhoto, capturedPhoto, location } = route.params;
            const situation = await isOnline();
            setOnline(situation);
            setUri(uriPhoto);
            setPhoto(capturedPhoto);
            setLocation(location);
            await fillAreas();
        }
        let mounted = true;
        loadInfo();
        return () => mounted = false;
    }, []);


    const fillAreas = async () => {

        if (online) {
            const response = await fillAreasOnline(token)
            let loadedAreas = [];
            await response.map(area => {
                loadedAreas.push({ label: area.name, value: area.id });
            });
            setAreas(loadedAreas);
        } else {
            const response = await fillAreasOffline(user.areas)
            let loadedAreas = [];
            await response.map(area => {
                loadedAreas.push({ label: area.name, value: area.id });
            });
            setAreas(loadedAreas);
        }


    }

    const submitClassification = async () => {
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

        //verificar se nome esta vazio
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

        //verificar se a area esta vazio
        if (area === -1) {
            Alert.alert(
                "Aviso",
                'Nescessário preencher a Área',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
            return '';
        }

        const area_name = await areas.filter(areaComboBox => areaComboBox.value == area)[0].label;

        const classification = {
            name,
            description,
            area_id: area,
            area_name,
            image: photo,
            user_id: user.id,
            location: location,
        };
        let sucess = false;
        if (online) {
            sucess = await registerOnline(classification, token);
        } else {
            sucess = await registerOffline(classification, uri);
        }

        if (sucess) {
            setName('');
            setDescription('');
            navigation.navigate('Inicio')
        } else {
            // console.log(err)
            Alert.alert(
                "Aviso",
                'Erro ao fazer o envio, tente novamente em alguns instantes!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <KeyboardAvoidingView style={styles.formClassification}>
                <Image
                    source={{ uri }}
                    style={styles.imgFolha}
                />
                <TextInput
                    style={styles.input}
                    value={name}
                    placeholder={'Dê um nome para a Análise'}
                    autoCorrect={false}
                    onChangeText={name => setName(name)}
                    maxLength={50}
                />
                <TextInput
                    style={styles.inputMultiline}
                    value={description}
                    placeholder={'Dê uma descrição para melhorar identificar a análise'}
                    numberOfLines={3}
                    maxLength={500}
                    multiline={true}
                    onChangeText={description => setDescription(description)}
                />

                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione a área dessa folha',
                        value: -1,
                    }}
                    items={areas}
                    onValueChange={value => setArea(value)}
                    value={area}
                    style={pickerStyle}
                    useNativeAndroidPickerStyle={false} //android only
                    Icon={() => {
                        return <AntDesign name="downcircleo" size={24} color="black" />;
                    }}
                />

                <TouchableOpacity style={styles.btnSubmit} onPress={submitClassification}>
                    <Text style={styles.submitText}>Enviar Para Análise</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
            </KeyboardAvoidingView>
        </View>
    );
}