import api from '../../../services/api';

export async function handleDeleteOnline(id, token) {
    try {
        const response = await api.delete(`areas/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status = 201) {
            alert('Área apagada com sucesso!')
        } else {
            alert('Erro ao apagar a área, tente novamente mais tarde!')
        }

    } catch {
        alert('Erro ao apagar a área, tente novamente mais tarde!')
    }
}