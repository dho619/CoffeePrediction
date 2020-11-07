import { execute_db_offline } from '../../../db/db_offline';

export const handleClassification = async (classification) => {
    try {
        let classification_offline = await execute_db_offline("SELECT * FROM classifications WHERE ID = ? AND type_action = ?", [classification.id, 'update']);
        if (classification_offline.length > 0) {
            classification.name = classification_offline[0].name;
            classification.description = classification_offline[0].description;
            return classification;
        } else {
            return classification;
        }
    } catch (err) {
        console.log(err)
    }
}