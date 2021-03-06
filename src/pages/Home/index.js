import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import Header from '../../components/Header';
import wallpapper from '../../assets/wallpapper.jpg';
import styles from './styles';

export default function Home({ navigation }) {
    useEffect(() => {
        let mounted = true;
        return () => mounted = false;
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={wallpapper} style={styles.image}>
                <Header navigation={navigation} />
                <View style={styles.areaText}>
                    <Text style={styles.text1}>Assistant</Text>
                    <Text style={styles.text2}>of Coffee</Text>
                    <Text style={styles.text3}>Grower</Text>
                </View>
                <TouchableOpacity
                    style={styles.btNewPhoto}
                    onPress={() => navigation.navigate('Nova Análise')}
                >
                    <AntDesign
                        name="pluscircle"
                        size={70}
                        color="black"
                    />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}