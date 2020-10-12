import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';
import { Context } from '../../context/contextAuth';
import Header from '../../components/Header';
import styles from './styles';
import { isOnline } from '../../services/Network';
import { execute_db_offline } from '../../db/db_offline';

export default function Areas({ navigation }) {
    const [online, setOnline] = useState(false);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(-1);

    const { token, user } = useContext(Context);

    useEffect(() => {
        setOnline(isOnline())
        if(false){
            fillAreas();
        } else {
            fillAreasOffline();
        }

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

    const fillAreasOffline = async () => {
        try {
            let areas_offline = await execute_db_offline("SELECT * FROM areas")
            setAreas([...areas_offline, ...user.areas]);
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

    const deleteArea = (id) => {
        async function handleDelete(id){
            const response = await api.delete(`areas/${id}`, {
                headers: { 
                Authorization: `Bearer ${token}`
                }
            });
            if (response.status = 201){
                fillAreas();
                alert('Área apagada com sucesso!')
            }
        }

        async function handleDeleteOffline(id){
            try{
                var area = await execute_db_offline("SELECT id FROM areas WHERE id = ? and type_action = 'insert'", [id])
            } catch {}
            if (area && area.length){
                try {
                    await execute_db_offline("DELETE FROM areas WHERE id = ?", [id])
                    fillAreasOffline();
                    alert('Área apagada com sucesso!')    
                } catch {
                    alert('Erro ao apagar a área, tente novamente mais tarde!')    
                }
            } else {

            }
        }

        Alert.alert(
            "Confirmação:",
            "Deseja realmente apagar essa área?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => false?handleDelete(id):handleDeleteOffline(id)}
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
                    onPress={() => navigation.navigate('AreaRegister', {area: {}})}
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
                            <TouchableOpacity 
                                key={area.id} 
                                style={selectedArea === area.id?styles.areaSelected:styles.area}
                                onPress={() => {setSelectedArea(selectedArea === area.id?-1:area.id)}}
                            >
                                <Text style={styles.areaHeader}>Nome: {area.name}</Text>
                                <Text style={styles.areaDesc} numberOfLines={selectedArea===area.id?100:1}>
                                    Descrição: {area.description}
                                </Text>
                                <Text style={styles.areaDesc}>Tipo: {area.type_area?area.type_area.description:''}</Text>
                                
                                <Text style={styles.areaDesc} >Location: {area.location}</Text>
                                
                                {selectedArea===area.id &&
                                    <View style={styles.areaIcons}>
                                        <TouchableOpacity 
                                            style={styles.editIcon}
                                            onPress={() => navigation.navigate('AreaRegister', {area})}
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