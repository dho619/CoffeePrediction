import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Animated, Easing } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

const rotateOptions = ['0deg', '10deg', '20deg', '30deg', '40deg', '30deg', '20deg', '10deg', '0deg', '-10deg', '-20deg', '-30deg', '-40deg', '-30deg', '-20deg', '-10deg']
const elementNumbers = 48;

export default function DisplayClassification({ ...props }) {
    const [selectedClassification, setSelectedClassification] = useState(false);
    const [spinValue, setSpinValue] = useState(new Animated.Value(0));

    useEffect(() => {
        StartIconRotate();
    }, []);
    function StartIconRotate() {
        spinValue.setValue(0);

        Animated.timing(spinValue, {
            toValue: elementNumbers,
            duration: 4000,
            easing: Easing.linear,
        }).start();
    }

    const spin = (spinValue.interpolate({
        inputRange: [...Array(elementNumbers).keys()],
        outputRange: [...rotateOptions, ...rotateOptions, ...rotateOptions]
    }));

    const { classification, navigation } = props

    return (
        <TouchableOpacity
            key={classification.id}
            style={styles.classification}
            onPress={() => {
                setSelectedClassification(!selectedClassification)
            }}
        >
            {!classification.is_sended &&
                <Animated.View style={[styles.iconNotification, { transform: [{ rotate: spin }] }]}>
                    <Ionicons name="ios-notifications" size={30} color="red" />
                </Animated.View>
            }
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