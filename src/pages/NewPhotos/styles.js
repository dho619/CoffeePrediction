import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#cf965e',
    },

    camera: { flex: 1 },

    btFlash: {
        margin: 10,
        alignSelf: "flex-end",
    },

    areaButtons: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },

    btTypeCamera: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },

    borderBtType: {
        padding: 10,
        borderRadius: 50,
        borderColor: '#FFF',
        borderWidth: 5
    },
    containerPhoto: {
        flex: 1,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    areaButtonPhoto: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btPhoto: {
    },
});