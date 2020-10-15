import { Alert } from 'react-native';
import api from '../../../services/api';

export const alterOnline = async (id, newArea, token) => {
    try{      
        const response = await api.put(`areas/${id}`, newArea, {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        });

        Alert.alert(
            "Sucesso",
            'Área atualizada com sucesso!',
            [
            { text: "OK"}
            ],
            { cancelable: false }
        );
    }catch(err){
        Alert.alert(
            "Aviso",
            'Erro ao atualizar a área, tente novamente em alguns instantes!',
            [
            { text: "OK"}
            ],
            { cancelable: false }
        );
    }
}