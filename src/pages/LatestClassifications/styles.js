import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#cf965e',
    },
    headerContainer: {
        marginTop: 10,
        marginLeft: '10%',
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#00622D",
    },
    loading: {
        flex: .8,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingImage: {
        width: 250,
        height: 250
    },
    classificationContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    classificationList: {
        width: '90%',
        height: '75%',
        padding: 15,
    },
    classification: {
        backgroundColor: '#F5DEB3',
        padding: 20,
        borderRadius: 20,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
    classificationSelected: {
        backgroundColor: '#FFE',
        padding: 20,
        borderRadius: 20,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    classificationHeader: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    analyzeDesc: {
        fontSize: 15,
    },
    analyzeLocal: {
        fontSize: 15,
        width: 260
    },
    ExpandIcon: {
        position: 'absolute',
        flexDirection: 'row',
        right: 20,
        bottom: 10,
    },
});