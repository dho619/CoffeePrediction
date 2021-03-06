import { Alert } from 'react-native';
import api from '../../../services/api';

export const registerOnline = async (newArea, token, showMessage = true) => {
    try {
        const response = await api.post('areas', newArea, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (showMessage) {
            Alert.alert(
                "Sucesso",
                'Área cadastrada com sucesso!',
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
        return true;
    } catch (err) {
        Alert.alert(
            "Aviso",
            'Erro ao tentar cadastrar a área, tente novamente em alguns instantes!',
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
        console.log(err)
        return false;
    }
}