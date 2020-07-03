import React, {useState, useEffect} from 'react';
import { View, KeyboardAvoidingView, Image, 
         Text, TouchableOpacity, TextInput,
         Animated, StyleSheet, Keyboard
} from 'react-native';
import { validate } from 'validate.js';
import constraintsEmail from '../../utils/constraints';
const logo = require('../../assets/logo.png')

export default function Login({...props}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [offset] = useState(new Animated.ValueXY({x:0, y:95}))
    const [opacity] = useState(new Animated.Value(0))
    const [marginTop] = useState(new Animated.Value(40))
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
            Animated.timing(marginTop, {
                toValue: 20,
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
            Animated.timing(marginTop, {
                toValue: 40,
                duration: 300,
            }),
        ]).start();
    }

    const register = async () => {
        const validationResult = await validate({email}, constraintsEmail);
        if (validationResult){
            Alert.alert(
                "Aviso",
                validationResult.email[0],
                [
                  { text: "OK"}
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Animated.View style={[styles.containerLogo], {marginTop: marginTop,}}>
                <Animated.Image 
                    style={{
                        width: dimensao.x,
                        height: dimensao.y,
                        marginLeft: 40, 
                    }} 
                    source={logo} 
                />
            </Animated.View>
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
                    placeholder="Nome"
                    value={name}
                    autoCorrect={false}
                    onChangeText={name => setName(name)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    autoCorrect={false}
                    onChangeText={email => setEmail(email)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    autoCorrect={false}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirmar senha"
                    value={password2}
                    autoCorrect={false}
                    onChangeText={password2 => setPassword2(password2)}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.btnRegister} onPress={register}>
                    <Text style={styles.submitText}>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnLogin} onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.registerText}>Fazer login</Text>
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
    btnRegister: {
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
    btnLogin: {
        marginTop: 20,
    },
    registerText: {
        color: '#FFF',
        fontSize: 18,
    }
});