import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";

const { width, height } = Dimensions.get('screen');

const Style = StyleSheet.create({
    container: {
        flex: 1,
        height: height
    },
    tobg: {
        width: width,
        height: height * 0.2,
        resizeMode: 'cover',
    },
    scrollView: {
        backgroundColor: color.white,
        marginTop: -width * 0.2,
        borderTopRightRadius: width * 0.05,
        borderTopLeftRadius: width * 0.05,
        overflow:'hidden',
        padding: width * 0.05,
        paddingBottom:width * 0.3,
    },
    logo: {
        width: width * 0.5,
        height: height * 0.09,
        resizeMode: 'contain'
    },
    loginText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
        color: color.black
    },
    Create: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        marginVertical: width * 0.025,
        marginBottom: width * 0.09
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primaryBlue,
        padding: 16
    },
    containerr: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderColor: "black",
        marginHorizontal: 5,
    },
    text: {
        paddingHorizontal: 10,
    },
    errorText:{
        color:'red',
        fontSize:15,
        fontFamily: 'Lato-Regular',
    }
});

export default Style;
// import {StyleSheet, Dimensions} from 'react-native';
// import color from '../../components/common/color';

// const {width, height} = Dimensions.get('screen');
// const style = StyleSheet.create({
//   container: {
//     height: height,
//     flex: 1,
//   },
//   topBg: {
//     width: width,
//     height: height * 0.2,
//     resizeMode: 'cover',
//   },
//   scrollview: {
//     flex: 1,
//     backgroundColor: color.white,
//     marginTop: -width * 0.2,
//     borderTopRightRadius: width * 0.05,
//     borderTopLeftRadius: width * 0.05,
//     overflow: 'hidden',
//     padding: width * 0.03,
//   },
//   logo: {
//     width: 150,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   loginText: {
//     fontFamily: 'poppins-Bold',
//     fontSize: 25,
//     color: color.steel,
//   },
//   createNew: {
//     fontSize: 14,
//     color: color.steel,
//     textAlign: 'center',
//     marginVertical: width * 0.025,
//     paddingBottom: width * 0.2
//   },
//   dashedLine: {
//     flex: 1,
//     height: 1,
//     borderStyle: 'dashed',
//     borderWidth: 1,
   
//   },
//   dashedText: {
//     textAlign: 'center',
//     paddingHorizontal: 8,
//     fontSize: 20
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'red'
//   },
//   errorView: {
//     marginVertical: 10
//   }
// });

// export default style;

