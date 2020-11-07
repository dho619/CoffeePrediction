import { execute_db_offline } from '../../db/db_offline';
import api from '../api';
import { isSignedIn } from '../../context/authenticationFunctions';

export const replicate_areas = async () => {
    const token = await isSignedIn()

    const areas = await execute_db_offline("SELECT * FROM areas order by replication_sequence;");

    await areas.map(async area => {
        var response = false;
        switch (area.type_action) {
            case 'insert':
                response = await insert_areas(area, token);
                break;
            case 'update':
                response = await update_areas(area, token);
                break;
            case 'delete':
                response = await delete_areas(area, token);
        }
        if (response) {
            try {
                await execute_db_offline("DELETE FROM areas WHERE id = ?;", [area.id]);
            } catch (err) {
                console.log(err);
            }
        }
    });
}

const insert_areas = async (area, token) => {
    await areas.map(async area => {
        const newArea = {
            id: area.id,
            name: area.name,
            description: area.description,
            type_area_id: area.type_area_id,
            user_id: area.user_id,
        };
        try {
            await api.post('areas', newArea, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    });
}

const update_areas = async (area, token) => {
    const areas = await execute_db_offline("select * from areas where type_action = 'update';");
    await areas.map(async area => {
        const newArea = {
            name: area.name,
            description: area.description,
            type_area_id: area.area_id,
        };
        try {
            await api.put(`areas/${area.id}`, newArea, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    });
}

const delete_areas = async (area, token) => {
    const areas = await execute_db_offline("select * from areas where type_action = 'delete';");
    await areas.map(async area => {
        try {
            await api.delete(`areas/${area.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    });
}
