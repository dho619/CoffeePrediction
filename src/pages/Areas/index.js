import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';
import { Context } from '../../context/contextAuth';
import Header from '../../components/Header';
import styles from './styles';

export default function Areas({navigation}) {
    const [areas, setAreas] = useState([]);

    const { user } = useContext(Context);

    useEffect(() => {
        fillAreas();
    }, []);

    const fillAreas = async () => {
        try {
            const response = await api.get(`areas/${user.id}`, {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
            });
            setTypes(response.data.data);
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
                    <View style={styles.area}>
                        <Text style={styles.areaHeader}>Nome: Minha Fazenda</Text>
                        <Text style={styles.areaDesc}>
                            Descrição: Minha Area de Fazenda para testes
                        </Text>
                        <Text style={styles.areaDesc}>Tipo: Fazenda</Text>

                        <View style={styles.areaIcons}>
                            <TouchableOpacity style={styles.editIcon}>
                                <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign name="delete" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}