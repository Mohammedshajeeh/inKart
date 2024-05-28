import { StyleSheet, Dimensions } from "react-native";
import color from "../../../../components/common/color";


const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
        height:height,
        backgroundColor:color.white_level3
    },
    main:{
        flex:1
    },
    title:{
        fontSize:20
    },
    flatlist: {
        paddingHorizontal: 10, // Added horizontal padding for better alignment
    },
    imageView: {
        padding: 10,
        overflow: 'hidden',
        borderRadius: 15,
        width: width * 0.25, // Adjusted width to accommodate padding
        height:height * 0.15,
        justifyContent: 'center', // Align items vertically in the center
        alignItems: 'center', // Align items horizontally in the center
    },
    image: {
        width:width * 0.2,
        height:height * 0.2,
        resizeMode: 'contain',
    },
})

export default Style