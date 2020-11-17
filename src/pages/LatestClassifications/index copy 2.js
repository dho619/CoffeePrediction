import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import { fillClassificationsOffline } from './queryClassifications/fillClassificationsOffline';
import { fillClassificationOnline } from './queryClassifications/fillClassificationsOnline';
import Header from '../../components/Header';
import styles from './styles';

var loadingImage = require('../../assets/loading.gif');

export default function LatestClassifications({ navigation }) {
    const [online, setOnline] = useState('seeking...');
    const [loading, setLoading] = useState(true);
    const [classifications, setClassifications] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedClassification, setSelectedClassification] = useState(-1);

    const { user, token } = useContext(Context);

    useEffect(() => {
        const loadInfo = async () => {
            const situation = await isOnline();
            setOnline(situation)
        }
        loadInfo();
    }, []);

    useEffect(() => {
        fillClassification();
    }, [online]);

    const fillClassification = async () => {
        if (online === 'seeking...') return;
        let loadedClassifications = []
        if (online) {
            loadedClassifications = await fillClassificationOnline(token, page)
        } else {
            loadedClassifications = await fillClassificationsOffline(user.classifications)
        }
        setClassifications([...classifications, ...loadedClassifications]);
        setPage(page + 1);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Últimas Análises:</Text>
            </View>
            {loading ?
                <View style={styles.loading}>
                    <Image
                        source={loadingImage}
                        style={styles.loadingImage}
                    />
                </View>
                :
                <View style={styles.classificationContainer}>
                    <ScrollView
                        style={styles.classificationList}
                        onMomentumScrollEnd={() => alert(`scroll`)}
                    >
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
                                        Local: {classification.area ? classification.area.name : classification.area_name}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.ExpandIcon}
                                        onPress={() => navigation.navigate('Classification', { classification, sentToAPI: classification.created_at ? true : false })}
                                    >
                                        <AntDesign name="arrowright" size={27} color="black" />
                                    </TouchableOpacity>
                                </TouchableOpacity>

                            ))
                        }
                    </ScrollView>
                </View>
            }
        </View >
    )
}