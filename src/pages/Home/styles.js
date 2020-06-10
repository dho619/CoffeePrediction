import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    areaText: {
        top: 80,
        left: 15,
    },
    text1: {
      color: "#6b3600",
      fontSize: 50,
      fontWeight: "bold",
      textShadowColor: 'rgba(0, 98, 45, 1)',
      textShadowOffset: {width: 10, height: 10},
      textShadowRadius: 10
    },
    text2: {
        color: "#6b3600",
        fontSize: 50,
        fontWeight: "bold",
        top: 30,
        textShadowColor: 'rgba(0, 98, 45, 1)',
        textShadowOffset: {width: 10, height: 10},
        textShadowRadius: 10
    },
    text3: {
        color: "#6b3600",
        fontSize: 50,
        fontWeight: "bold",
        top: 60,
        textShadowColor: 'rgba(0, 98, 45, 1)',
        textShadowOffset: {width: 10, height: 10},
        textShadowRadius: 10
        
    },
    btNewPhoto: {
        marginTop: 'auto',
        bottom: 50,
        right: 40,
        alignSelf: "flex-end"
    },
    btMenu: {
        marginTop: 20,
        marginRight: 10,
    }
  });