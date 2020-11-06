import React, { useState, useEffect, useContext } from 'react';
import {
    Text, TextInput, View, Image, TouchableOpacity,
    KeyboardAvoidingView, Keyboard, Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import { formatDatePython, dateNow } from '../../utils/date';
import Header from '../../components/Header';
import styles from './styles';
import { updateOnline } from './queryClassification/updateOnline';
import { updateOffline } from './queryClassification/updateOffline';
import { handleDeleteOffline } from './queryClassification/deleteClassificationOffline';
import { handleDeleteOnline } from './queryClassification/deleteClassificationOnline';

var avatar = require('../../assets/perfil.jpeg');

export default function Analyze({ route, navigation }) {
    const [online, setOnline] = useState(false);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [widthImage, setWidthImage] = useState(120);
    const [heightImage, setHeightImage] = useState(200);

    const { user, token } = useContext(Context);

    const { classification, sentToAPI } = route.params;

    useEffect(() => {
        const loadInfo = async () => {
            const situation = await isOnline();
            setOnline(false);
            await fillClassification();
            keboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
            keboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        }
        let mounted = true;
        loadInfo();
        return () => mounted = false;
    }, []);

    const fillClassification = async () => {
        setName(classification.name);
        setDescription(classification.description);
    }

    function keyboardDidShow() {
        setHeightImage(135);
        setWidthImage(80);
    }

    function keyboardDidHide() {
        setHeightImage(200);
        setWidthImage(120);
    }

    function clearFields() {
        setName(classification.name);
        setDescription(classification.description);
        setEditing(false);
    }

    const cancelEditing = () => {
        clearFields();
    }

    const deleteclassification = (id) => {
        async function handleDelete(id) {
            if (online) {
                await handleDeleteOnline(id, token);
            } else {
                await handleDeleteOffline(id, user.areas);
            }
            navigation.navigate('Últimas Análises');
        }

        Alert.alert(
            "Confirmação:",
            "Deseja realmente apagar essa Análise?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => handleDelete(id) }
            ],
            { cancelable: false }
        );
    }

    const sendEditing = async () => {
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

        const updateClassification = { name, description };

        let success = false;
        if (online) {
            success = await updateOnline(user.id, updateClassification, token);
        } else {
            success = await updateOffline(user.id, updateClassification);
        }

        if (success) {
            user.name = name;
            user.updated_at = dateNow(false, true);
            clearFields();
            Alert.alert(
                "Sucess",
                'Classificação atualizada com sucesso!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Aviso",
                'Erro ao fazer a atualização, tente novamente em alguns instantes!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
        fillClassification();
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <Header navigation={navigation} />
                <TouchableOpacity
                    style={styles.iconBack}
                    onPress={() => navigation.navigate('Últimas Análises')}
                >
                    <AntDesign name="arrowleft" size={50} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.classificationData}>
                <Image
                    source={avatar}
                    style={[styles.photo, { width: widthImage, height: heightImage }]}
                />
                <View style={[styles.agroupInformation, { height: heightImage }]}>
                    <View>
                        {sentToAPI ?
                            <>
                                <Text style={styles.informations}>Enviado: {formatDatePython(classification.created_at)}</Text>
                                <Text style={styles.informations}>Última Atualização: {formatDatePython(classification.updated_at)}</Text>
                                {false ?
                                    <Text style={styles.classificationInformation}>Pendente de análise!</Text>
                                    :
                                    <>
                                        <Text style={styles.classificationInformation}>Doente: {classification.healthy ? 'Não' : 'Sim'}</Text>
                                        {!classification.healthy &&
                                            <Text style={styles.classificationInformation}>Doença: {classification.disease}</Text>
                                        }
                                    </>
                                }
                            </> :
                            <>
                                <Text style={styles.informations}>Imagem Ainda não enviada para análise, será enviada assim que tiver uma conexão.</Text>
                            </>
                        }
                    </View>
                    {
                        !editing &&
                        <TouchableOpacity
                            onPress={() => setEditing(true)}
                            style={styles.btEditar}
                        >
                            <Text style={styles.txtBtEditar}>
                                Editar Cabeçalho
                                </Text>
                            <AntDesign name="edit" size={24} color="#00622D" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={styles.infGerais}>
                <Text style={styles.field}>Nome: </Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    editable={editing}
                    autoCorrect={false}
                    multiline={true}
                    onChangeText={name => setName(name)}
                    maxLength={100}
                />
                <Text style={styles.field}>Descrição: </Text>
                <TextInput
                    style={styles.inputMultiline}
                    value={description}
                    placeholder={'Descrição da análise'}
                    editable={editing}
                    numberOfLines={3}
                    maxLength={500}
                    multiline={true}
                    onChangeText={description => setDescription(description)}
                />

                {editing ?
                    <View style={styles.buttonsArea}>
                        <TouchableOpacity style={styles.buttons} onPress={cancelEditing}>
                            <AntDesign name="closecircle" size={30} color="black" />
                            <Text style={styles.textButtons}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={sendEditing}>
                            <AntDesign name="check" size={30} color="black" />
                            <Text style={styles.textButtons}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity
                        onPress={() => deleteclassification(classification.id)}
                        style={styles.btDelete}
                    >
                        <Text style={styles.txtBtDelete}>
                            Excluir classificação
                            </Text>
                        <AntDesign name="delete" size={24} color="#B22222" />
                    </TouchableOpacity>
                }
            </View>
        </KeyboardAvoidingView>
    );
}
