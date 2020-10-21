import { Alert } from 'react-native';
import api from '../../../services/api';

export const registerOnline = async (newClassification, token) => {
    try {
        await api.post('classifications', newClassification, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        Alert.alert(
            "Sucesso",
            'Foto enviada para análise!',
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
        return true;
    } catch (err) {
        console.log(err.message)
        return false;
    }
}