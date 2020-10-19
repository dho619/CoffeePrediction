import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';
import { Context } from '../../context/contextAuth';
import Header from '../../components/Header';
import styles from './styles';

export default function LatestAnalysis({ navigation }) {
    const [classification, setClassification] = useState([]);
    const [selectedClassification, setSelectedClassification] = useState(-1);

    const { token } = useContext(Context);

    useEffect(() => {
        let mounted = true;
        fillClassification();
        return () => mounted = false;
    }, []);

    const fillClassification = async () => {
        try {
            const response = await api.get('classifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setClassification(response.data.data);
        } catch (err) {
            Alert.alert(
                "Aviso",
                'Erro ao carregar as Análises, tente recarregar a página para resolver o problema!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
    }

    const deleteclassification = (id) => {
        async function handleDelete(id) {
            const response = await api.delete(`classifications/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status = 201) {
                fillClassification();
                alert('Análise apagada com sucesso!')
            }
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

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Últimas Análises:</Text>
            </View>
            <View style={styles.classificationContainer}>
                <ScrollView style={styles.classificationList}>
                    {
                        classification.map(classification => (
                            <TouchableOpacity
                                key={classification.id}
                                style={selectedClassification === classification.id ? styles.classificationSelected : styles.classification}
                                onPress={() => { setSelectedClassification(selectedClassification === classification.id ? -1 : classification.id) }}
                            >
                                <Text style={styles.classificationHeader}>Nome: {classification.name}</Text>
                                <Text style={styles.classificationDesc} numberOfLines={selectedClassification === classification.id ? 100 : 1}>
                                    Descrição: {classification.description}
                                </Text>
                                <Text style={styles.classificationDesc}>Local: {classification.area ? classification.area.name : ''}</Text>

                                <Text style={styles.classificationDesc} >Doente: {classification.healthy ? 'Não' : 'Sim'}</Text>
                                <Text style={styles.classificationDesc} >Doença: {classification.disease}</Text>

                                {selectedClassification === classification.id &&
                                    <View style={styles.classificationIcons}>
                                        <TouchableOpacity
                                            style={styles.editIcon}
                                            onPress={() => { }}
                                        >
                                            <AntDesign name="edit" size={24} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteclassification(classification.id)}>
                                            <AntDesign name="delete" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </TouchableOpacity>

                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}