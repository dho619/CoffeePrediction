import api from '../../../services/api';

export const updateOnline = async (id, updateUser, token) => {
    try {
        let response = await api.put(`users/${id}`, updateUser, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.status == 200;
    } catch {
        return false;
    }
}