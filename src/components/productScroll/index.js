import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "react-native-snackbar";
import { updateWishId, updatecartCount } from "../../storage/action";
import color from "../common/color";

const ProductScroll = (props) => {
    const { isNavigationNeeded } = props;
    const navigation = useNavigation();
    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);
    const wishId = useSelector((state) => state.wishId);
    const dispatch = useDispatch();
    const [productScroll, setproductScrolltems] = useState([]);
    const route = useRoute();

    useEffect(() => {
        getproductScroll();
    }, []);

    const handleNavigate = () => {
        navigation.navigate('Products', { type: 'all' });
    };

    const handleProducts = (item) => {
        if (route.name === 'ProductDetails') {
            isNavigationNeeded(true, item);
        } else {
            navigation.navigate('ProductDetails', { product: item });
        }
    };

    const getproductScroll = async () => {
        try {
            const snapshot = await firestore().collection('Products').get();
            if (snapshot.empty) {
                console.log('No banners found');
            } else {
                const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setproductScrolltems(result);
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    };

    const addTocart = async (item) => {
        await firestore().collection('Cart')
            .where('userId', '==', userId)
            .where('prodId', '==', item.id)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    firestore().collection('Cart').add({
                        created: '' + Date.now() + '',
                        head: item.head,
                        price: item.price,
                        prodId: item.id,
                        userId: userId,
                        image: item.image,
                        quantity: 1
                    });
                    dispatch(updatecartCount(cartCount + 1));
                } else {
                    firestore().collection('Cart').doc(snapshot.docs[0].id).update({
                        quantity: parseInt(snapshot.docs[0].data().quantity) + 1
                    });
                }
            });
    };

    const addToWishlist = async (productitems) => {
        firestore()
            .collection('Wishlist')
            .where('userId', '==', userId)
            .where('prodId', '==', productitems.id)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    firestore().collection('Wishlist').add({
                        created: '' + Date.now() + '',
                        head: productitems.head,
                        price: productitems.price,
                        prodId: productitems.id,
                        userId: userId,
                        image: productitems.image,
                        catagId: productitems.catagId,
                        updated: '' + Date.now() + ''
                    }).then(() => {
                        dispatch(updateWishId([...wishId,productitems.id]));
                        Snackbar.show({
                            text: 'Item added to wishlist',
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: color.primaryGreen,
                            textColor: color.white,
                        });
                    });
                } else {
                    Snackbar.show({
                        text: 'Item already in wishlist',
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: color.red,
                        textColor: color.white,
                    });
                }
            });
    };

    return (
        <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontFamily: 'Lato-Bold', color: color.black, fontSize: 25 }}>Newly Added</Text>
                    <Text style={{ fontFamily: 'Lato-Bold', color: color.black, fontSize: 15 }}>Pay less, Get more</Text>
                </View>
                <Text onPress={handleNavigate} style={{ fontFamily: 'Lato-Bold', color: color.black, fontSize: 20 }}>See All</Text>
            </View>
            <View>
                <FlatList
                    horizontal
                    keyExtractor={(item, index) => String(index)}
                    showsVerticalScrollIndicator={false}
                    data={productScroll}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{
                                width: 150,
                                height: 220,
                                borderWidth: 1,
                                borderColor: color.grey,
                                borderRadius: 15,
                                padding: 15,
                                marginVertical: 10
                            }} onPress={() => handleProducts(item)} >
                                <TouchableOpacity onPress={() => addToWishlist(item)}>
                                    <Image
                                        source={wishId.includes(item.id) 
                                            ? require('../../assets/images/redHeart.png')
                                            : require('../../assets/images/whiteHeart.png')}
                                        style={{ width: 25, height: 25, resizeMode: 'contain', alignSelf: 'flex-end' }}
                                    />
                                </TouchableOpacity>
                                <Image source={{ uri: item.image }} style={{ width: 130, height: 100, resizeMode: 'contain' }} />
                                <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20 }}>{item.head}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20 }}>{item.price}</Text>
                                    <TouchableOpacity
                                        onPress={() => addTocart(item)}
                                        style={{ borderWidth: 1, borderRadius: 8, backgroundColor: color.primaryGreen, padding: 10 }}>
                                        <Text style={{ fontSize: 20, color: color.white, fontWeight: 'bold' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default ProductScroll;
