import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";

const Style = (width, height, isPortrait) => {

    return StyleSheet.create({
        viewOne: {

        },
        viewOneText: {

        },
        touchOne: {

        },
        touchOneImage: {
            width: width * 0.09,
            height: height * 0.09,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            marginTop: 13
        },
        touchTwo: {

        },
        touchTwoImage: {
            width: width * 0.09,
            height: height * 0.09,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            marginTop: 13
        },
        viewTwo: {
        },
        viewTwoImage: {
            width: width * 0.55,
            height: height * 0.55,
            marginVertical: 5,
            resizeMode: 'contain',
            borderRadius: 10
        },
        viewThree: {
            backgroundColor: color.white,
            borderRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            elevation: 15,

        },
        viewThreeon: {
            padding: width * 0.05,

        },
        viewThreeTextOne: {
            color: color.black,
            fontFamily: 'Lato-Bold',
            fontSize: 40,
        },
        viewThreeTextTwo: {
            color: color.black,
            fontFamily: 'Lato-Bold',
            fontSize: 22
        },
        viewFour: {
            justifyContent: 'center',
            alignSelf: 'center',
        }

    });
};

export default Style;

