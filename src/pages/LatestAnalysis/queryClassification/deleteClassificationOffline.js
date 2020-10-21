import { execute_db_offline } from '../../../db/db_offline';

export async function handleDeleteOffline(id, areas) {
    let area_online = await areas.filter(area => area.id === id);
    try {
        await execute_db_offline("DELETE FROM areas WHERE id = ?", [id])
        if (area_online.length) {
            await execute_db_offline(`INSERT INTO areas (id, type_action) VALUES 
                (?, ?)`, [id, 'delete']
            );
        }
    } catch {
        alert('Erro ao excluir a area!');
    }

    alert('Área apagada com sucesso!')
}