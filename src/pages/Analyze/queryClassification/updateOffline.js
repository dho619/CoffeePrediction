import { execute_db_offline } from '../../../db/db_offline';

export const updateOffline = async (id, updateClassification) => {
    try {
        await execute_db_offline("DELETE FROM classifications WHERE ID = ? AND type_action = ?", [id, 'update']);

        let area_offline = await execute_db_offline("SELECT * FROM classifications WHERE ID = ? AND type_action = ?", [id, 'insert']);

        if (area_offline.length > 0) {
            await execute_db_offline("UPDATE classifications SET name = ?, description = ? WHERE id = ? ",
                [updateClassification.name, updateClassification.description, id]
            );
            console.log(`aqui`)

        } else {
            await execute_db_offline("INSERT INTO classifications (id, name, description, type_action) VALUES (?, ?, ?, ?)",
                [id, updateClassification.name, updateClassification.description, 'update']
            );
        }
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}