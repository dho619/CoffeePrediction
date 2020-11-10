import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../components/Header';
import styles from './styles';

export default function About({ navigation }) {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.aboutContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Quem Somos?</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <Text style={styles.infoAbout}>Esse é um trabalho dessenvolvido como uma POC de um TCC do cursos de Ciência da computação do Centro Universitário da Fundação Educacional Guaxupé - UNIFEG</Text>
                    <Text style={styles.infoAuthor}>Desenvolvido por Geovane Barbosa</Text>
                    <Text style={styles.infoAuthor}>Orientado por Gustavo Poli</Text>
                </View>
                <View style={styles.feedback}>
                    <TouchableOpacity
                        style={styles.btnFeedback}
                        onPress={() => navigation.navigate('Feedback')}
                    >
                        <Text style={styles.textBtnFeedback} >Deixe seu feedback</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}