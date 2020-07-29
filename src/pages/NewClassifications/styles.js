import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        backgroundColor: '#cf965e',
    },
    formClassification:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    imgFolha:{
        width: 160,
        height: 200,
        marginBottom: 60,
        marginTop: 65
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
    inputMultiline: {
        backgroundColor: '#FFF',
        width: '90%',
        maxHeight:82,
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
        borderRadius: 7,
        marginBottom: 10,
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
    },
    imageBackground:{
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1
    },
});