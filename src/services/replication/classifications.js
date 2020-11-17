import * as FileSystem from 'expo-file-system';

import { execute_db_offline } from '../../db/db_offline';
import api from '../api';
import { isSignedIn } from '../../context/authenticationFunctions';

export const replicate_classifications = async () => {
    const token = await isSignedIn()

    const classifications = await execute_db_offline("SELECT * FROM classifications order by replication_sequence;");
    await classifications.map(async classification => {
        var response = false;
        switch (classification.type_action) {
            case 'insert':
                response = await insert_classifications(classification, token);
                break;
            case 'update':
                response = await update_classifications(classification, token);
                break;
            case 'delete':
                response = await delete_classifications(classification, token);
        }
        if (response) {
            try {
                if (classification.image) {
                    FileSystem.deleteAsync(classification.image, { idempotente: true })

                }
                await execute_db_offline("DELETE FROM classifications WHERE id = ?;", [classification.id]);
            } catch (err) {
                console.log(err);
            }
        }
    });
}

const insert_classifications = async (classification, token) => {
    let asset = await FileSystem.readAsStringAsync(classification.image, { encoding: FileSystem.EncodingType.Base64 })
    const newClassification = {
        id: classification.id,
        name: classification.name,
        description: classification.description,
        location: classification.location,
        image: asset,
        area_id: classification.area_id,
        user_id: classification.user_id,
    };
    try {
        await api.post('classifications', newClassification, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return true;
    } catch (err) {
        return false;
    }
}

const update_classifications = async (classification, token) => {
    const newClassification = {
        name: classification.name,
        description: classification.description,
        area_id: classification.area_id,
    };
    try {
        await api.put(`classifications/${classification.id}`, newClassification, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (err) {
        return false;
    }
}

const delete_classifications = async (classification, token) => {
    try {
        await api.delete(`classifications/${classification.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (err) {
        return false;
    }
}
