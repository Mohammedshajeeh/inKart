import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import color from "../common/color";
import firestore from '@react-native-firebase/firestore';
import { useDimensionContext } from "../../context";
import Style from "./style";
import { useDispatch, useSelector } from "react-redux";


const OfferProducts = () => {
    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );

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
                const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Retrieve data from documents

                setproductScrolltems(result);
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    };






    return (
        <View style={{ padding: 15, backgroundColor: color.primaryBlue }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontFamily: 'Lato-Bold', color: color.black, fontSize: 25 }}>Hello to Offer</Text>
                    <Text style={{ fontFamily: 'Lato-Bold', color: color.black, fontSize: 15 }}>Best Price Ever All Of Time</Text>
                </View>
                <Text style={{ fontFamily: 'Lato-Bold', color: color.black, fontSize: 20 }}>See All</Text>
            </View>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={productScroll}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                        return (
                            <RenderItem item={item} index={index} />
                        )
                    }}
                />
            </View>
        </View>


    )
}

const RenderItem = ({ item, index }) => {

    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );

    const navigation = useNavigation()

    const [quan, setQuan] = useState(0)

    const dispatch = useDispatch()

    const handleProducts = () => {
        navigation.navigate('ProductDetails', { product: item })
    }

    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);

    const addTocart = async () => {
        await firestore().collection('Cart').
            where('userId', '==', userId).
            where('prodId', '==', item.id).
            get().
            then(snapshot => {
                if (snapshot.empty) {
                    firestore().
                        collection('Cart').
                        add({
                            created: '' + Date.now() + '', // <-- Corrected Date.now()
                            head: item.head,
                            price: item.price,
                            prodId: item.id,
                            userId: userId,
                            image: item.image,
                            quantity: 1
                        })
                        dispatch(updatecartCount(cartCount.size + 1))

                } else {
                    firestore().collection('Cart').doc(snapshot?.docs[0].id).update({
                        quantity: parseInt(snapshot?.docs[0].data().quantity) + 1
                    })
                }
            })
    }


    return (
        <TouchableOpacity
            onPress={handleProducts}
            style={{
                width: '100%',
                borderRadius: 15,
                padding: 15,
                marginVertical: 15,
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 15,
                backgroundColor: color.white,
            }}>
            <Image source={{ uri: item.image }} style={{ width: 130, height: 100, resizeMode: 'contain' }} />
            <View style={{ flex: 1, marginLeft: 10, }}>
                <Text numberOfLines={1} style={{ fontFamily: 'Lato-Bold', fontSize: 20, marginVertical: 15 }}>{item.head}</Text>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <Text numberOfLines={1} style={{ fontFamily: 'Lato-Bold', fontSize: 20, marginVertical: 10 }}>₹{item.price}</Text>
                    <View style={{ backgroundColor: color.primaryGreen, borderWidth: 1, padding: 5, borderRadius: 12 }}>
                        <Text style={{ color: color.white, fontSize: 15 }}>20%</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderWidth: 1,
                        borderColor: color.grey,
                        padding: 10,
                        borderRadius: 12
                    }}>
                        <TouchableOpacity onPress={() => { setQuan(quan <= 0 ? quan : quan - 1) }}>
                            <Text style={{ fontSize: 20, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>{quan}</Text>
                        <TouchableOpacity onPress={() => { setQuan(quan + 1), addTocart() }}>
                            <Text style={{ fontSize: 20, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </TouchableOpacity>
    )
}

export default OfferProducts