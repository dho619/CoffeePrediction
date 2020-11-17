import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import { fillClassificationsOffline } from './queryClassifications/fillClassificationsOffline';
import { fillClassificationOnline } from './queryClassifications/fillClassificationsOnline';
import Header from '../../components/Header';
import DisplayClassification from './displayClassification';
import styles from './styles';

var loadingImage = require('../../assets/loading.gif');

export default function LatestClassifications({ navigation }) {
    const [online, setOnline] = useState('seeking...');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [classifications, setClassifications] = useState([]);
    const [page, setPage] = useState(1);

    const { user, token } = useContext(Context);

    useEffect(() => {
        const loadInfo = async () => {
            const situation = await isOnline();
            setOnline(false)
        }
        loadInfo();
    }, []);

    useEffect(() => {
        fillClassification(1);
    }, [online]);

    const handleReflesh = async () => {
        if (!online) return;
        setPage(1);
        setRefreshing(true);
        await fillClassification(1);
        setRefreshing(false);
    }

    const handleLoadMore = async () => {
        if (!online) return;
        setPage(page + 1);
        setRefreshing(true);
        await fillClassification(page + 1);
        setRefreshing(false);
    }

    const fillClassification = async (pageAtual) => {
        if (online === 'seeking...') return;
        let loadedClassifications = []
        if (online) {
            loadedClassifications = await fillClassificationOnline(token, pageAtual)
        } else {
            loadedClassifications = await fillClassificationsOffline(user.classifications)
        }
        if (pageAtual === 1) {
            setClassifications(loadedClassifications);
        } else {
            setClassifications([...classifications, ...loadedClassifications]);
        }
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

                    <FlatList
                        style={styles.classificationList}
                        vertical={true}
                        contentContainerStyle={{
                            flexDirection: 'column'
                        }}
                        data={classifications}
                        renderItem={({ item }) => (
                            <DisplayClassification
                                classification={item}
                                navigation={navigation}
                            />
                        )}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.1}
                        initialNumToRender={3}
                        onRefresh={handleReflesh}
                        refreshing={refreshing}
                    />

                </View>
            }
        </View >
    )
}