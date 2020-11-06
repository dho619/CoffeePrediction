import { Alert } from 'react-native';
import api from '../../../services/api';

export const fillClassificationOnline = async (token) => {
    try {
        const response = await api.get('classifications', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (err) {
        Alert.alert(
            "Aviso",
            'Erro ao carregar as Análises, tente recarregar a página para resolver o problema!',
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }
}