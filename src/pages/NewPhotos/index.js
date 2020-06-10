import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera';
import { Fontisto } from '@expo/vector-icons';

import Header from '../../components/Header';
import styles from './styles';

export default function NewPhotos({...props}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
    (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
    }, []);

    if (hasPermission === null) {
    return <View />;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }
    return (
    <View style={{ flex: 1, }}>
        <Header {...props}/>
        <Camera style={{ flex: 1 }} type={type}/>
        <View
            style={{
            height: 100,
            backgroundColor: '#6b3600',
            flexDirection: 'row',
            padding: 10,
            }}>
            <TouchableOpacity
            style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setType(
                type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}>
                <View style={{ padding: 10, borderRadius: 50, borderColor: '#FFF', borderWidth: 5}}>
                    <Fontisto 
                        name="spinner-rotate-forward"
                        size={50} 
                        color="black"
                    />
                </View>
            </TouchableOpacity>
        </View>
    </View>
    );
}