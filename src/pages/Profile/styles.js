import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cf965e',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      margin: 20,
      width: 140,
      height: 140,
    },
    dtAtivacao: {
      fontSize: 15,
      marginBottom: 10,
    },
    infGerais:{
      padding: 20,
    },
    name: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 5,
      width: '90%',
    },
    email: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 10,
      width: '90%',
    },
});