import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
        height:height
    },
    tobg: {
        width: width,
        height: height * 0.2,
        resizeMode: 'cover',

    },
    scrollView: {
        flex:1,
        backgroundColor: color.white,
        borderTopRightRadius: width * 0.05,
        borderTopLeftRadius: width * 0.05,
        padding: width * 0.05,
        overflow: 'hidden',
        marginTop: -width * 0.2,

    },
    logo: {
        width: width * 0.5,
        height: height * 0.09,
        resizeMode: 'contain'
    },
    loginText: {
        fontFamily: 'Lato-Bold',
        fontSize: 25,
        color: color.black
    },
    Create: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 15,
        fontFamily: 'Lato-Regular',
        marginVertical:width * 0.025
    },
   
})

export default Style
