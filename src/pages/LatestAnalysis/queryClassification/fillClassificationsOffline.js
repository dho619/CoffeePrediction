import { Alert } from 'react-native';
import { execute_db_offline } from '../../../db/db_offline';

export const fillClassificationsOffline = async (classifications) => {
    try {
        let classifications_offline = await execute_db_offline("SELECT * FROM classifications");

        //tirar todos os casos onde tem classification online editada ou deletada
        let filtered_classifications = await classifications.filter(classification => classifications_offline.filter(classification_offline => classification_offline.id === classification.id).length === 0)

        //tirar os tipos de ação delete
        let filtered_classifications_offline = await classifications_offline.filter(classification_offline => classification_offline.type_action !== 'delete')

        return [...filtered_classifications_offline, ...filtered_classifications];
    } catch (err) {
        console.log(err)
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