import { StyleSheet, Dimensions } from "react-native";
import color from "../../../components/common/color";

const Style = (width, height, isPortrait) => {

    return StyleSheet.create({
        viewOne: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            justifyContent: 'space-between'
        },
        viewTwo: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '45%',
            backgroundColor: color.iron,
            padding: 10,
            borderRadius: 15
        },
        viewTwoText: {
            fontFamily: 'Lato-Regular',
            fontSize: 15,
            color: color.white
        },
        viewTwoImage: {
            width: width * 0.06,
            height: height * 0.06,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            marginTop: 13
        },
        viewThree: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '40%',
            backgroundColor: color.iron,
            padding: 10,
            borderRadius: 15

        },
        viewThreeText: {
            fontFamily: 'Lato-Regular',
            fontSize: 15,
            color: color.white
        },
        viewThreeImage: {
            width: width * 0.06,
            height: height * 0.06,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            marginTop: 13
        },
        extraheader: {
            justifyContent:'space-between',
            flexDirection:'row',
            alignItems:'center'
        },
        extraheaderText: {
            fontFamily: 'Lato-Regular',
            fontSize: 18,
            color:color.black
        },
        extraContent:{
            padding:5
        },
        extraContentText:{
            fontFamily: 'Lato-Regular',
            fontSize: 15,
        },
        container:{

        },
        imageOne:{
            width: 50,
            height: 50,
            resizeMode: 'contain',
            borderRadius: 15,
            overflow:'hidden'
        }



    });
};

export default Style;
