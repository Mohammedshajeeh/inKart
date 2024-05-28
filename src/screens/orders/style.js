import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
        height:height,
        backgroundColor:color.white_level3
    },
    image:{
        width:width * 0.35,
        height:height * 0.10,
        resizeMode:'cover',
        borderRadius:20
    }
})

export default Style

