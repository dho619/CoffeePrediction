import React, {useState, useEffect, useContext} from 'react';
import { View, KeyboardAvoidingView, Image, 
         Text, TouchableOpacity, TextInput,
         Animated, AsyncStorage, Keyboard, Alert
} from 'react-native';
import { validate } from 'validate.js';
import { RadioButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../services/api';
import {constraintsEmail} from '../../utils/constraints';
import { Context } from '../../context/contextAuth';
import { REMEMBER_EMAIL, REMEMBER_PASS } from '../../../config';
const logo = require('../../assets/logo.png');
import styles from './styles';




export default function Login({ navigation }) {
    const [remember, setRemember] = useState(false);
    const [visiblePass, setVisiblePass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [offset] = useState(new Animated.ValueXY({x:0, y:95}));
    const [opacity] = useState(new Animated.Value(0));
    const [dimensao] = useState(new Animated.ValueXY({x: 330, y: 345}));

    const { onSignIn } = useContext(Context);

    useEffect(() => {
        //quando abre o teclado chama a funcao passada
        keboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        //quando fecha o teclado chama a funcao passada
        keboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        
        //executar mais de uma animacao em paralelo
        Animated.parallel([
            //controla os "pulos" do form de login
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
            }),
            //controla opacidade
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
            })
        ]).start();
        
        fillEmailPass();
    }, []);

    function keyboardDidShow(){
        //executar mais de uma animacao em paralelo
        Animated.parallel([
            //controla o tamanho no eixo x
            Animated.timing(dimensao.x, {
                toValue: 200,
                duration: 100,
            }),
            //controla o tamanho no eixo y
            Animated.timing(dimensao.y, {
                toValue: 205,
                duration: 100,
            }),
        ]).start();
    };

    function keyboardDidHide(){
        //executar mais de uma animacao em paralelo
        Animated.parallel([
            //controla o tamanho no eixo x
            Animated.timing(dimensao.x, {
                toValue: 330,
                duration: 100,
            }),
            //controla o tamanho no eixo y
            Animated.timing(dimensao.y, {
                toValue: 345,
                duration: 100,
            }),
        ]).start();
    };

    async function fillEmailPass(){
        const rememberEmail = await AsyncStorage.getItem(REMEMBER_EMAIL);
        const rememberPass = await AsyncStorage.getItem(REMEMBER_PASS);

        if( rememberEmail && rememberPass){
            setEmail(rememberEmail);
            setPassword(rememberPass);
            setRemember(true);
        } else {
            setRemember(false);
        }
    }

    async function rememberUser(){
        if (remember){
            await AsyncStorage.setItem(REMEMBER_EMAIL, email);
            await AsyncStorage.setItem(REMEMBER_PASS, password);
        } else {
            await AsyncStorage.removeItem(REMEMBER_EMAIL);
            await AsyncStorage.removeItem(REMEMBER_PASS);
            //limpar campos, para nao restar lixo quando voltar nessa tela
            setEmail(''); 
            setPassword('');
        }
        
    };

    const signIn = async () => {
        //verificar se email existe e se é um email valido
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
        } else { //se email é válido continua

            try{
                // envia email e senha para fazer login
                const response = await api.post('login', {email, password});
                await onSignIn(response.data.token);//registrar o login no context
                await rememberUser(); //para salvar ou limpar email e senha de acordo com o lembrar de mim
                navigation.navigate('Drawer', { screen: 'Inicio' }); //navegar para a parte da aplicacao de usuario logado
            }catch(err){
                Alert.alert(
                    "Aviso",
                    'Usuário ou senha incorretos',
                    [
                      { text: "OK"}
                    ],
                    { cancelable: false }
                  );
            }
        }
    }


  return (
    <KeyboardAvoidingView style={styles.container}>
            <View style={styles.containerLogo}>
                <Animated.Image 
                    style={{
                        width: dimensao.x,
                        height: dimensao.y,
                        marginLeft: 40, 
                    }} 
                    source={logo} 
                />
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
                    autoCompleteType='email'
                    keyboardType='email-address'
                    value={email}
                    autoCorrect={false}
                    onChangeText={email => setEmail(email)} 
                    onEndEditing= {e => setEmail(e.nativeEvent.text.trim())}
                />
                <View style={styles.containerPass}>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        autoCorrect={false}
                        value={password}
                        onChangeText={password => setPassword(password)} 
                        secureTextEntry={!visiblePass}
                    />
                    <TouchableOpacity 
                        style={styles.visibilityPass}
                        onPressIn={() => setVisiblePass(!visiblePass)}
                        onPressOut={() => setVisiblePass(false)}
                    >
                        <MaterialIcons 
                            style={styles.iconVisibility}
                            name={visiblePass?"visibility":"visibility-off"}
                            size={30} 
                            color="black" 
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnSubmit} onPress={signIn}>
                    <Text style={styles.submitText}>Logar</Text>
                </TouchableOpacity>
                <View style={styles.containerRemember}>
                    <RadioButton
                                value= {remember}
                                status= {remember? 'checked': 'unchecked'}
                                onPress={() => setRemember(!remember)}
                                color= {'#00622D'}
                    />
                    <TouchableOpacity onPress={() => setRemember(!remember)}>
                        <Text style={styles.textRemember}>Lembrar de mim</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Criar conta gratuita</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
  );
}