import { StyleSheet, Dimensions, StatusBar } from "react-native";
import color from "../../../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
       justifyContent:'space-between',
       padding:18,
       backgroundColor:color.white_level3,
       margin:15,
       borderRadius:15
    },
    boughtimage:{
        height: 60,
        width:60, 
    },
    viewText:{
        fontFamily:'Lato-Bold',
        color:color.black,
        fontSize:20
    },
    imageview:{
        backgroundColor:color.white,
        padding:15,
        borderRadius:20,
        margin:10
    }
  
})

export default Style