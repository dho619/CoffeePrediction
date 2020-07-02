import React, {useState, useEffect} from 'react';
import { View, KeyboardAvoidingView, Image, 
         Text, TouchableOpacity, TextInput,
         Animated, StyleSheet, Keyboard
       } from 'react-native';

const logo = require('../../assets/logo.png')

export default function Login() {

    const [offset] = useState(new Animated.ValueXY({x:0, y:95}))
    const [opacity] = useState(new Animated.Value(0))
    const [fontSize] = useState(new Animated.Value(35))
    const [dimensao] = useState(new Animated.ValueXY({x: 250, y: 255}))

    useEffect(() => {
        keboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 3,
                bounciness: 20
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
            })
        ]).start();
    }, []);

    function keyboardDidShow(){
        Animated.parallel([
            Animated.timing(dimensao.x, {
                toValue: 130,
                duration: 300,
            }),
            Animated.timing(dimensao.y, {
                toValue: 140,
                duration: 300,
            }),
            Animated.timing(fontSize, {
                toValue: 25,
                duration: 300,
            }),
        ]).start();
    }

    function keyboardDidHide(){
        Animated.parallel([
            Animated.timing(dimensao.x, {
                toValue: 250,
                duration: 300,
            }),
            Animated.timing(dimensao.y, {
                toValue: 255,
                duration: 300,
            }),
            Animated.timing(fontSize, {
                toValue: 35,
                duration: 300,
            }),
        ]).start();
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.containerLogo}>
                <Animated.Image 
                    style={{
                        width: dimensao.x,
                        height: dimensao.y 
                    }} 
                    source={logo} 
                />
                <Animated.Text style={[styles.textLogo, {
                            fontSize: fontSize,
                    }]}
                >
                 Assistant of coffee Glower
                </Animated.Text>
            </View>
            <Animated.View 
                style={[styles.containerForm,
                    {
                        opacity: opacity,
                        transform: [
                            { translateY: offset.y}
                        ]
                    }
                ]}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />

                <TouchableOpacity style={styles.btnSubmit}>
                    <Text style={styles.submitText}>Logar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.registerText}>Criar conta gratuita</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cf965e',
      alignItems: 'center',
      justifyContent:'center',
    },
    containerLogo:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    textLogo: { 
        marginTop: -10,
        fontWeight: 'bold',
        width: 200, 
        color: '#6b3600',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 98, 45, 1)',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10
    },
    containerForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50,
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
    },
    btnSubmit: {
        backgroundColor: '#00622D',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
    },
    btnRegister: {
        marginTop: 20,
    },
    registerText: {
        color: '#FFF',
        fontSize: 18,
    }
});