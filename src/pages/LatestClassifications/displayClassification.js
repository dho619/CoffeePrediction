import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

export default function DisplayClassification({ ...props }) {
    const [selectedClassification, setSelectedClassification] = useState(false);

    const { classification, navigation } = props
    return (
        <TouchableOpacity
            key={classification.id}
            style={styles.classification}
            onPress={() => {
                setSelectedClassification(!selectedClassification)
            }}
        >
            <Text style={styles.classificationHeader}>Nome: {classification.name}</Text>
            <Text style={styles.analyzeDesc} numberOfLines={selectedClassification ? 100 : 1}>
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
    )
}