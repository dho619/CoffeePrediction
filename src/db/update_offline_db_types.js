import { execute_db_offline } from './db_offline';
import api from '../services/api';

export async function update_type_areas(){
    try {
        const response = await api.get('typeAreas');
        await execute_db_offline('DELETE FROM type_areas');
        await response.data.data.map(type => {
            execute_db_offline('INSERT INTO type_areas (id, name, description) VALUES (?, ?, ?)',[type.id, type.name, type.description]);
        });
    } catch (err){
        alert('Erro ao carregar os tipos de áreas disponíveis! Recarregue o aplicativo e tente novamente.');
    }
}