import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#cf965e',
    },
    aboutContainer: {
        flex: 1,
        alignItems: 'center'
    },
    headerContainer: {
        flex: .2,
        marginTop: 10,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: "#00622D",
    },
    bodyContainer: {
        flex: .7,
        width: "80%",
        alignItems: "center",
    },
    infoAbout: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 50
    },
    infoAuthor: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 20
    },
    feedback: {
        flex: .1,
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    btnFeedback: {
    },
    textBtnFeedback: {
        color: "#00622D",
    }
});