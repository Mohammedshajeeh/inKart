import React, { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Style from "./style";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/commenHeader";
import CustomSearch from "../../components/CustomSearch";
import color from "../../components/common/color";
import CommonHederLeft from "../../components/commonHedaerLeft";

const Offers = () => {
    const navigation = useNavigation()

    useEffect(() => {

        navigation.setOptions({
            headerLeft: () => <CommonHederLeft />,
        })

    }, []);

    const offer = [
        {
            off: '40%',
            name: 'OFF',
            codeNO: 'COCO630'

        },
        {
            off: '49%',
            name: 'OFF',
            codeNO: 'COCO990'

        },
        {
            off: '60%',
            name: 'OFF',
            codeNO: 'COCO120'

        },
        {
            off: '50%',
            name: 'OFF',
            codeNO: 'COCO6320'

        },
        {
            off: '10%',
            name: 'OFF',
            codeNO: 'COCO444'

        },
        {
            off: '90%',
            name: 'OFF',
            codeNO: 'COCO667'

        },
    ]

    return (
        <View>
            <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false} >
                <CustomSearch />
                <FlatList
                    data={offer}
                    keyExtractor={(item, index) => String.index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 10 }}>
                                <ImageBackground style={{ width: 400, height: 130 }} source={require('../../assets/images/offers2.webp')}>
                                    <View style={{ padding: 35, justifyContent: 'center', justifyContent: 'space-around', flexDirection: 'row', }}>
                                        <View style={{ marginRight: 90 }} >
                                            <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold', fontWeight: 'bold' }}>{item.off}</Text>
                                            <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold' }}>{item.name}</Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold' }}>Use Code</Text>
                                            <Text style={{ fontSize: 21, fontFamily: 'Lato-Italic', backgroundColor: color.primaryGreen, borderRadius: 15, padding: 1, textAlign: 'center', color: color.white }}>{item.codeNO}</Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    }}
                />

            </ScrollView>
        </View>
    )
}

export default Offers