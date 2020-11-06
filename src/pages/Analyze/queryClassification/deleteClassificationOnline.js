import api from '../../../services/api';

export async function handleDeleteOnline(id, token) {
    try {
        const response = await api.delete(`classifications/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status = 201) {
            fillAreas();
            alert('Análise apagada com sucesso!')
        } else {
            alert('Erro ao apagar a análise, tente novamente mais tarde!')
        }

    } catch (err) {
        console.log(err)
        alert('Erro ao apagar a análise, tente novamente mais tarde!')
    }
}