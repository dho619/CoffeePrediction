import React, {useState, useEffect, useContext} from 'react';
import { View, KeyboardAvoidingView, Image, 
         Text, TouchableOpacity, TextInput,
         Animated, StyleSheet, Keyboard, Alert
} from 'react-native';

import api from '../../services/api';
import { validate } from 'validate.js';
import { constraintsEmail, validatePassword } from '../../utils/constraints';
const logo = require('../../assets/logo.png')

import { Context } from '../../context/contextAuth';

export default function Login({navigation}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [offset] = useState(new Animated.ValueXY({x:0, y:95}))
    const [opacity] = useState(new Animated.Value(0))
    const [marginTop] = useState(new Animated.Value(40))
    const [dimensao] = useState(new Animated.ValueXY({x: 250, y: 255}))

    const { onSignIn } = useContext(Context);

    useEffect(() => {
        //quando abre o teclado chama a funcao passada
        keboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        //quando fecha o teclado chama a funcao passada
        keboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        //executar mais de uma animacao em paralelo
        Animated.parallel([
            //controla os "pulos" no form de registrar
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20
            }),
            //controla a opacidade
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
            })
        ]).start();
    }, []);

    function keyboardDidShow(){
        //executar mais de uma animacao em paralelo
        Animated.parallel([
            //controla o tamanho no eixo x
            Animated.timing(dimensao.x, {
                toValue: 130,
                duration: 100,
            }),
            //controla o tamanho no eixo y
            Animated.timing(dimensao.y, {
                toValue: 140,
                duration: 100,
            }),
            //controla a margin do topo
            Animated.timing(marginTop, {
                toValue: 20,
                duration: 100,
            }),
        ]).start();
    }

    function keyboardDidHide(){
        //executar mais de uma animacao em paralelo
        Animated.parallel([
            //controla o tamanho no eixo x
            Animated.timing(dimensao.x, {
                toValue: 250,
                duration: 100,
            }),
            //controla o tamanho no eixo y
            Animated.timing(dimensao.y, {
                toValue: 255,
                duration: 100,
            }),
            //controla a margin do topo
            Animated.timing(marginTop, {
                toValue: 40,
                duration: 100,
            }),
        ]).start();
    }

    const register = async () => {
        //verificar se nome esta vazio
        if(name === ''){
            Alert.alert(
                "Aviso",
                'Nescessário preencher o campo de Nome',
                [
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return '';
        }

        //validar email
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
            return '';
        }
        
        //validando senha
        validatePassword(password, password2);

        try{
            // envia email e senha para fazer cadastro
            const response = await api.post('users', {name, email, password});
            await onSignIn(response.data.token);//faz o login e ja registra no context
            navigation.navigate('Drawer', { screen: 'Inicio'}); //navegar para a parte da aplicacao de usuario logado
        }catch(err){
            console.log(err)
            Alert.alert(
                "Aviso",
                'Erro ao fazer o cadastro, tente novamente em alguns instantes!',
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
                        marginLeft: 20, 
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
                    onEndEditing= {e => setName(e.nativeEvent.text.trim())}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCompleteType='email'
                    keyboardType='email-address'
                    value={email}
                    autoCorrect={false}
                    onChangeText={email => setEmail(email)}
                    onEndEditing= {e => setEmail(e.nativeEvent.text.trim())}
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

                <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Login')}>
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