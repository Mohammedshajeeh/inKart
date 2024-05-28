import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
        height:height,
        backgroundColor:color.white_level3
    },
    dot:{
        fontSize:60,
        textAlign:'center',
        marginTop:-50,
        color:color.primaryBlue
    }
})

export default Style