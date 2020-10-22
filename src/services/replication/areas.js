import { execute_db_offline } from '../../../../db/db_offline';
import { api } from '../api/api';

export const replicate_areas = async () => {
    await insert_areas();
    await update_areas();
    await delete_areas();
}

const insert_areas = async () => {
    const areas = await execute_db_offline("SELECT * FROM areas WHERE type_action = 'insert';");
    await areas.map(async area => {
        console.log(area);
        const newarea = {
            id: area.id,
            name: area.name,
            description: area.description,
            type_area_id: area.area_id,
            user_id: area.user_id,
        };
        try {
            await api.post('areas', newarea, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await execute_db_offline("DELETE FROM areas WHERE id = ?;", [area.id]);
        } catch (err) {
        }
    });
}

const update_areas = async () => {
    const areas = await execute_db_offline("select * from areas where type_action = 'update';");
    await areas.map(async area => {
        const newarea = {
            name: area.name,
            description: area.description,
            type_area_id: area.area_id,
        };
        try {
            await api.put(`areas/${area.id}`, newarea, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await execute_db_offline("DELETE FROM areas WHERE id = ?;", [area.id]);
        } catch (err) {

        }
    });
}

const delete_areas = async () => {
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
