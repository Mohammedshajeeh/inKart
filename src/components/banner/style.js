import { StyleSheet, Dimensions, StatusBar } from "react-native";
import color from "../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
       flexDirection:'row',
       justifyContent:'space-between',
       padding:18
    },
    Banner:{
        height: height * 0.25,
        width:width * 0.88,
        resizeMode:'contain',
        overflow:'hidden',
        borderRadius:15,
        margin:23
    },
    textIn : {
        fontFamily:'Lato-Bold',
        color:color.white,
        fontSize:35
    },
    textIn2 : {
        fontFamily:'Lato-Bold',
        color:color.white,
        fontSize:15
    },
    touch:{
        backgroundColor:color.primaryGreen,
        padding:18,
        justifyContent:'center',
        alignItems:'center',
        width: width* 0.3,
        marginVertical: 9,
        borderRadius:15
    },
    innerTouch : {
        fontFamily:'Lato-Black',
        color:color.white,
       
    }
})

export default Style