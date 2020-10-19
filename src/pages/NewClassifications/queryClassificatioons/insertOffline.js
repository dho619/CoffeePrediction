import { Alert } from 'react-native';
import { execute_db_offline, get_guid } from '../../../db/db_offline';

export const registerOffline = async (newClassification) => {
    try {
        console.log(`antes do insert`)
        id = await get_guid();
        await execute_db_offline("INSERT INTO classifications (id, name, description, area_id, user_id, type_action) "
            + " VALUES (?, ?, ?, ?, ?, ?)",
            [id, newClassification.name,
                newClassification.description,
                newClassification.user_id, newClassification.area_id, `insert`
            ]
        );
        console.log(`depois do insert`)
        Alert.alert(
            "Sucesso",
            'Você se encontra sem internet no momento, sua foto foi guardada e assim que'
            + ' recuperar uma conexão ela será enviada para análise!',
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
        const classifications = await execute_db_offline("select * from classifications where id <> 'aa';");
        console.log(classifications);
        // await classifications.map(classification => {
        //     console.log(classification);
        // });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}