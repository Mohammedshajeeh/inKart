import { StyleSheet, Dimensions, StatusBar } from "react-native";
import color from "../../../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
       margin:20
    },
    head:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        color:color.black,
        textAlign:'center'
    },
    flatlist:{
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center'
    },
    itemName:{
        fontFamily:'Lato-Bold',
        color:color.black,
        fontSize:15,
        textAlign:'center'
    },
    image:{
        width:60,
        height:60,
        resizeMode:'contain'
    },
    imageView:{
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        marginBottom:10

    },
    innerView:{
        marginRight:10,
        marginBottom:10
    }
   
  
})

export default Style