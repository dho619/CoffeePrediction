import { Alert } from 'react-native';
import api from '../../../services/api';

export const registerOnline = async (newArea, token) => {
    try{
        const response = await api.post('areas', newArea, {
            headers: { 
            Authorization: `Bearer ${token}`
            }
        });

        Alert.alert(
            "Sucesso",
            'Área cadastrada com sucesso!',
            [
            { text: "OK"}
            ],
            { cancelable: false }
        );       
    }catch(err){
        Alert.alert(
            "Aviso",
            'Erro ao tentar cadastrar a área, tente novamente em alguns instantes!',
            [
            { text: "OK"}
            ],
            { cancelable: false }
        );
        console.log(err)
    }
}