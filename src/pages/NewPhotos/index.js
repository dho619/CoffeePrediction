import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import { Camera } from 'expo-camera';
import { launchImageLibraryAsync, requestCameraRollPermissionsAsync } from 'expo-image-picker';
import { AntDesign, Fontisto, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

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
    const [open, setOpen] = useState(false);

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

    const turnCamera = () => {//inverte a camera selecionada
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const turnFlash = () => {//inverte a camera selecionada
        if (flash === Camera.Constants.FlashMode.off) {
            setFlash(Camera.Constants.FlashMode.on);
            setFlashIcon('ios-flash')
        } else {
            setFlash(Camera.Constants.FlashMode.off);
            setFlashIcon('ios-flash-off')
        }
    };

    const takePicture = async () => { //tirar foto
        if (camRef) {
            const data = await camRef.current.takePictureAsync({ base64: true, ratio: '6:8' });
            setUriPhoto(data.uri);
            setCapturePhoto(data.base64);
            setOpen(true);
        }
    };

    const uploadImage = async () => {
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
            setOpen(true);
        }
    };

    const sendForReview = () => {
        setOpen(false);
        navigation.navigate('NewClassifications', { uriPhoto, capturedPhoto })
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
                <TouchableOpacity style={styles.btFlash} onPress={turnFlash}>
                    <Ionicons name={flashIcon} size={50} color="white" />
                </TouchableOpacity>
            </Camera>
            <View
                style={styles.areaButtons}>
                <TouchableOpacity style={styles.btTypeCamera} onPress={turnCamera}>
                    <View style={styles.borderBtType}>
                        <Fontisto name="spinner-rotate-forward" size={50} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture}>
                    <MaterialIcons name="photo-camera" size={80} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={uploadImage}>
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
                    >
                        <View style={styles.areaButtonPhoto}>
                            <TouchableOpacity style={styles.btPhoto} onPress={cancelReview}>
                                <AntDesign name="closecircle" size={50} color="orange" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btPhoto} onPress={sendForReview}>
                                <AntDesign name="check" size={50} color="orange" />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    );
}