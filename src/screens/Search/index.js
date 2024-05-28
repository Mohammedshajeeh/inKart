import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Style from "./style";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/commenHeader";
import CustomSearch from "../../components/CustomSearch";
import OfferProducts from "../../components/offerProducts";
import Trending from "./components/trending";
import CommonHederLeft from "../../components/commonHedaerLeft";

const Search = () => {
    const navigation = useNavigation()

    useEffect(() => {
        
        navigation.setOptions({
            headerLeft: () => <CommonHederLeft />,
        })

    }, []);


    return (
        <View>
            <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false} >
                <CustomSearch />
                <Trending />
                <OfferProducts />
            </ScrollView>
        </View>
    )
}

export default Search