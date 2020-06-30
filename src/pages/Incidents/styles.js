import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cf965e',
    },
    mapArea: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});