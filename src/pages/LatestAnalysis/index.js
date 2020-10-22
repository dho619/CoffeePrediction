import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import { handleDeleteOffline } from './queryClassification/deleteClassificationOffline';
import { handleDeleteOnline } from './queryClassification/deleteClassificationOnline';
import { fillClassificationsOffline } from './queryClassification/fillClassificationsOffline';
import { fillClassificationOnline } from './queryClassification/fillClassificationsOnline';
import Header from '../../components/Header';
import styles from './styles';

export default function LatestAnalysis({ navigation }) {
    const [online, setOnline] = useState(false);
    const [classifications, setClassifications] = useState([]);
    const [selectedClassification, setSelectedClassification] = useState(-1);

    const { user, token } = useContext(Context);

    useEffect(() => {
        const loadInfo = async () => {
            const situation = await isOnline();
            setOnline(false)
        }
        let mounted = true;
        loadInfo();
        return () => mounted = false;
    }, []);

    useEffect(() => {
        fillClassification();
    }, [online]);

    const fillClassification = async () => {
        let loadedClassifications = []
        if (online) {
            loadedClassifications = await fillClassificationOnline(token)
        } else {
            loadedClassifications = await fillClassificationsOffline(user.classifications)
        }
        setClassifications(loadedClassifications);
    }

    const deleteclassification = (id) => {
        async function handleDelete(id) {
            if (online) {
                await handleDeleteOnline(id, token);
            } else {
                await handleDeleteOffline(id, user.areas);
            }
            fillClassification();
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
                        classifications && classifications.map(classification => (
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