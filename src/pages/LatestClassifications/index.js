import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';

import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import { fillClassificationsOffline } from './queryClassifications/fillClassificationsOffline';
import { fillClassificationOnline } from './queryClassifications/fillClassificationsOnline';
import { fillAreasOffline } from '../Areas/queryArea/fillAreasOffline';
import { fillAreasOnline } from '../Areas/queryArea/fillAreasOnline';
import Header from '../../components/Header';
import DisplayClassification from './displayClassification';
import { styles, pickerStyle } from './styles';

var loadingImage = require('../../assets/loading.gif');

export default function LatestClassifications({ navigation }) {
    const [online, setOnline] = useState('seeking...');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [classifications, setClassifications] = useState([]);
    const [listedClassifications, setListedClassifications] = useState([]);
    const [page, setPage] = useState(1);
    const [areas, setAreas] = useState([]);
    const [area, setArea] = useState('');

    const { user, token } = useContext(Context);

    useEffect(() => {
        const loadInfo = async () => {
            const situation = await isOnline();
            setOnline(situation)
        }
        loadInfo();
    }, []);

    useEffect(() => {
        fillClassification(1);
        fillAreas();
    }, [online]);

    useEffect(() => {
        handleFilter();
    }, [area]);

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

    const handleFilter = async () => {
        setRefreshing(true);
        if (area !== '') {
            const filteredClassifications = await classifications.filter(
                classification => (classification.area ? classification.area.id : classification.area_id) === area
            );
            setListedClassifications(filteredClassifications);
        } else {
            setListedClassifications(classifications);
        }
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
            setListedClassifications(loadedClassifications);
        } else {
            setClassifications([...classifications, ...loadedClassifications]);
            setListedClassifications([...classifications, ...loadedClassifications]);
        }
        if (area !== '') handleFilter();
        setLoading(false);
    }
    const fillAreas = async () => {
        if (online === 'seeking...') return;
        if (online) {
            const response = await fillAreasOnline(token)
            let loadedAreas = [];
            await response.map(area => {
                loadedAreas.push({ label: area.name, value: area.id });
            });
            setAreas(loadedAreas);
        } else {
            const response = await fillAreasOffline(user.areas)
            let loadedAreas = [];
            await response.map(area => {
                loadedAreas.push({ label: area.name, value: area.id });
            });
            setAreas(loadedAreas);
        }
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Últimas Análises:</Text>
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.filterField}>Area: </Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Todas',
                        value: '',
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
            </View>
            <View style={{ flex: 1, maxHeight: 2, backgroundColor: "#B38F72" }} />
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
                        data={listedClassifications}
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