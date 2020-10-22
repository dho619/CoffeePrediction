import { execute_db_offline } from '../../../../db/db_offline';
import { api } from '../api/api';

export const replicate_classifications = async () => {
    await insert_classifications();
    await update_classifications();
    await delete_classifications();
}

const insert_classifications = async () => {
    const classifications = await execute_db_offline("SELECT * FROM classifications WHERE type_action = 'insert';");
    await classifications.map(async classification => {
        console.log(classification);
        let asset = await FileSystem.readAsStringAsync(classification.image, { encoding: FileSystem.EncodingType.Base64 })
        const newClassification = {
            id: classification.id,
            name: classification.name,
            description: classification.description,
            area_id: classification.area_id,
            image: asset,
            user_id: classification.user_id,
        };
        try {
            await api.post('classifications', newClassification, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await execute_db_offline("DELETE FROM classifications WHERE id = ?;", [classification.id]);
        } catch (err) {
        }
    });
}

const update_classifications = async () => {
    const classifications = await execute_db_offline("select * from classifications where type_action = 'update';");
    await classifications.map(async classification => {
        const newClassification = {
            name: classification.name,
            description: classification.description,
        };
        try {
            await api.put(`classifications/${classification.id}`, newClassification, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await execute_db_offline("DELETE FROM classifications WHERE id = ?;", [classification.id]);
        } catch (err) {

        }
    });
}

const delete_classifications = async () => {
    const classifications = await execute_db_offline("select * from classifications where type_action = 'delete';");
    await classifications.map(async classification => {
        try {
            await api.delete(`classifications/${classification.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await execute_db_offline("DELETE FROM classifications WHERE id = ?;", [classification.id]);
        } catch (err) {

        }
    });
}
