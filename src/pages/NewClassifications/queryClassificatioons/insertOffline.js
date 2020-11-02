import { Alert } from 'react-native';
import { execute_db_offline, get_guid } from '../../../db/db_offline';
import * as FileSystem from 'expo-file-system';

const USER_IMAGE_DIR = FileSystem.documentDirectory + 'imgOffline';

// const copyImage = async (uri) => {
//     console.log(uri)
//     const imageName = `${Date.now()}.jpg`;
//     const imageSource = `${USER_IMAGE_DIR}/${imageName}`;

//     await FileSystem.makeDirectoryAsync(USER_IMAGE_DIR, { intermediates: true });

//     await FileSystem.copyAsync({
//         from: uri,
//         to: imageSource,
//     });

//     return imageSource;
// }

export const registerOffline = async (newClassification, uri) => {
    try {
        id = await get_guid();

        await execute_db_offline("INSERT INTO classifications (id, name, location, description, image, user_id, area_id, area_name, type_action) "
            + " VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [id, newClassification.name, newClassification.location,
                newClassification.description, uri, newClassification.user_id,
                newClassification.area_id, newClassification.area_name, `insert`
            ]
        );
        Alert.alert(
            "Sucesso",
            'Você se encontra sem internet no momento, sua foto foi guardada e assim que'
            + ' recuperar uma conexão ela será enviada para análise!',
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
