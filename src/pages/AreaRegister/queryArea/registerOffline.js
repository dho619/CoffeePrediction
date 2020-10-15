import { Alert } from 'react-native';
import { execute_db_offline, get_guid } from '../../../db/db_offline';

export const registerOffline = async (newArea) => {
    try{
        id = await get_guid();
        await execute_db_offline(`INSERT INTO areas (id, name, description, 
            location , user_id, type_area_id, type_area_name, type_action) VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, newArea.name, newArea.description,
             newArea.location, newArea.user_id, 
             newArea.type_area_id, newArea.type_area_name, 'insert']
        );

        Alert.alert(
            "Sucesso",
            'Área cadastrada com sucesso!',
            [
            { text: "OK"}
            ],
            { cancelable: false }
        );
    }catch(err){
        Alert.alert(
            "Aviso",
            'Erro ao tentar cadastrar a área, tente novamente em alguns instantes!',
            [
            { text: "OK"}
            ],
            { cancelable: false }
        );
        console.log(err);
    }
}