import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cf965e',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconBack: {
        marginTop: 20,
        marginRight: 20
    },
    classificationData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    photo: {
        margin: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    agroupInformation: {
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    informations: {
        fontSize: 15,
        width: 200,
        marginBottom: 5
    },
    classificationInformation: {
        fontSize: 17,
        width: 200,
        fontWeight: 'bold'
    },
    btEditar: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btDelete: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
    },
    txtBtEditar: {
        fontWeight: 'bold',
        color: '#00622D',
        marginRight: 5,
    },
    txtBtDelete: {
        fontWeight: 'bold',
        color: '#B22222',
        marginRight: 5,
    },
    infGerais: {
        padding: 20,
    },
    field: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        backgroundColor: '#FFF',
        width: '100%',
        color: '#222',
        fontSize: 16,
        borderRadius: 7,
        padding: 5,
        marginBottom: 15
    },
    inputMultiline: {
        backgroundColor: '#FFF',
        width: '100%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        textAlignVertical: 'top'
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