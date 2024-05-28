import { StyleSheet, Dimensions, StatusBar } from "react-native";
import color from "../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
       flexDirection:'center',
       justifyContent:'space-between',
       alignItems:'center',
       padding:18,
    },
    container1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        padding:18
    },
    search:{
        borderWidth:1,
        borderColor:color.grey,
        backgroundColor:color.primaryBlue,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        padding:1,
        width:width * 0.88,
        borderRadius:15
    },
    search1:{
        borderWidth:1,
        borderColor:color.grey,
        backgroundColor:color.primaryBlue,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        padding:1,
        width:width * 0.75,
        borderRadius:15
    },
    icon:{
        width: 25,
        height:25,
        resizeMode:'contain',
    },
    textInput:{
        fontSize:18,
        fontFamily:'Lato-Regular',
        marginLeft:15,
        flex:1
    },
    filter:{
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:color.primaryGreen
    }
})

export default Style