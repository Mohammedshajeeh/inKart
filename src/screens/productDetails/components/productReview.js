import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDimensionContext } from "../../../context";
import Style from "./style";
import color from "../../../components/common/color";



const ProductReview = () => {

    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );
    const navigation = useNavigation()

   

    const handleSeeAll = () => {
        navigation.navigate('Review',)
    }

    return (

        <View>
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical:10
            }}>
                <Text style={{ color: color.black, fontFamily: 'Lato-Bold', fontSize: 18 }}>Product Review(1)</Text>
                <TouchableOpacity onPress={handleSeeAll}>
                    <Text style={{ color: color.primaryGreen, fontFamily: 'Lato-Bold', fontSize: 18 }}>See All</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 15, backgroundColor: color.fossil, borderRadius: 15, marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={responsiveStyle.imageOne} source={require('../../../assets/images/rooney.jpg')} />
                    <Text style={{ color: color.black, fontFamily: 'Lato-Bold', fontSize: 18, marginLeft: 10, color: color.white }} >lional Rono</Text>
                    <AirbnbRating
                        count={5}
                        defaultRating={3}
                        size={15}
                        showRating={false}
                    />
                </View>
                <Text style={{ color: color.black, fontFamily: 'Lato-Regular', fontSize: 15, color: color.white }} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</Text>
            </View>
        </View>

    )
}

export default ProductReview;
