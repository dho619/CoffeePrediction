import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#cf965e',
    },
    header: {
        flex: .2,
        marginTop: 10,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: "#00622D",
    },
    feedbackContainer: {
        flex: 1,
        paddingLeft: 40
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
        flexDirection: 'row',
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
        marginRight: 10
    },
});

const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 17,
        padding: 10,
        backgroundColor: '#FFF',
        marginBottom: 15,
        width: '90%',
        color: '#222',
        borderRadius: 7,
    },
    inputAndroid: {
        fontSize: 17,
        padding: 10,
        paddingRight: 40,
        width: '90%',
        backgroundColor: '#FFF',
        marginBottom: 15,
        color: '#222',
        borderRadius: 7,
    },
    iconContainer: {
        top: 15,
        right: 47,
    },
});

export { styles, pickerStyle };