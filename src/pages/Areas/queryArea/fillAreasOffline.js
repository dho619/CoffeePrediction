import { Alert } from 'react-native';
import { execute_db_offline } from '../../../db/db_offline';

export const fillAreasOffline = async (areas) => {
    try {
        let areas_offline = await execute_db_offline("SELECT * FROM areas");
        //tirar todos os casos onde tem area online editada ou deletada
        let filtered_areas = await areas.filter(area => areas_offline.filter(area_offline => area_offline.id === area.id).length === 0)

        //tirar os tipos de ação delete
        let filtered_areas_offline = await areas_offline.filter(area_offline => area_offline.type_action !== 'delete')

        return [...filtered_areas_offline, ...filtered_areas];
    } catch (err) {
        Alert.alert(
            "Aviso",
            'Erro ao carregar as Áreas, tente recarregar a página para resolver o problema!',
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }
}