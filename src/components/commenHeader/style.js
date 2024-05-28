import { StyleSheet, Dimensions, StatusBar } from "react-native";
import color from "../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
       flexDirection:'row',
       justifyContent:'space-between',
       padding:18
    },
    logo: {
        width: width * 0.3,
        height: height * 0.05,
        resizeMode: 'contain'
    },
    drawerImage: {
        width: width * 0.1,
        height: height * 0.04,
        resizeMode: 'contain'
    }
})

export default Style