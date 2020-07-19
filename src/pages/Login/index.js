import React, {useState, useEffect, useContext} from 'react';
import { View, KeyboardAvoidingView, Image, 
         Text, TouchableOpacity, TextInput,
         Animated, StyleSheet, Keyboard, Alert
} from 'react-native';
import { validate } from 'validate.js';

import {constraintsEmail} from '../../utils/constraints';
import api from '../../services/api';

import { Context } from '../../context/contextAuth';

const logo = require('../../assets/logo.png');

export default function Login({ navigation }) {
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
    }

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
    }

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
                navigation.navigate('Drawer'); //navegar para a parte da aplicacao de usuario logado
            }catch(err){
                console.log(err)
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

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    value={password}
                    onChangeText={password => setPassword(password)} 
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.btnSubmit} onPress={signIn}>
                    <Text style={styles.submitText}>Logar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>
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