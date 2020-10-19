import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../context/contextAuth';
import { isOnline } from '../../services/Network';
import { handleDeleteOffline } from './queryArea/deleteAreaOffline';
import { handleDeleteOnline } from './queryArea/deleteAreaOnline';
import { fillAreasOffline } from './queryArea/fillAreasOffline';
import { fillAreasOnline } from './queryArea/fillAreasOnline';
import styles from './styles';

export default function Areas({ navigation }) {
    const [online, setOnline] = useState(true);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(-1);

    const { token, user } = useContext(Context);

    useEffect(() => {
        const loadInfo = async () => {
            const situation = await isOnline();
            setOnline(situation)
            await fillAreas()
        }
        let mounted = true;
        loadInfo();
        return () => mounted = false;
    }, []);

    const fillAreas = async () => {
        if (online) {
            let areas = await fillAreasOnline(token)
            setAreas(areas);
        } else {
            let areas = await fillAreasOffline(user.areas)
            setAreas(areas);
        }
    }

    const deleteArea = (id) => {
        async function handleDelete() {
            if (online) {
                await handleDeleteOnline(id, token);
            } else {
                await handleDeleteOffline(id, user.areas);
            }
            fillAreas();
        }

        Alert.alert(
            "Confirmação:",
            "Deseja realmente apagar essa área?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => handleDelete() }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Suas Áreas:</Text>
                <TouchableOpacity
                    style={styles.btNewArea}
                    onPress={() => navigation.navigate('AreaRegister', { area: {} })}
                >
                    <AntDesign
                        name="pluscircle"
                        size={60}
                        color="#F5DEB3"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.areaContainer}>
                <ScrollView style={styles.areaList}>
                    {
                        areas.map(area => (
                            <TouchableOpacity
                                key={area.id}
                                style={selectedArea === area.id ? styles.areaSelected : styles.area}
                                onPress={() => { setSelectedArea(selectedArea === area.id ? -1 : area.id) }}
                            >
                                <Text style={styles.areaHeader}>Nome: {area.name}</Text>
                                <Text style={styles.areaDesc} numberOfLines={selectedArea === area.id ? 100 : 1}>
                                    Descrição: {area.description}
                                </Text>
                                <Text style={styles.areaDesc}>Tipo: {area.type_area ? area.type_area.description : area.type_area_name}</Text>

                                <Text style={styles.areaDesc} >Location: {area.location}</Text>

                                {selectedArea === area.id &&
                                    <View style={styles.areaIcons}>
                                        <TouchableOpacity
                                            style={styles.editIcon}
                                            onPress={() => navigation.navigate('AreaRegister', { area })}
                                        >
                                            <AntDesign name="edit" size={24} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteArea(area.id)}>
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