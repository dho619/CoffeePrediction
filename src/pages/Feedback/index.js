import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Header from '../../components/Header';
import { pickerStyle, styles } from './styles';



export default function Feedback({ navigation }) {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        setSubjects([
            { label: "Relatar Bug", value: "Relatar Bug" },
            { label: "Sugestão de Melhoria", value: "Sugestão de Melhoria" },
            { label: "Outros", value: "Outros" }
        ]);
    }, []);

    const submitFeedback = () => {

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