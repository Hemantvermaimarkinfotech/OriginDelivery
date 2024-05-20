// styles.js
import { StyleSheet } from 'react-native';
import colors from './src/utils/Colors';


const font = {
  fontFamily: 'DMSans-ExtraLight',
};

const mStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
    row: {
      flexDirection: 'row',
    },
    fullScreenContainer: {
      flex: 1,
    },
    button: {
      height: 55,
      backgroundColor: colors.primary,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent:'center'
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 0.8,
    },
    text: {
      fontSize: 16,
      color: '#333333',
    },
    paragraph: {
      fontSize: 14,
      color: '#666666',
      marginBottom: 10,
    },
    input: {
      height: 55,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    textarea: {
      height: 100,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingTop: 10,
      marginBottom: 10,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },

    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 35,
    },
    h3: {
      fontSize: 30,
    },
    h4: {
      fontSize: 26,
    },
    h5: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: 0.4,
    },
    h6: {
      fontSize: 18,
    },
    p: {

    },
    p1: {
      fontSize: 16,
      fontWeight: 400,
    },
    p2: {
      fontSize: 14,
      fontWeight: 400
    },
    drawerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      marginTop: 20,
      // borderWidth: 1
    },
    drawerText: {
      fontSize: 20,
      fontWeight: 600,
      color:"#23233C",
      fontFamily:"Montserrat-Medium"
    },
    drawerIconView: {
      marginLeft: 10,
      marginRight: 10,
      width: 35,
      // borderWidth: 1
      // alignItems: 'center'
    },
    drawerIcon: {
      height: 26,
      width: 26,
      objectFit: 'contain'
    },
    drawerHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: colors.white, // Header background color
      borderColor: colors.lightT,
      borderBottomWidth: 0.2
    },
  });
  

export default mStyle;
