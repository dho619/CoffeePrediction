import { execute_db_offline } from '../../db/db_offline';
import api from '../api';
import { isSignedIn } from '../../context/authenticationFunctions';

export const replicate_areas = async () => {
    const token = await isSignedIn()

    await insert_areas(token);
    await update_areas(token);
    await delete_areas(token);
}

const insert_areas = async (token) => {
    const areas = await execute_db_offline("SELECT * FROM areas WHERE type_action = 'insert';");

    await areas.map(async area => {
        const newArea = {
            id: area.id,
            name: area.name,
            location: area.location,
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
            await execute_db_offline("DELETE FROM areas WHERE id = ?;", [area.id]);
        } catch (err) {
            console.log(err)
        }
    });
}

const update_areas = async (token) => {
    const areas = await execute_db_offline("select * from areas where type_action = 'update';");
    await areas.map(async area => {
        const newArea = {
            name: area.name,
            description: area.description,
            location: area.location,
            type_area_id: area.area_id,
        };
        try {
            await api.put(`areas/${area.id}`, newArea, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await execute_db_offline("DELETE FROM areas WHERE id = ?;", [area.id]);
        } catch (err) {

        }
    });
}

const delete_areas = async (token) => {
    const areas = await execute_db_offline("select * from areas where type_action = 'delete';");
    await areas.map(async area => {
        try {
            await api.delete(`areas/${area.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await execute_db_offline("DELETE FROM areas WHERE id = ?;", [area.id]);
        } catch (err) {

        }
    });
}
