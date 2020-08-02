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
      borderRadius: 10,
    },
    dtAtivacao: {
      fontSize: 15,
      marginBottom: 10,
    },
    infGerais:{
      padding: 20,
    },
    agroup: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 15,
    },
    field: {
      fontSize: 17,
      fontWeight: 'bold',
      width: 75,
    },
    input: {
      backgroundColor: '#FFF',
      width: '60%',
      color: '#222',
      fontSize: 16,
      borderRadius: 7,
      padding: 5,
  },
  buttonsArea: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 10,
  },
  textButtons: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  }
});