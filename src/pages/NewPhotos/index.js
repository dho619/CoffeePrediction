import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { launchImageLibraryAsync, requestCameraRollPermissionsAsync } from 'expo-image-picker';
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import styles from './styles';

export default function NewPhotos({ navigation }) {
    const camRef = useRef(null) //criando uma referencia
    const [hasPermission, setHasPermission] = useState(null); //para guardar se ja teve permissao
    const [type, setType] = useState(Camera.Constants.Type.back); //camera traseira ou front
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off); //camera traseira ou front
    const [flashIcon, setFlashIcon] = useState('ios-flash-off'); //camera traseira ou front
    const [uriPhoto, setUriPhoto] = useState('');
    const [capturedPhoto, setCapturePhoto] = useState('');
    const [location, setLocation] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const { status } = await Camera.requestPermissionsAsync(); //pedindo permissao, caso nao tenha
            setHasPermission(status === 'granted');
        })();
        return () => mounted = false;
    }, []);

    if (hasPermission === null) { //protecao quando estiver null
        return <View />;
    };
    if (hasPermission === false) { //se nao deu permissao, exibe mensagem
        return <Text>No access to camera</Text>;
    };

    const handleTurnCamera = () => {//inverte a camera selecionada
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const handleTurnFlash = () => {
        if (flash === Camera.Constants.FlashMode.off) {
            setFlash(Camera.Constants.FlashMode.on);
            setFlashIcon('ios-flash')
        } else {
            setFlash(Camera.Constants.FlashMode.off);
            setFlashIcon('ios-flash-off')
        }
    };

    const handleTakingPicture = async () => {
        if (camRef) {
            const data = await camRef.current.takePictureAsync(
                {
                    base64: true,
                    ratio: '6:8'
                }
            );
            setUriPhoto(data.uri);
            setCapturePhoto(data.base64);
            setOpen(true);
            setLoading(true);

            let { status } = await Location.requestPermissionsAsync();
            let location = {};
            try {
                if (status === 'granted') {
                    let response = await Location.getCurrentPositionAsync({});
                    location = `${response.coords.latitude}:${response.coords.longitude}`
                }
            } catch {
                location = {};
            }
            setLocation(location);
            setLoading(false);
        }
    };

    const handleImageUpload = async () => {
        let permissionResult = await requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Nescessário permissão para acessar as imagens!');
            return;
        }

        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [6, 8],
            base64: true
        });

        if (!result.cancelled) {
            setUriPhoto(result.uri);
            setCapturePhoto(result.base64);
            setLocation({});
            setOpen(true);
        };
    };

    const sendForReview = () => {
        setOpen(false);
        navigation.navigate('NewClassifications', { uriPhoto, capturedPhoto, location });
    }

    const cancelReview = () => {
        setUriPhoto('');
        setCapturePhoto('');
        setOpen(false);
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={camRef}

            >
                <TouchableOpacity style={styles.btFlash} onPress={handleTurnFlash}>
                    <Ionicons name={flashIcon} size={50} color="white" />
                </TouchableOpacity>
            </Camera>
            <View
                style={styles.areaButtons}>
                <TouchableOpacity onPress={handleTurnCamera}>
                    <Ionicons name="md-reverse-camera" size={80} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTakingPicture}>
                    <MaterialIcons name="photo-camera" size={80} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleImageUpload}>
                    <MaterialCommunityIcons name="file-upload" size={80} color="black" />
                </TouchableOpacity>
            </View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={open}
            >
                <View style={styles.containerPhoto}>
                    <ImageBackground
                        style={styles.photo}
                        source={{ uri: uriPhoto }}
                        blurRadius={loading ? 6 : 0}
                    >
                        {!loading &&
                            <View style={styles.areaButtonPhoto}>
                                <TouchableOpacity style={styles.btPhoto} onPress={cancelReview}>
                                    <AntDesign name="closecircle" size={50} color="orange" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btPhoto} onPress={sendForReview}>
                                    <AntDesign name="check" size={50} color="orange" />
                                </TouchableOpacity>
                            </View>
                        }
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    );
}