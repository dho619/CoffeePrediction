import { Alert } from 'react-native';
import api from '../../../services/api';

export const fillClassificationOnline = async (token, page) => {
    try {
        const response = await api.get('classifications?page=' + page, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data.length ? response.data.data : [];
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