import NetInfo from '@react-native-community/netinfo';

export const isOnline = async () => {
    var netState = await NetInfo.fetch()
    return netState.isConnected
} 