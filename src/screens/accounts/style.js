import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
        flex:1,
        height:height,
        backgroundColor:color.white_level3,
        padding:15
    },
    head:{
        fontFamily:'Lato-Bold',
        fontSize:30,
        color:color.black,
        textAlign:'center'
    },
    imageView:{
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
    },
    image1:{
        width:width * 0.45,
        height:height * 0.25,
        borderRadius: width * 0.2
    },
    edit:{
        width: width * 0.10,
        height:height * 0.15,
        resizeMode:'contain',
        position:'absolute',
        bottom:-50,
        right:-90

    },
    bigimage:{
        width:width * 0.95,
        height:height * 0.55,
        borderRadius: width * 0.2
    },
    modeBack:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:color.black_level3
    }

})

export default Style