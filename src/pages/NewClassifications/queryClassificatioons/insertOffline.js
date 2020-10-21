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

export const registerOffline = async (newClassification, uri, token) => {
    console.log(`************************`)
    console.log(`Começando a registrar...`)
    try {
        id = await get_guid();

        await execute_db_offline("INSERT INTO classifications (id, name, description, image, user_id, area_id, type_action) "
            + " VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id, newClassification.name,
                newClassification.description, uri,
                newClassification.user_id, newClassification.area_id, `insert`
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

// const classifications = await execute_db_offline("select * from classifications where id <> 'aa';");
// await classifications.map(async classification => {
//     console.log(classification);
//     let asset = await FileSystem.readAsStringAsync(classification.image, { encoding: FileSystem.EncodingType.Base64 })
//     const newClassification = {
//         name: classification.name,
//         description: classification.description,
//         area_id: classification.area_id,
//         image: asset,
//         user_id: classification.user_id,
//     };
//     console.log(newClassification)
//     await registerOnline(newClassification, token);
// });