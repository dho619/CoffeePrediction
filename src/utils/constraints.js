import {Alert} from 'react-native';

export const constraintsEmail = {
    email: {
      presence: {
        allowEmpty: false,
        message: "^Nescessário preencher o campo de Email!"
      },
      email: {
        message: "^Nescessário preencher um Email válido!"
      }
    },
};

export function validatePassword(pass, pass2){
    //verifica se senha existe
    if(pass === ''){
        Alert.alert(
            "Aviso",
            'Nescessário preencher o campo de Senha',
            [
                { text: "OK"}
            ],
            { cancelable: false }
        );
        return false;
    }

    //verifica se senha 2 existe
    if(pass2 === ''){
        Alert.alert(
            "Aviso",
            'Nescessário preencher o campo de Confirmação de Senha',
            [
                { text: "OK"}
            ],
            { cancelable: false }
        );
        return false;
    }

    //verifica se sao iguais
    if(pass !== pass2){
        Alert.alert(
            "Aviso",
            'O campo de Senha e Confirmar Senha não coincidem!',
            [
                { text: "OK"}
            ],
            { cancelable: false }
        );
        return false;
    }

    //verifica se tem mais de 8 caracteres
    if (pass.length < 8){
        Alert.alert(
            "Aviso",
            'A senha deve conter pelo menos 8 caracteres!',
            [
                { text: "OK"}
            ],
            { cancelable: false }
        );
        return false; 
    }

    return true;
};