import React, { useState, useEffect, useContext} from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, 
         KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';
import { validatePassword } from '../../utils/constraints';
import { Context } from '../../context/contextAuth';
import { formatDatePython, dateNow } from '../../utils/date';
import Header from '../../components/Header';
import styles from './styles';

var avatar = require('../../assets/perfil.jpeg');

export default function Profile({navigation}) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [updatePass, setUpdatePass] = useState(false);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');
    const [widthImage, setWidthImage] = useState(120);
    const [heightImage, setHeightImage] = useState(120);
    
    const { user, token } = useContext(Context);

    useEffect(() => {
        //quando abre o teclado chama a funcao passada
        keboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        //quando fecha o teclado chama a funcao passada
        keboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        fillUser();
    }, []);

    const fillUser = () => {
        setName(user.name);
        setEmail(user.email);
    }

    function keyboardDidShow(){
        setHeightImage(50);
        setWidthImage(50);
    }

    function keyboardDidHide(){
        setHeightImage(120);
        setWidthImage(120);
    }

    function clearFields(){
        setName(user.name);
        setPassword('');
        setPassword2('');
        setPassword3('');
        setUpdatePass(false);
        setEditing(false);
    }

    const cancelEditing = () => {
        clearFields();
    }

    const sendEditing = async () => {
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

        const updateUser = {name};

        var response;

        if (updatePass){ //se esta habilitado para trocar senha
            //faz um login, para verificar se a senha passada esta correta
            try{
                response = await api.post('login', {email, password});
            }
            catch{
                Alert.alert(
                    "Aviso",
                    'Senha atual inválida',
                    [
                        { text: "OK"}
                    ],
                    { cancelable: false }
                );
                return '';
            }
            if (!validatePassword(password2, password3)){
                return '';
            }
            updateUser.password = password2;
        }

        try{
            // envia email e senha para fazer cadastro
            response = await api.put(`users/${user.id}`, updateUser, {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            });
            
            user.name = name; //atualizar o nome do usuario na aplicacao
            user.updated_at = dateNow(false, true); //dateNow(exibirHoras, pythonFormat)
            clearFields();
            Alert.alert(
                "Sucess",
                'Usuario atualizado com sucesso!',
                [
                  { text: "OK"}
                ],
                { cancelable: false }
            );
        }catch(err){
            Alert.alert(
                "Aviso",
                'Erro ao fazer o cadastro, tente novamente em alguns instantes!',
                [
                  { text: "OK"}
                ],
                { cancelable: false }
            );
        }
        fillUser(); //recarregar os campos;
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.header}>
                <Image 
                    source={avatar}
                    style={[styles.avatar, {width: widthImage, height: heightImage}]}
                />
                <View style={styles.infHeader}>
                    <Text style={styles.datasUsuario}>Ativo desde: {formatDatePython(user.created_at)}</Text>
                    <Text style={styles.datasUsuario}>Última Atualização: {formatDatePython(user.updated_at)}</Text>
                    {
                        !editing && 
                        <TouchableOpacity 
                            onPress={() => setEditing(true)}
                            style={styles.btEditar}
                        >
                                <Text style={styles.txtBtEditar}>
                                    Editar informações de perfil
                                </Text>
                                <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={styles.infGerais}>
                <View style={styles.agroup}>
                    <Text style={styles.field}>Nome: </Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        editable={editing}
                        autoCorrect={false}
                        onChangeText={name => setName(name)}
                    />
                </View>
                <View style={styles.agroup}>
                    <Text style={styles.field}>Email: </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        editable={false}
                        autoCorrect={false}
                        autoCompleteType='email'
                        keyboardType='email-address'    
                        onChangeText={email => setEmail(email)}
                    />
                </View>
                
                {editing && <>
                    <View style={styles.agroup}>
                        <Text style={styles.titleSenha}>Trocar senha também: </Text>
                        <RadioButton
                            value= {updatePass}
                            status= {updatePass? 'checked': 'unchecked'}
                            onPress={() => setUpdatePass(!updatePass)}
                            color= {'#00622D'}
                        />
                    </View>
                    {updatePass && <>
                        
                        <View style={styles.agroup}>
                            <Text style={styles.field}></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Senha Atual"
                                value={password}
                                autoCorrect={false}
                                onChangeText={password => setPassword(password)}
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={styles.agroup}>
                            <Text style={styles.field}> </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nova Senha"
                                value={password2}
                                autoCorrect={false}
                                onChangeText={password => setPassword2(password)}
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={styles.agroup}>
                            <Text style={styles.field}></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar Nova Senha"
                                value={password3}
                                autoCorrect={false}
                                onChangeText={password => setPassword3(password)}
                                secureTextEntry={true}
                            />
                        </View>
                    
                    </>}
                           
                    <View style={styles.buttonsArea}>
                        <TouchableOpacity  style={styles.buttons} onPress={cancelEditing}>
                            <AntDesign name="closecircle" size={30} color="black"/>
                            <Text style={styles.textButtons}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.buttons} onPress={sendEditing}>
                            <AntDesign name="check" size={30} color="black" />
                            <Text style={styles.textButtons}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </>}
            </View>
        </KeyboardAvoidingView>
    );
}
