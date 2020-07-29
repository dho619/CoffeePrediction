import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Image, ImageBackground } from 'react-native'

import Header from '../../components/Header';
import styles from './styles';
import background from '../../assets/FundoClassification.png';

export default function NewPhotos({route, navigation}) {
    const [uri, setUri] = useState('../../assets/loading.png');
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const x = '../../assets/perfil.png';
    useEffect(() => {
        const { uriPhoto, capturedPhoto } = route.params;
        setUri(uriPhoto);
        setPhoto(capturedPhoto);
    }, []);

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
                
                <TouchableOpacity style={styles.btnSubmit} onPress={() => {}}>
                    <Text style={styles.submitText}>Enviar Para Análise</Text>
                </TouchableOpacity>
                <View style={{ flex : 1 }} />
            </KeyboardAvoidingView>
        <ImageBackground source={background} style={styles.imageBackground} />
    </View>
    );
}