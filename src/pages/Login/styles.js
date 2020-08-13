import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cf965e',
      alignItems: 'center',
      justifyContent:'center',
    },
    containerLogo:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    containerForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50,
    },
    containerPass:{
        right: 10, //Por algum motivo ele sai do rumo, por ter a view
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        marginBottom: 15,
        width: '90%',
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
    },
    visibilityPass:{
        marginLeft: -50,
        marginBottom: 15,
    },
    iconVisibility:{
        opacity: 0.3,
    },
    btnSubmit: {
        backgroundColor: '#00622D',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
    },
    containerRemember: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    textRemember: {
        fontSize: 15,
        color: '#696969',
    },
    btnRegister: {
        marginTop: 10,
    },
    registerText: {
        color: '#FFF',
        fontSize: 18,
    }
  });