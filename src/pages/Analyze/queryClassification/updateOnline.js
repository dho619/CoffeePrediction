import api from '../../../services/api';

export const updateOnline = async (id, updateClassification, token) => {
    try {
        let response = await api.put(`classification/${id}`, updateClassification, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.status == 200;
    } catch {
        return false;
    }
}