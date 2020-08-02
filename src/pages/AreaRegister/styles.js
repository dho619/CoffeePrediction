import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cf965e',
    },
    areaViewKeyboard: {
        alignItems: 'center',
        flex: 1,
    },
    headerContainer:{
        height: '10%',
        width: '80%',
        marginTop: 10,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#00622D",
    },
    btReturnig: {
        position: 'absolute',
        right: 0,
    },
    containerForm: {
        flex: 1,
        alignItems: 'center',
        width: '90%',
        paddingBottom: 50,
        zIndex: 2,
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
        borderRadius: 7
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
    },
    imageBackground:{
        flex: 1,
        width: 540,
        height: 200,
        bottom: 0,
        position: 'absolute',
        zIndex: -1
    },
});

const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 17,
        padding: 10,
        backgroundColor: '#FFF',
        marginBottom: 15,
        color: '#222',
        borderRadius: 7,
    },
    inputAndroid: {
        fontSize: 17,
        padding: 10,
        paddingRight: 40,
        width: 317,
        backgroundColor: '#FFF',
        marginBottom: 15,
        color: '#222',
        borderRadius: 7,
    },
    iconContainer: {
        top: 15,
        right: 7,
    },
});

export { styles, pickerStyle };