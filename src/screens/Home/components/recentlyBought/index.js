import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Style from "./style";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";


const RecentyBought = () => {

    const navigation = useNavigation()
    const [productScroll, setproductScrolltems] = useState([]);

    useEffect(() => {
        getproductScroll();
    }, []);

    const getproductScroll = async () => {
        try {
            const snapshot = await firestore().collection('Products').get();
            if (snapshot.empty) {
                console.log('No banners found');
            } else {
                const result = snapshot.docs.map(doc => doc.data()); // Retrieve data from documents
                setproductScrolltems(result);
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    };

    const handleProducts = (item) => {
        navigation.navigate('ProductDetails', { product: item })
    }


    return (
        <View style={Style.container}>
            <Text style={Style.viewText}>Buy From Recently Bought</Text>
            <FlatList
                data={productScroll}
                horizontal
                keyExtractor={(item, index) => String(index)}
                showsHorizontalScrollIndicator={false}
                // renderItem={({ item, index }) => {
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => handleProducts(item)}
                            style={Style.imageview}>
                            <Image source={{ uri: item.image }} style={Style.boughtimage} />
                        </TouchableOpacity>
                    )
                }}

            />
        </View>
    );
};


export default RecentyBought