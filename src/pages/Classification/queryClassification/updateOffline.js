import { execute_db_offline } from '../../../db/db_offline';

export const updateOffline = async (id, updateClassification) => {
    try {
        let classification_offline = await execute_db_offline("SELECT * FROM classifications WHERE ID = ?;", [id]);

        await execute_db_offline("DELETE FROM classifications WHERE ID = ? AND type_action = ?", [id, 'update']);

        if (classification_offline &&
            classification_offline[0] &&
            classification_offline.type_action === 'insert') {
            await execute_db_offline("UPDATE classifications SET name = ?, description = ?, area_id = ?, area_name = ?, is_sended = ? WHERE id = ? ",
                [updateClassification.name, updateClassification.description, updateClassification.area_id, updateClassification.area_name, id]
            );
        } else {
            let is_sended = (classification_offline && classification_offline[0] && classification_offline[0].is_sended === 1) ? classification_offline[0].is_sended : 0;
            is_sended = updateClassification.is_sended ? updateClassification.is_sended : is_sended;
            await execute_db_offline("INSERT INTO classifications (id, name, description, area_id, area_name, is_sended, type_action) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [id, updateClassification.name, updateClassification.description, updateClassification.area_id, updateClassification.area_name, is_sended, 'update']
            );
        }
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}