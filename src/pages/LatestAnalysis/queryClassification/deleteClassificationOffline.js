import { execute_db_offline } from '../../../db/db_offline';

export async function handleDeleteOffline(id, classifications) {
    let classification_online = await classifications.filter(classification => classification.id === id);
    try {

        await execute_db_offline("DELETE FROM classifications WHERE id = ?", [id])
        if (classification_online.length) {
            await execute_db_offline(`INSERT INTO classifications (id, type_action) VALUES 
                (?, ?)`, [id, 'delete']
            );
        }
    } catch {
        alert('Erro ao excluir a Análise!');
    }

    alert('Análise apagada com sucesso!')
}