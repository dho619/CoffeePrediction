import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import api from '../../services/api';
import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import Header from '../../components/Header';
import { pickerStyle, styles } from './styles';

export default function Feedback({ navigation }) {
    const [online, setOnline] = useState(false);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('-1');
    const [subjects, setSubjects] = useState([]);
    const [feedback, setFeedback] = useState('');

    const { token } = useContext(Context);

    useEffect(() => {
        const loadInfo = async () => {
            const situation = await isOnline();
            setOnline(situation);
            setSubjects([
                { label: "Relatar Bug", value: "Relatar Bug" },
                { label: "Sugestão de Melhoria", value: "Sugestão de Melhoria" },
                { label: "Outros", value: "Outros" }
            ]);
        }
        let mounted = true;
        loadInfo();
        return () => mounted = false;
    }, []);

    const clearFields = () => {
        setEmail('');
        setSubject('');
        setFeedback('');
    };


    const submitFeedback = async () => {
        if (!online) {
            Alert.alert(
                "Aviso",
                'Desculpe, não encontramos conexão com a internet!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
        if (subject == -1) {
            Alert.alert(
                "Aviso",
                'Nenhum assunto selecionado',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
            return '';
        }

        if (feedback === '') {
            Alert.alert(
                "Aviso",
                'Nenhuma mensagem a ser enviada',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
            return '';
        }


        const feedbackInfo = {
            subject,
            message: feedback,
            returnEmail: email
        }
        try {
            const response = await api.post('sendFeedback', feedbackInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Alert.alert(
                "Sucesso",
                'Muito obrigado pelo feedback, ele é muito importante para nós!!!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );

            clearFields();
        } catch (err) {
            Alert.alert(
                "Erro",
                'Erro ao enviar feedback, tente novamente mais tarde!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Feedback</Text>
            </View>
            <View style={styles.feedbackContainer}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione um assunto',
                        value: -1,
                    }}
                    items={subjects}
                    onValueChange={value => setSubject(value)}
                    value={subject}
                    style={pickerStyle}
                    useNativeAndroidPickerStyle={false} //android only
                    Icon={() => {
                        return <AntDesign name="downcircleo" size={24} color="black" />;
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email para respondermos (opcional)"
                    autoCompleteType='email'
                    keyboardType='email-address'
                    value={email}
                    autoCorrect={false}
                    onChangeText={email => setEmail(email)}
                    onEndEditing={e => setEmail(e.nativeEvent.text.trim())}
                />
                <TextInput
                    style={styles.inputMultiline}
                    value={feedback}
                    placeholder={'Deixe seu feedback aqui...'}
                    numberOfLines={4}
                    maxLength={700}
                    multiline={true}
                    onChangeText={feedback => setFeedback(feedback)}
                />
                <TouchableOpacity style={styles.btnSubmit} onPress={() => submitFeedback()}>
                    <Text style={styles.submitText}>Enviar</Text>
                    <Entypo name="paper-plane" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}