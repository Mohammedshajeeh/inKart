import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";

const Style = (width, height, isPortrait) => {
  
    return StyleSheet.create({
        container: {
            backgroundColor: color.grey,
            paddingHorizontal: width * 0.05
        },
        contentStyle: {
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        catItemView: {
            marginVertical: width * 0.03,
            marginHorizontal: width * 0.02,
        },
        itemText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: color.lightGreen,
            fontFamily: 'Lato-Regular'
        },
        image: {
            width: width * 0.3,
            height: width * 0.3,
            resizeMode: 'contain'
        },
        imageView: {
            width: width * 0.9,
            borderRadius: 15,
            padding: 15,
            marginVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color.white,
        },
        viewOne: {
            flex: 1,
            marginLeft:  width * 0.04
        },
        viewOneText: {
            fontFamily: 'Lato-Bold',
            fontSize: 20,
            marginVertical:  width * 0.04
        },
        viewTwo: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            marginVertical:  width * 0.04
        },
        viewTwoText: {
            fontFamily: 'Lato-Bold',
            fontSize: 20
        },
        viewThree: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderWidth: 1,
            borderColor: color.grey,
            padding: width * 0.02,
            borderRadius: 12
        },
        viewThreeText: {
            fontSize: 16,
            color: color.black,
            fontFamily: 'Lato-Bold',
            marginHorizontal: 5
        }

    });
};

export default Style;
