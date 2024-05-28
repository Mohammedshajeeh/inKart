import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Style from "./style";
import CommonHederLeft from "../../components/commonHedaerLeft";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import CommonHederRight from "../../components/commonHeaderRight";
import { useDimensionContext } from "../../context";
import color from "../../components/common/color";
import MoreInfo from "./components/moreInfo";
import ExtraInfo from "./components/extraInfo";
import ProductReview from "./components/productReview";
import DeliveryInfo from "./components/deliveryInfo";
import ProductScroll from "../../components/productScroll";
import { useDispatch, useSelector } from "react-redux";
import { updateWishId, updatecartCount } from "../../storage/action";
import Snackbar from "react-native-snackbar";



const ProductDetails = () => {

    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );
    const route = useRoute()
    const { product } = route.params
    const [rating, setRating] = useState(0);
    const scrollRef = useRef(null)
    const [productDetailsObj, setProductDetails] = useState({});
    const [quan, setQuan] = useState(1)
    const userId = useSelector((state) => state.cartCount);
    const cartCount = useSelector((state) => state.cartCount);
    const wishId = useSelector((state) => state.wishId);

    const dispatch = useDispatch()
    const navigation = useNavigation()



    useEffect(() => {

        navigation.setOptions({
            headerLeft: () => <CommonHederLeft type='back' />,
            headerRight: () => <CommonHederRight cart={true} share={true} />,
            title: ''
        })

    }, []);

    useEffect(() => {
        setProductDetails(product)
    }, [product])

    const NavigationNeeded = (val, item) => {
        if (val) {
            scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
            setProductDetails(item)
        }
    }


    const handleQuantity = (type) => {
        if (type === 'plus') {
            setQuan(quan + 1)
        } else {
            if (quan === 1) {
                return
            } else {
                setQuan(quan - 1)
            }
        }
    }


    useEffect(() => {
        console.log('///////////////////////////', userId);
        console.log('///////////////////////////', productDetailsObj.id);
        console.log('///////////////////////////', productDetailsObj);
        console.log('///////////////////////////', product.id);
    })

    const handleAddToCart = async () => {
        await firestore()
            .collection('Cart')
            .where('userId', '==', userId)
            .where('prodId', '==', productDetailsObj.id)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    firestore().collection('Cart').add({
                        created: '' + Date.now() + '', // <-- Corrected Date.now()
                        head: productDetailsObj.head,
                        price: productDetailsObj.price,
                        prodId: productDetailsObj.id,
                        userId: userId,
                        image: productDetailsObj.image,
                        quantity: quan
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
        <View style={responsiveStyle.viewOne}>
            <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false} >
                {/* <TouchableOpacity style={responsiveStyle.touchOne}>
                    <Image style={responsiveStyle.touchOneImage} source={require('../../assets/images/heart1.png')} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => addToWishlist(productDetailsObj)}>
                    <Image
                        source={wishId.includes(productDetailsObj.id)
                            ? require('../../assets/images/redHeart.png')
                            : require('../../assets/images/whiteHeart.png')}
                        style={responsiveStyle.touchOneImage}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity style={responsiveStyle.touchTwo}>
                <Image  style={responsiveStyle.touchTwoImage} source={require('../../assets/images/heart2.png')}  />
            </TouchableOpacity> */}
                <View style={responsiveStyle.viewTwo}>
                    <View style={responsiveStyle.viewFour} >
                        <Image style={responsiveStyle.viewTwoImage} source={{ uri: productDetailsObj?.image }} />
                    </View>
                    <View style={responsiveStyle.viewThree}>
                        <View style={responsiveStyle.viewThreeon}>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={responsiveStyle.viewThreeTextOne}>{productDetailsObj?.head}</Text>
                            </View>
                            {/* <StarRating rating={rating} onChange={setRating}/> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                                <Text style={responsiveStyle.viewThreeTextTwo}>   ₹{parseFloat(productDetailsObj?.price).toFixed(2)}</Text>
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontFamily: 'Lato-Regular',
                                        fontSize: 18,
                                        color: color.primaryGreen
                                    }}
                                >
                                    25& OFF
                                </Text>
                            </View>
                            <MoreInfo />
                            <ExtraInfo />
                            <ProductReview />
                            <DeliveryInfo />
                        </View>
                        <ProductScroll isNavigationNeeded={NavigationNeeded} />
                    </View>

                </View>
            </ScrollView>
            <View style={{
                position: 'absolute',
                bottom: 25,
                alignSelf: 'center',
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 8,
                backgroundColor: color.primaryGreen,
                width: '95%'
            }}>
                <View style={{
                    padding: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 8,
                    backgroundColor: color.white
                }}>
                    <TouchableOpacity onPress={() => handleQuantity('minus')}>
                        <Text style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 22,
                            color: color.primaryGreen,
                            marginHorizontal: 10
                        }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 18,
                        color: color.primaryGreen,
                        marginHorizontal: 10
                    }}>{quan}</Text>
                    <TouchableOpacity onPress={() => handleQuantity('plus')}>
                        <Text style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 22,
                            color: color.primaryGreen,
                            marginHorizontal: 10
                        }}>+</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={handleAddToCart}>
                    <Text style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 18,
                        color: color.white
                    }}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductDetails;
