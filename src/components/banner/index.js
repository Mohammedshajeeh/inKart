import React, { useState, useEffect } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Style from "./style";
import { useNavigation } from "@react-navigation/native";
import color from "../common/color";
import firestore from '@react-native-firebase/firestore';

const Banner = () => {
    const navigation = useNavigation();
    const [bannerArr, setBannerItems] = useState([]);

    useEffect(() => {
        getBanner();
    }, []);

    const getBanner = async () => {
        try {
            const snapshot = await firestore().collection('Banners').get();
            if (snapshot.empty) {
                console.log('No banners found');
            } else {
                const result = snapshot.docs.map(doc => doc.data()); // Retrieve data from documents
                setBannerItems(result);
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    };

    return (
        <FlatList
            data={bannerArr}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => (
                <ImageBackground source={{ uri: item.image }} style={Style.Banner}>
                    <View style={{ padding: 15 }}>
                        <Text style={Style.textIn}>{item.head}</Text>
                        <Text style={Style.textIn2} >{item.content}</Text>
                        <TouchableOpacity style={Style.touch}>
                            <View>
                                <Text style={Style.innerTouch}>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            )}
        />
    );
};

export default Banner;
