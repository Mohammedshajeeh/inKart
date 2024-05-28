
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import CommonHederLeft from "../../components/commonHedaerLeft";
import Style from "./style";
import color from "../../components/common/color";
import { updatecartCount } from "../../storage/action";
import CommonHederRight from "../../components/commonHeaderRight";

const Wishlist = () => {
    const navigation = useNavigation();
    const [toWishlist, setToWishlist] = useState([]);
    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <CommonHederRight cart={true} />,
            headerLeft: () => <CommonHederLeft />,
        });
    }, [navigation]);

    useEffect(() => {
        getToWishlist();
    }, [isFocused])

    // useEffect(() => {
    //     getToWishlist();
    // }, [userId]);

    const getToWishlist = async () => {
        try {
            const snapshot = await firestore().collection('Wishlist').where('userId', '==', userId).get();
            if (snapshot.empty) {
                setToWishlist([]);
            } else {
                const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setToWishlist(result);
            }
        } catch (error) {
            console.error('Error fetching wishlist: ', error);
        }
    };

    const addToCart = async item => {
        await firestore()
            .collection('Cart')
            .where('userId', '==', userId)
            .where('prodId', '==', item.id)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    firestore().collection('Cart').add({
                        created: '' + Date.now() + '', // <-- Corrected Date.now()
                        head: item.head,
                        price: item.price,
                        prodId: item.id,
                        userId: userId,
                        image: item.image,
                        quantity: 1
                    });
                    dispatch(updatecartCount(cartCount + 1));
                } else {
                    firestore()
                        .collection('Cart')
                        .doc(snapshot?.docs[0].id)
                        .update({
                            quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + quan,
                        });
                }
            });
    };

    const removeItems = async (item) => {
        try {
            await firestore().collection('Wishlist').doc(item.id).delete();
            setToWishlist(toWishlist.filter(elem => elem.id !== item.id));
        } catch (error) {
            console.error('Error removing item from wishlist: ', error);
        }
    };

    return (
        <View style={Style.container}>
            <FlatList
                data={toWishlist}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 30 }}>
                        <Text style={{ fontFamily: 'Lato-Black', color: color.black, fontSize: 25 }}>
                            Wishlist is empty
                        </Text>
                        <TouchableOpacity>
                            <Text>Go to Home</Text>
                        </TouchableOpacity>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={Style.productView}>
                        <Image source={{ uri: item.image }} style={Style.image} />
                        <View>
                            <Text style={Style.Text} numberOfLines={2}>{item.head}</Text>
                            <Text style={Style.Text} numberOfLines={2}>{item.desc}</Text>
                            <View style={Style.SecondView}>
                                <Text style={[Style.Text, { fontWeight: 'bold', color: color.black }]}>{item.price}</Text>
                                <View>
                                    <Text style={[Style.Text, { backgroundColor: color.primaryGreen, borderRadius: 15, padding: 5 }]}>20%</Text>
                                </View>
                                <TouchableOpacity onPress={() => addToCart(item)}>
                                    <Text style={[Style.Text, { borderRadius: 15, padding: 5, borderWidth: 1 }]}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItems(item)} style={Style.iconView}>
                            <Image source={require('../../assets/images/delete.png')} style={Style.icon} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default Wishlist;
