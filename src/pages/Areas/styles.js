import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#cf965e',
    },
    headerContainer:{
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
    btNewArea: {
        position: 'absolute',
        right: 30,

    },
    areaContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    areaList: {
        width: '90%',
        height: '75%',
        padding: 15,
    },
    area: {
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
    areaHeader:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5, 
    },
    analyzeDesc:{
        fontSize: 16,

    },
    areaIcons: {
        position: 'absolute',
        flexDirection: 'row',
        right: 20,
        bottom: 10,
    },
    editIcon: {
        marginRight: 15,
    }
  });