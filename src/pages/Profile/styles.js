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
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00622D'
  },
  avatarText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  },
  datasUsuario: {
    fontSize: 15,
  },
  btEditar: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtBtEditar: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  infGerais: {
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
  titleSenha: {
    fontSize: 17,
    fontWeight: 'bold',
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