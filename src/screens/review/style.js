import { StyleSheet, Dimensions } from "react-native";

const Style = (width, height, isPortrait) => {

    return StyleSheet.create({
        container:{

        },
        imageOne:{
            width: 50,
            height: 50,
            resizeMode: 'contain',
            borderRadius: 15,
            overflow:'hidden'
        },
        viewOne:{
            padding: width * 0.05,
            marginVertical: 10
        }


    });
};

export default Style;
