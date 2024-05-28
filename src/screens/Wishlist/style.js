import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
        height:height,
        backgroundColor:color.white_level3
    },
    icon:{
        width:width * 0.07,
        height:height * 0.05,
        resizeMode:'contain'
    },
    iconView:{
        position:'absolute',
        top:-2,
        right:2,
        backgroundColor:color.red,
        borderRadius:20,
        overflow:'hidden'
    },
    productView:{
        alignSelf:'center',
        backgroundColor:color.white,
        borderRadius:15,
        overflow:'hidden',
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        marginVertical:15,
     
    },
    image:{
        width:width * 0.35,
        height:height * 0.14,
        resizeMode:'contain'
    },
    Text:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        lineHeight:22
    },
    SecondView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginVertical:5,
    }
})

export default Style



