import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';

import { useDimensionContext } from "../../../context";
import Style from "./style";
import color from "../../../components/common/color";



const MoreInfo = () => {

    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );
    const route = useRoute()
    const { product } = route.params
    const [rating, setRating] = useState(0);

    const navigation = useNavigation()

    return (

        <View style={responsiveStyle.viewOne}>
            <View style={responsiveStyle.viewTwo}  >
                <Text style={responsiveStyle.viewTwoText}>One B Get O</Text>
                <Image style={responsiveStyle.viewTwoImage} source={require('../../../assets/images/arrowDown.png')} />

            </View>
            <View style={responsiveStyle.viewThree} >
                <Text  style={responsiveStyle.viewThreeText}>Delivery Time</Text>
                <Image style={responsiveStyle.viewThreeImage} source={require('../../../assets/images/arrowDown.png')} />
            </View>
        </View>

    )
}

export default MoreInfo;
