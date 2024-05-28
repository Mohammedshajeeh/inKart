import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Style from "./style";
import CommonHederLeft from "../../components/commonHedaerLeft";
import CustomSearch from "../../components/CustomSearch";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import CommonHederRight from "../../components/commonHeaderRight";
import { useSelector } from "react-redux";
import color from "../../components/common/color";
import { useDimensionContext } from "../../context";

const Products = () => {

    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );


    const navigation = useNavigation()
    // const { catagories } = useSelector(state => state)
    const catagories = useSelector((state) => state.catagories);

    const route = useRoute()
    const { type } = route.params
    const [selectedCatagory, setSelectedCatagory] = useState(type)

    const [productScroll, setproductScrollItems] = useState([]);

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
                setproductScrollItems(result);
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    };

    useEffect(() => {

        navigation.setOptions({
            headerLeft: () => <CommonHederLeft type='back' />,
            headerRight: () => <CommonHederRight cart={true} />,
            title: selectedCatagory === 'all' ? 'Shop' : selectedCatagory
        })

    }, [selectedCatagory]);

    const handleCatogories = async item => {
        setSelectedCatagory(item.head);
        try {
            const snapshot = await firestore().collection('Products').where('catagId', '==', item.id).get();
            if (snapshot.empty) {
                console.log('No banners found');
                setproductScrollItems([]); // Clear the previous data
            } else {
                const result = snapshot.docs.map(doc => doc.data());
                setproductScrollItems(result);
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    };

    const handleProducts = item => {
        navigation.navigate('ProductDetails', { product: item })
    }


    return (
        <View>
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={catagories}
                    contentContainerStyle={responsiveStyle.contentStyle}
                    style={responsiveStyle.container}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={responsiveStyle.catItemView}
                                onPress={() => handleCatogories(item)}
                            >
                                <Text style={responsiveStyle.itemText}>{item.head}</Text>
                            </TouchableOpacity>


                        )
                    }}
                />
            </View>

            <CustomSearch />

            <View style={{ padding: 15 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={productScroll}
                    ListEmptyComponent={() => {
                        return (
                            <View>
                                <Text>Empty</Text>
                            </View>
                        )
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={responsiveStyle.imageView}
                            onPress={() => handleProducts(item)}
                        >
                            <Image source={{ uri: item.image }} style={responsiveStyle.image} />
                            <View style={responsiveStyle.viewOne}>
                                <Text numberOfLines={1} style={responsiveStyle.viewOneText}>{item.head}</Text>
                                <View style={responsiveStyle.viewTwo}>
                                    <Text numberOfLines={1} style={responsiveStyle.viewTwoText}>₹{item.price}</Text>
                                    <View style={{ backgroundColor: color.primaryGreen, borderWidth: 1, padding: 5, borderRadius: 12 }}>
                                        <Text style={{ color: color.white, fontSize: 15 }}>20%</Text>
                                    </View>
                                    <View style={responsiveStyle.viewThree}>
                                        <Text style={responsiveStyle.viewThreeText}>+</Text>
                                        <Text style={responsiveStyle.viewThreeText}>0</Text>
                                        <Text style={responsiveStyle.viewThreeText}>-</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

        </View>
    )
}

export default Products;
