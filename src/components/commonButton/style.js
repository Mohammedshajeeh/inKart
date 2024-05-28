import { Dimensions, StyleSheet } from "react-native";
import color from "../common/color";

const {width,height} = Dimensions.get('screen')

const Style = StyleSheet.create({
    Button:{
        backgroundColor:color.primaryGreen,
        padding:width * 0.05,
        borderRadius: 8,
        justifyContent:'center',
        alignItems:'center',
        marginVertical: width * 0.03,
        flexDirection:'row',


        },
        Text:{
            color:color.white,
            fontFamily:'Lato-Bold',
            fontSize:18,
        },
     
      
})

export default Style