import NetInfo from '@react-native-community/netinfo';

import { replicate_areas } from '../replication/areas';
import { replicate_classifications } from '../replication/classifications';
import { replicate_users } from '../replication/users';

export const isOnline = async () => {
    var netState = await NetInfo.fetch();
    return netState.isConnected && netState.isInternetReachable;
}

export const replicate_to_the_backend = async () => {
    console.log('Replicando dados para o backend...')
    try {
        await replicate_users();
        await replicate_areas();
        await replicate_classifications();
    } catch (err) {
    }
} 