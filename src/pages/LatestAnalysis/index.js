import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import { fillClassificationsOffline } from './queryClassifications/fillClassificationsOffline';
import { fillClassificationOnline } from './queryClassifications/fillClassificationsOnline';
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
            setOnline(situation)
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
                                <Text style={styles.analyzeDesc} numberOfLines={selectedClassification === classification.id ? 100 : 1}>
                                    Descrição: {classification.description}
                                </Text>
                                <Text
                                    style={styles.analyzeLocal}
                                    numberOfLines={1}
                                >
                                    Local: {classification.area ? classification.area.name : ''}
                                </Text>
                                <TouchableOpacity
                                    style={styles.ExpandIcon}
                                    onPress={() => navigation.navigate('Analyze', { classification, sentToAPI: classification.created_at ? true : false })}
                                >
                                    <AntDesign name="arrowright" size={27} color="black" />
                                </TouchableOpacity>
                            </TouchableOpacity>

                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}