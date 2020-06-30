import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#cf965e',
    },
    title:{
        marginTop: 10,
        marginLeft: '10%',
        marginBottom: 25,
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    analysisContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    analysisList: {
        width: '90%',
        height: '75%',
        padding: 15,
    },
    analysisArea: {
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
    analyzeHeader:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5, 
    },
    analyzeDesc:{
        fontSize: 16,

    },
  });