import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';
import { Context } from '../../context/contextAuth';
import Header from '../../components/Header';
import styles from './styles';

export default function Areas({navigation}) {
    const [areas, setAreas] = useState([]);

    const { token } = useContext(Context);

    useEffect(() => {
        fillAreas();
    }, []);

    const fillAreas = async () => {
        try {
            const response = await api.get('areas', {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
            });
            setAreas(response.data.data);
        } catch (err) {
            Alert.alert(
                "Aviso",
                'Erro ao carregar as Áreas, tente recarregar a página para resolver o problema!',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Suas Áreas:</Text>
                <TouchableOpacity 
                    style={styles.btNewArea}
                    onPress={() => navigation.navigate('AreaRegister')}
                >
                    <AntDesign 
                        name="pluscircle" 
                        size={60} 
                        color="#F5DEB3"                         
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.areaContainer}>
                <ScrollView style={ styles.areaList}>
                    {
                        areas.map(area => (
                            <View key={area.id} style={styles.area}>
                                <Text style={styles.areaHeader}>Nome: {area.name}</Text>
                                <Text style={styles.areaDesc}>
                                    Descrição: {area.description}
                                </Text>
                                <Text style={styles.areaDesc}>Tipo: {area.type_area?area.type_area.description:''}</Text>

                                <View style={styles.areaIcons}>
                                    <TouchableOpacity style={styles.editIcon}>
                                        <AntDesign name="edit" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <AntDesign name="delete" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}