import { execute_db_offline } from '../../../../db/db_offline';
import { api } from '../api/api';

export const replicate_users = async () => {
    await update_users();
}

const update_users = async () => {
    const users = await execute_db_offline("select * from users;");
    await users.map(async user => {
        const newuser = {
            name: user.name,
            email: user.email,
        };
        try {
            await api.put(`users/${user.id}`, newuser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await execute_db_offline("DELETE FROM users WHERE id = ?;", [user.id]);
        } catch (err) {

        }
    });
}

