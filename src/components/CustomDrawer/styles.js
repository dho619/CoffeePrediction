import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6b3600'
    },
    header: {
        padding: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        backgroundColor: '#cf965e'
    },
    btBack: {
        marginTop: 10,
        marginRight: 5,
        alignSelf: "flex-end"
    },
    userArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    btLogout: {
        marginTop: 5,
        marginRight: 15,
        marginLeft: 30,
        right: 15,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10,
        marginLeft: 10,
    },
    userText: {

    },
    name: {
        width: 135,
        fontSize: 18,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 13,
        width: 135,
    },
    props: {
        flex: 1,
    },
    titleArea: {

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold' ,
        color: '#00622D',
    },
  });