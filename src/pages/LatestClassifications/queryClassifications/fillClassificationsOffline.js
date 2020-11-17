import { Alert } from 'react-native';
import { execute_db_offline } from '../../../db/db_offline';

export const fillClassificationsOffline = async (classifications) => {
    try {
        let classifications_offline = await execute_db_offline("SELECT * FROM classifications WHERE type_action <> ?", ['update']);
        //tirar todos os casos onde tem classification deletada offline
        let filtered_classifications = await classifications.filter(classification => classifications_offline.filter(classification_offline => classification_offline.id === classification.id).length === 0)

        //atualizando as classificacoes
        let classifications_update = await execute_db_offline("SELECT * FROM classifications WHERE type_action = ?", ['update']);
        console.log(classifications_update);
        if (classifications_update.length > 0) {
            filtered_classifications = await filtered_classifications.map(classification => {
                let classification_update = classifications_update.filter(classification_update => classification_update.id === classification.id);
                if (classification_update.length > 0) {
                    classification.name = classification_update[0].name;
                    classification.description = classification_update[0].description;
                    classification.area.id = classification_update[0].area_id;
                    classification.area.name = classification_update[0].area_name;
                    return classification;
                } else {
                    return classification;
                }
            });
        }

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