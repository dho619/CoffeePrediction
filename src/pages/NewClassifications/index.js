import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, 
         TextInput, Image, ImageBackground, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';
import {Context} from '../../context/contextAuth';
import Header from '../../components/Header';
import {styles, pickerStyle} from './styles';
import background from '../../assets/FundoClassification.png';

export default function NewPhotos({route, navigation}) {
    const [uri, setUri] = useState('../../assets/loading.png');
    const [photo, setPhoto] = useState('');
    const [areas, setAreas] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState(-1);

    const { user, token } = useContext(Context);

    useEffect(() => {
        const { uriPhoto, capturedPhoto } = route.params;
        fillAreas();
        setUri(uriPhoto);
        setPhoto(capturedPhoto);
    }, []);

    const fillAreas = async () => {
        try {
            const response = await api.get('areas', {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
            });
            const areas = []
            await response.data.data.map(area => {
                areas.push({label: area.name, value: area.id});
            });
            setAreas(areas);
        } catch (err) {
            Alert.alert(
                "Aviso",
                'Erro ao carregar as Áreas, tente recarregar a página para resolver o problema!',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
        }
    };

    const submitClassification = async () => {
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

        //verificar se a area esta vazio
        if(area === -1){
            Alert.alert(
                "Aviso",
                'Nescessário preencher a Área',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return '';
        }
        
        const classification = {
            name, 
            description, 
            area_id: area,
            image: photo,
            user_id: user.id,
        };

        try{
            // faz cadastro de classificacao
            const response = await api.post('classifications', classification, {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
            });

            Alert.alert(
                "Sucesso",
                'Foto enviada para análise!',
                [
                  { text: "OK"}
                ],
                { cancelable: false }
            );

            setName('');
            setDescription('');            
            
        }catch(err){
            console.log(err)
            Alert.alert(
                "Aviso",
                'Erro ao fazer o envio, tente novamente em alguns instantes!',
                [
                { text: "OK"}
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
                    source={{uri}}
                    style={styles.imgFolha}
                />
                <TextInput 
                    style={styles.input}
                    value={name}
                    placeholder={'Dê um nome para a Análise'}
                    autoCorrect={false}
                    onChangeText={name => setName(name)} 
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
                <View style={{ flex : 1 }} />
            </KeyboardAvoidingView>
        <ImageBackground source={background} style={styles.imageBackground} />
    </View>
    );
}