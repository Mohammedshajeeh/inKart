

import { StyleSheet, Dimensions } from "react-native";
import color from "../../components/common/color";

const Style = (width, height, isPortrait) => {

    return StyleSheet.create({
        container: {
            height: height,
            backgroundColor: color.white_level3
        },

    });
};

export default Style;
