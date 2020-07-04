import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cf965e',
    },
    areaViewKeyboard: {
        alignItems: 'center',
        justifyContent:'center',
        flex: 1,
    },
    containerHeader:{
        height: '30%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader:{
        fontSize: 35,
        fontWeight: 'bold',  
        color: "#00622D",
    },
    containerForm: {
        flex: 1,
        alignItems: 'center',
        width: '90%',
        paddingBottom: 50,
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
    },
    inputDropBox: {
        backgroundColor: '#FFF',
        width: '90%',
        color: '#222',
        fontSize: 17,
    },
    inputMultiline: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        textAlignVertical: 'top'
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
    imageBackground:{
        flex: 1,
        width: 540,
        position: 'absolute',
        bottom: 0,
        top: '75%',
    },
  });