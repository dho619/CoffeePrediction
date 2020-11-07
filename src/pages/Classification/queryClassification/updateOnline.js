import api from '../../../services/api';

export const updateOnline = async (id, updateClassification, token) => {
    try {
        await api.put(`classifications/${id}`, updateClassification, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch{
        return false;
    }
}