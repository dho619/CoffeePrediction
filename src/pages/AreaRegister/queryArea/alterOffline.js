import { Alert } from 'react-native';
import { execute_db_offline } from '../../../db/db_offline';

export const alterOffline = async (id, newArea) => {
    let type_action = 'update'

    let area_offline = await execute_db_offline("SELECT * FROM areas WHERE ID = ?", [id]);
    if (area_offline.length > 0){
        await execute_db_offline("DELETE FROM areas WHERE ID = ?", [id]);
        if (area_offline.type_action === 'insert'){
            type_action = 'insert'
        }
    }
    try{
        await execute_db_offline(`INSERT INTO areas (id, name, description, 
            location , user_id, type_area_id, type_area_name, type_action) VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, newArea.name, newArea.description,
             newArea.location, newArea.user_id, newArea.type_area_id, 
             newArea.type_area_name, type_action]
        );

        Alert.alert(
            "Sucesso",
            'Área Atualizada com sucesso!',
            [
            { text: "OK"}
            ],
            { cancelable: false }
        );
    }catch(err){
        Alert.alert(
            "Aviso",
            'Erro ao tentar atualizar a área, tente novamente em alguns instantes!',
            [
            { text: "OK"}
            ],
            { cancelable: false }
        );
    }
}