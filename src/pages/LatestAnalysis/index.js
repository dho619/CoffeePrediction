import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'

import Header from '../../components/Header';
import styles from './styles';

export default function LatestAnalysis({navigation}) {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.title}>
                <Text style={styles.titleText}>Suas Últimas Análises:</Text>
            </View>
            <View style={styles.analysisContainer}>
                <ScrollView style={ styles.analysisList}>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Primeira Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Segunda Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Terceira Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Primeira Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Segunda Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Terceira Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Primeira Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Segunda Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.analysisArea}>
                            <Text style={styles.analyzeHeader}>Terceira Análise</Text>
                            <Text style={styles.analyzeDesc}>
                                Essa é uma análise feita para verificar se a planta x da fazenda x esta boa,
                                e estou escrevendo muito, apenas para ter muito texto aqui.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}