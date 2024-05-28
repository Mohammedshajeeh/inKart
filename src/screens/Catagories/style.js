import { StyleSheet, Dimensions, StatusBar } from "react-native";
import color from "../../components/common/color";



const { width, height } = Dimensions.get('screen')
const Style = StyleSheet.create({
    container: {
        margin: 10
    },
    head: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.black,
        textAlign: 'center'
    },
    flatlist: {
        marginVertical: 10,
        backgroundColor: color.primaryBlue,
        width: width * 0.26,
        height: height * 0.8
    },
    itemName: {
        fontFamily: 'Lato-Bold',
        color: color.black,
        fontSize: 15,
        textAlign: 'center'
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        margin: 10,


    },
    imageView: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 10,
    },
    innerView: {
        marginRight: 10,
        marginBottom: 10
    },
    touch: {
        borderBottomWidth: 1,
    },
    clickImage: {
        width: width * 0.68,
        height: height * 0.19,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
    underbgImage: {
        width: width * 0.25,
        height: height * 0.25,
        resizeMode: 'contain',
        borderRadius: 25,
        width: width * 0.25,
        height: height * 0.15,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListItem: {
        margin: 10,
        padding: 10
    },
    text: {
        color: 'black',
        textAlign: 'center',
    },


})

export default Style