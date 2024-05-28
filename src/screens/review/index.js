import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Style from "./style";
import CommonHederLeft from "../../components/commonHedaerLeft";
import CommonHederRight from "../../components/commonHeaderRight";
import { useDimensionContext } from "../../context";
import color from "../../components/common/color";
import ActionSheet from "react-native-actions-sheet";
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";



const Review = () => {

    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );

    const navigation = useNavigation()
    const actionSheetRef = useRef(null);


    useEffect(() => {

        navigation.setOptions({
            headerLeft: () => <CommonHederLeft type='back' />,
            headerRight: () => <CommonHederRight plus={true} handlePlusIcon={openActionSheet} />,
            title: 'Review'
        })

    }, []);

    const openActionSheet = () => {
        actionSheetRef.current.show()
    }



    return (

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={responsiveStyle.viewOne}>
                <View style={{ padding: 20, backgroundColor: color.fossil, borderRadius: 15, marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={responsiveStyle.imageOne} source={require('../../assets/images/rooney.jpg')} />
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
                <ActionSheet ref={actionSheetRef}>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 22, color: color.black, fontFamily: 'Lato-Bold', textAlign: 'center' }}>Write a review</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={3}
                            size={25}
                            showRating={false}
                        />
                        <CustomTextInput multiline= {true} placeholder={'Write here'}  />
                        <CustomButton ButtonText={'Submit review'} />
                    </View>
                </ActionSheet>
            </View>
        </ScrollView>



    )
}

export default Review;
