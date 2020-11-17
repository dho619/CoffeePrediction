import { execute_db_offline } from '../../../db/db_offline';

export const updateOffline = async (id, updateClassification) => {
    try {
        await execute_db_offline("DELETE FROM classifications WHERE ID = ? AND type_action = ?", [id, 'update']);

        let classification_offline = await execute_db_offline("SELECT * FROM classifications WHERE ID = ? AND type_action = ?", [id, 'insert']);

        if (classification_offline.length > 0) {
            await execute_db_offline("UPDATE classifications SET name = ?, description = ?, area_id = ?, area_name = ? WHERE id = ? ",
                [updateClassification.name, updateClassification.description, updateClassification.area_id, updateClassification.area_name, id]
            );
        } else {
            await execute_db_offline("INSERT INTO classifications (id, name, description, area_id, area_name, type_action) VALUES (?, ?, ?, ?, ?, ?)",
                [id, updateClassification.name, updateClassification.description, updateClassification.area_id, updateClassification.area_name, 'update']
            );
        }
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}