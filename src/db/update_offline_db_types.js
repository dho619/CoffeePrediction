import { execute_db_offline } from './db_offline';
import api from '../services/api';

export async function get_type_areas() {
    try {
        const response = await api.get('typeAreas');
        return response.data ? response.data.data : undefined;
    } catch {
        return undefined;
    }
}

export async function update_type_areas() {
    try {
        const types = await get_type_areas();
        console.log(types);
        if (!types) return;
        await execute_db_offline('DELETE FROM type_areas');
        await types.map(type => {
            execute_db_offline('INSERT INTO type_areas (id, name, description) VALUES (?, ?, ?)', [type.id, type.name, type.description]);
        });
    } catch (err) {
        console.log(err);
        alert('Erro ao carregar os tipos de áreas disponíveis! Recarregue o aplicativo e tente novamente.');
    }
}