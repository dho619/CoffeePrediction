import { Alert } from 'react-native';
import api from '../../../services/api';

export const fillAreasOnline = async (token) => {
    try {
        const response = await api.get('areas', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (err) {
        Alert.alert(
            "Aviso",
            'Erro ao carregar as Áreas, tente recarregar a página para resolver o problema!',
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }
}