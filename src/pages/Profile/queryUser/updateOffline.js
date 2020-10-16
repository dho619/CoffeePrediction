import { execute_db_offline } from '../../../db/db_offline';

export const updateOffline = async (id, updateUser) => {
    try {
        await execute_db_offline("DELETE FROM users WHERE id = ?", [id]);
        await execute_db_offline(`INSERT INTO users (id, name, email)
                VALUES (?, ?, ?)`, [id, updateUser.name, updateUser.email]);
        return true;
    } catch (err) {
        return false;
    }
}