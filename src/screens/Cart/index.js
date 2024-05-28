import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, ScrollView, ImageBackground, FlatList } from "react-native";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import color from "../../components/common/color";
import Total from "./component/totalPrice";
import CommnButton from "../../components/commonButton";
import CommonHederLeft from "../../components/commonHedaerLeft";
import { useDispatch, useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { updatecartCount } from "../../storage/action";
import { useDimensionContext } from "../../context";
import Style from "./style";
import Snackbar from "react-native-snackbar";



const Cart = () => {


    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait,
    );

    const navigation = useNavigation()
    // const { userId, cartCount, email, mobilenumber } = useSelector(state => state)
    const { userId } = useSelector((state) => state.userId)
    const { cartCount } = useSelector((state) => state.cartCount)
    const { email } = useSelector((state) => state.email)
    const { mobilenumber } = useSelector((state) => state.mobilenumber)
    const dispatch = useDispatch()
    const [cartProduct, setCartProduct] = useState([]);
    // const [quan, setQuan] = useState(0)
    const [total, setTotal] = useState(0)
    const [charges, setCharges] = useState(0)
    const isFocused = useIsFocused();


    useEffect(() => {

        navigation.setOptions({
            headerLeft: () => <CommonHederLeft />,
        })

    }, []);

    useEffect(() => {
        if (isFocused) {
            getCartProducts();
        }
    }, [isFocused]);

    useEffect(() => {
        if (cartProduct.length > 0) {
            setCharges(50)
        } else {
            setCharges(0)
        }
    }, [cartProduct])

    const getCartProducts = async () => {
        try {
            const snapshot = await firestore().collection('Cart').where('userId', '==', userId).get();
            if (!snapshot.empty) {
                let totalAmount = 0;
                const result = [];
                snapshot.docs.forEach(doc => {
                    if (doc.exists) {
                        const amount =
                            parseFloat(doc?.data().price) * parseInt(doc?.data().quantity);
                        totalAmount = totalAmount + amount;
                        result.push({ id: doc.id, ...doc.data() }); // Collect data
                    }
                });
                setCartProduct(result); // Set the state after collecting all data
                setTotal(totalAmount); // Set total after calculating totalAmount
            } else {
                setCartProduct([]);
                setTotal(0);
            }
        } catch (err) {
            console.log(err);
        }
    };


    const updatedArray = productInfo => {
        const result = cartProduct.filter(x => {
            return x.id !== productInfo.id
        })
        setTotal(total - parseFloat(productInfo.price))

        setCartProduct(result)
        dispatch(updatecartCount(cartCount - 1));

    }

    const handleTotal = (type, productInfo) => {
        if (type === 'add') {
            setTotal(total + parseFloat(productInfo.price))
        } else {
            setTotal(total - parseFloat(productInfo.price))
        }
    }

    const onButtonPress = () => {
        try {
            if (cartProduct.length > 0) {
                if (email === '' || mobilenumber === '') {
                    Snackbar.show({
                        text: 'You have to complete your profile to continue.',
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: color.red,
                        textColor: color.white,
                    });
                    navigation.navigate('Account');
                } else {
                    navigation.navigate('AddAddress', {
                        cartProducts: cartProduct,
                        total: parseFloat(total + charges).toFixed(2),
                    });
                }
            } else {
                Snackbar.show({
                    text: 'Your cart is empty',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: color.red,
                    textColor: color.white,
                });
            }
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <FlatList
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
            data={cartProduct}
            renderItem={({ item, index }) => {
                return (
                    <RenderItem item={item} index={index} updatedArray={updatedArray} handleTotal={handleTotal} />
                )
            }}
            ListEmptyComponent={() => {
                return (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            padding: 30,
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Lato-Black',
                                color: color.black,
                                fontSize: 25,
                            }}>
                            Cart is empty
                        </Text>
                        <TouchableOpacity>
                            <Text>Go to shop</Text>
                        </TouchableOpacity>
                    </View>
                );
            }}
            ListFooterComponent={() => (
                <>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 10 }}>
                        <ImageBackground style={{ width: 400, height: 130 }} source={require('../../assets/images/offers2.webp')}>
                            <View style={{ padding: 35, justifyContent: 'center', justifyContent: 'space-around', flexDirection: 'row', }}>
                                <View style={{ marginRight: 90 }} >
                                    <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold', fontWeight: 'bold' }}>40%</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold' }}>OFF</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold' }}>Use Code</Text>
                                    <Text style={{ fontSize: 21, fontFamily: 'Lato-Italic', backgroundColor: color.primaryGreen, borderRadius: 15, padding: 1, textAlign: 'center', color: color.white }}>COCO679</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <Total total={total} charges={charges} />
                    <CommnButton buttonText={'Proceed to Checkout'} onButtonPress={onButtonPress} />
                </>
            )}
        />


    )
}

const RenderItem = ({ item, index, updatedArray, handleTotal }) => {

    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait,
    );

    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [quan, setQuan] = useState(item.quantity)

    useEffect(() => {
        setQuan(item.quantity)
    }, [item])

    const addToCart = async () => {
        await firestore()
            .collection('Cart')
            .where('userId', '==', userId)
            .where('prodId', '==', item.prodId)
            .get()
            .then(snapshot => {
                firestore()
                    .collection('Cart')
                    .doc(snapshot?.docs[0].id)
                    .update({
                        quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
                    });
                handleTotal('add', item);
            });
    };



    const removeItem = async () => {
        if (quan <= 1) {
            await firestore().collection('Cart').doc(item.id).delete().then(() => {
                updatedArray(item);
            })
        } else {
            setQuan(quan - 1); // Use function to update state based on previous state
            firestore().collection('Cart').doc(item.id).update({
                quantity: parseInt(item.quantity, 10) - 1
            });
            handleTotal('minus', item);
        }
    }


    const navigateToProductDetails = () => {
        navigation.navigate('ProductDetails', { product: item })
    }

    return (
        <TouchableOpacity
            onPress={navigateToProductDetails}
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
                        <TouchableOpacity onPress={removeItem}>
                            <Text style={{ fontSize: 20, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ fontSize: 16, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>{quan}</Text>
                        <TouchableOpacity onPress={() => { setQuan(quan + 1), addToCart() }}>
                            <Text style={{ fontSize: 20, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Cart







//////////////////////////////////////////////////////////





// / eslint-disable react-native/no-inline-styles /
// / eslint-disable react/no-unstable-nested-components /
// / eslint-disable react/react-in-jsx-scope /
// import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
// import style from './style';
// import {useDimensionContext} from '../../context';
// import colors from '../../components/common/colors';
// import OrderTotal from './components/OrderTotal';
// import CommonButton from '../../components/CommonButton';
// import {
//   useFocusEffect,
//   useIsFocused,
//   useNavigation,
// } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import {useCallback, useEffect, useState} from 'react';
// import CommonHeaderLeft from '../../components/CommonHeaderLeft';
// import {useDispatch, useSelector} from 'react-redux';
// import {updateCartCount} from '../../storage/action';
// import Snackbar from 'react-native-snackbar';

// const Cart = () => {
//   const dimensions = useDimensionContext();
//   const responsiveStyle = style(
//     dimensions.windowWidth,
//     dimensions.windowHeight,
//     dimensions.isPortrait,
//   );
//   const userId = useSelector(state => state.userId);
//   const cartCount = useSelector(state => state.cartCount);
//   const email = useSelector(state => state.email);
//   const mobileNumber = useSelector(state => state.mobileNumber);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [cartProducts, setCartProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [charges, setCharges] = useState(0);
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (isFocused) {
//       getCartProducts();
//     }
//   }, [isFocused]);

//   useEffect(() => {
//     if (cartProducts.length > 0) {
//       setCharges(50);
//     } else {
//       setCharges(0);
//     }
//   }, [cartProducts]);

//   const getCartProducts = async () => {
//     console.warn('hai');
//     await firestore()
//       .collection('Cart')
//       .where('userId', '==', userId)
//       .get()
//       .then(snapshot => {
//         if (!snapshot.empty) {
//           const result = [];
//           let totalAmount = 0;
//           snapshot.docs.forEach(doc => {
//             if (doc.exists) {
//               const amount =
//                 parseFloat(doc?.data().price) * parseInt(doc?.data().quantity);
//               totalAmount = totalAmount + amount;
//               const responseData = {id: doc.id, ...doc?.data()};
//               console.warn(responseData);
//               result.push(responseData);
//             }
//           });
//           setTotal(totalAmount);
//           setCartProducts(result);
//         } else {
//           setCartProducts([]);
//           setTotal(0);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => <CommonHeaderLeft />,
//     });
//   }, []);

//   const updateArray = productInfo => {
//     const result = cartProducts.filter(x => {
//       return x.id !== productInfo.id;
//     });
//     setTotal(total - parseFloat(productInfo.price));

//     setCartProducts(result);
//     dispatch(updateCartCount(cartCount - 1));
//   };

//   const handleTotal = (type, productInfo) => {
//     if (type === 'add') {
//       setTotal(total + parseFloat(productInfo.price));
//     } else {
//       setTotal(total - parseFloat(productInfo.price));
//     }
//   };

//   const onButtonPress = () => {
//     try {
//       if (cartProducts.length > 0) {
//         if (email === '' || mobileNumber === '') {
//           Snackbar.show({
//             text: 'You have to complete your profile to continue.',
//             duration: Snackbar.LENGTH_SHORT,
//             backgroundColor: colors.red,
//             textColor: colors.white,
//           });
//           navigation.navigate('Account');
//         } else {
//           navigation.navigate('AddAddress', {
//             cartProducts: cartProducts,
//             total: parseFloat(total + charges).toFixed(2),
//           });
//         }
//       } else {
//         Snackbar.show({
//           text: 'Your cart is empty',
//           duration: Snackbar.LENGTH_SHORT,
//           backgroundColor: colors.red,
//           textColor: colors.white,
//         });
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   };

//   return (
//     <View style={responsiveStyle.container}>
//       <FlatList
//         data={cartProducts}
//         extraData={cartProducts}
//         renderItem={({item, index}) => (
//           <RenderItem
//             item={item}
//             index={index}
//             updateArray={updateArray}
//             handleTotal={handleTotal}
//           />
//         )}
//         keyExtractor={(item, index) => String(index)}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={() => {
//           return (
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 alignSelf: 'center',
//                 padding: 30,
//               }}>
//               <Text
//                 style={{
//                   fontFamily: 'Lato-Black',
//                   color: colors.black,
//                   fontSize: 25,
//                 }}>
//                 Cart is empty
//               </Text>
//               <TouchableOpacity>
//                 <Text>Go to shop</Text>
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//         ListFooterComponent={() => (
//           <>
//             <View style={responsiveStyle.renderView}>
//               {/ start design /}
//               <View style={responsiveStyle.offCircleView}>
//                 <View style={responsiveStyle.circleRight} />
//                 <View style={responsiveStyle.circleRight} />
//                 <View style={responsiveStyle.circleRight} />
//                 <View style={responsiveStyle.circleRight} />
//               </View>

//               <View
//                 style={{
//                   width: '64%',
//                   height: 100,
//                   backgroundColor: colors.secondaryGreen,
//                   padding: 20,
//                 }}>
//                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                   <Text
//                     style={{
//                       fontFamily: 'Lato-Black',
//                       color: colors.primaryGreen,
//                       fontSize: 50,
//                     }}>
//                     50
//                   </Text>
//                   <View>
//                     <Text
//                       style={{
//                         fontFamily: 'Lato-Regular',
//                         color: colors.primaryGreen,
//                         fontSize: 14,
//                       }}>
//                       %
//                     </Text>
//                     <Text
//                       style={{
//                         fontFamily: 'Lato-Regular',
//                         color: colors.primaryGreen,
//                         fontSize: 14,
//                       }}>
//                       OFF
//                     </Text>
//                   </View>
//                   <View style={{marginLeft: 10}}>
//                     <Text
//                       style={{
//                         fontFamily: 'Lato-Bold',
//                         color: colors.black,
//                         fontSize: 16,
//                       }}>
//                       On your first Order
//                     </Text>
//                     <Text
//                       style={{
//                         fontFamily: 'Lato-Regular',
//                         color: colors.black_level_3,
//                         fontSize: 12,
//                       }}>
//                       Order above 2500 rupees.
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//               <View
//                 style={{
//                   justifyContent: 'space-between',
//                   height: 100,
//                   backgroundColor: colors.secondaryGreen,
//                 }}>
//                 <View style={responsiveStyle.circleCenter} />
//                 <View
//                   style={[
//                     responsiveStyle.circleCenter,
//                     {
//                       marginBottom: -25 / 2,
//                     },
//                   ]}
//                 />
//               </View>
//               <View
//                 style={{
//                   width: '25%',
//                   height: 100,
//                   backgroundColor: colors.secondaryGreen,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   paddingRight: 15,
//                   paddingVertical: 15,
//                 }}>
//                 <Text
//                   style={{
//                     fontFamily: 'Lato-Regular',
//                     color: colors.black_level_3,
//                     fontSize: 14,
//                   }}>
//                   Use Code
//                 </Text>
//                 <View
//                   style={{
//                     marginVertical: 10,
//                     paddingHorizontal: 10,
//                     paddingVertical: 5,
//                     justifyContent: 'center',
//                     borderRadius: 15,
//                     backgroundColor: colors.primaryGreen,
//                     overflow: 'hidden',
//                   }}>
//                   <Text
//                     style={{
//                       fontFamily: 'Lato-Regular',
//                       color: colors.white,
//                       textAlign: 'center',
//                     }}>
//                     SDC43
//                   </Text>
//                 </View>
//               </View>

//               {/ end design /}
//               <View style={{marginLeft: -25 / 2}}>
//                 <View style={responsiveStyle.circleRight} />
//                 <View style={responsiveStyle.circleRight} />
//                 <View style={responsiveStyle.circleRight} />
//                 <View style={responsiveStyle.circleRight} />
//               </View>
//             </View>

//             <OrderTotal total={total} charges={charges} />

//             <CommonButton
//               buttonText={'Proceed to Checkout'}
//               onButtonPress={onButtonPress}
//             />
//           </>
//         )}
//       />
//     </View>
//   );
// };

// const RenderItem = ({item, index, updateArray, handleTotal}) => {
//   console.log(item);
//   const dimensions = useDimensionContext();
//   const responsiveStyle = style(
//     dimensions.windowWidth,
//     dimensions.windowHeight,
//     dimensions.isPortrait,
//   );
//   const userId = useSelector(state => state.userId);
//   const navigation = useNavigation();
//   const [qun, setQun] = useState(item.quantity);

//   useEffect(() => {
//     setQun(item.quantity);
//   }, [item]);

//   const addToCart = async () => {
//     await firestore()
//       .collection('Cart')
//       .where('userId', '==', userId)
//       .where('productId', '==', item.productId)
//       .get()
//       .then(snapshot => {
//         firestore()
//           .collection('Cart')
//           .doc(snapshot?.docs[0].id)
//           .update({
//             quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
//           });
//         handleTotal('add', item);
//       });
//   };

//   const removeItem = async () => {
//     if (qun <= 1) {
//       //remove from cart
//       await firestore()
//         .collection('Cart')
//         .doc(item.id)
//         .delete()
//         .then(() => {
//           updateArray(item);
//         });
//     } else {
//       //update qun
//       setQun(qun - 1);
//       firestore()
//         .collection('Cart')
//         .doc(item.id)
//         .update({
//           quantity: parseInt(item.quantity, 10) - 1,
//         });
//       handleTotal('minus', item);
//     }
//   };

//   const redirectToProductDetails = () => {
//     navigation.navigate('ProductDetails', {product: item});
//   };

//   return (
//     <TouchableOpacity
//       onPress={redirectToProductDetails}
//       style={responsiveStyle.productView}>
//       <Image source={{uri: item.image}} style={responsiveStyle.productImage} />
//       <View style={responsiveStyle.nameView}>
//         <Text style={responsiveStyle.name} numberOfLines={1}>
//           {item.name}
//         </Text>
//         <Text style={responsiveStyle.des} numberOfLines={2}>
//           {item.description}
//         </Text>
//         <View style={responsiveStyle.priceView}>
//           <View style={responsiveStyle.priceView2}>
//             <Text style={responsiveStyle.price}>₹{item.price}</Text>
//             <View style={responsiveStyle.offView}>
//               <Text style={responsiveStyle.offText}>50%</Text>
//             </View>
//           </View>
//           <View style={responsiveStyle.qunView}>
//             <TouchableOpacity onPress={removeItem}>
//               <Text style={responsiveStyle.qunText1}>-</Text>
//             </TouchableOpacity>
//             <Text style={responsiveStyle.qunText2}>{qun}</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setQun(qun + 1);
//                 addToCart();
//               }}>
//               <Text style={responsiveStyle.qunText1}>+</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default Cart;







//////////////////////////////////////////////////////////////




// import React, { useCallback, useEffect, useState } from "react";
// import { TouchableOpacity, View, Text, Image, ScrollView, ImageBackground, FlatList } from "react-native";
// import Style from "./style";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import color from "../../components/common/color";
// import Total from "./component/totalPrice";
// import CommnButton from "../../components/commonButton";
// import CommonHederLeft from "../../components/commonHedaerLeft";
// import { useDispatch, useSelector } from "react-redux";
// import firestore from '@react-native-firebase/firestore';
// import { updatecartCount } from "../../storage/action";


// const Cart = () => {
//     const navigation = useNavigation()

//     // const userId = useSelector((state) => state.userId);
//     const { userId, cartCount } = useSelector(state => state)
//     const dispatch = useDispatch()
//     const [cartProduct, setCartProduct] = useState([]);
//     // const [quan, setQuan] = useState(0)
//     const [total, setTotal] = useState()
//     const [charges, setCharges] = useState()


//     useEffect(() => {

//         navigation.setOptions({
//             headerLeft: () => <CommonHederLeft />,
//         })

//     }, []);

//     // useEffect(() => {
//     //     console.log('////////////////////######',total);
//     //     console.log('////////////////////######',charges);
//     // }, []);

//     useFocusEffect(
//         useCallback(() => {
//             getproductScroll();
//         }, [])
//     )

//     useEffect(() => {
//         if (cartProduct.length > 0) {
//             setCharges(50)
//         } else {
//             setCharges(0)
//         }
//     })

//     // // const getproductScroll = async () => {
//     // //     try {
//     // //         const snapshot = await firestore().collection('Cart').where('userId', '==', userId).get();
//     // //         if (snapshot.empty) {
//     // //             console.log('No banners found');
//     // //             const amount = []
//     // //             let totalAmount = 0
//     // //         } else {
//     // //             const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Retrieve data from documents
//     // //             const
//     // //             setCartProduct(result);
//     // //         }
//     // //     } catch (error) {
//     // //         console.error('Error fetching banners: ', error);
//     // //     }
//     // // };

//     const getproductScroll = async () => {
//         try {
//             const snapshot = await firestore().collection('Cart').where('userId', '==', userId).get();
//             if (!snapshot.empty) {
//                 let totalAmount = 0;
//                 const result = [];
//                 snapshot.docs.forEach(doc => {
//                     if (doc.exists) {
//                         const amount = parseFloat(doc.data().price) * parseInt(doc.data().quantity);
//                         totalAmount += amount; // Accumulate totalAmount
//                         result.push({ id: doc.id, ...doc.data() }); // Collect data
//                     }
//                 });
//                 setCartProduct(result); // Set the state after collecting all data
//                 setTotal(totalAmount); // Set total after calculating totalAmount
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };


//     const updatedArray = item => {
//         const result = cartProduct.filter(x => {
//             return x.id !== item.id
//         })
//         setTotal(total - parseFloat(item.price))

//         setCartProduct(result)
//         dispatch(updatecartCount(cartCount - 1));

//     }

//     const handleTotal = (item, type) => {
//         if (type === 'plus') {
//             setTotal(total + parseFloat(item.price))
//         } else {
//             setTotal(total - parseFloat(item.price))
//         }
//     }

//     return (
//         <FlatList
//             showsVerticalScrollIndicator={false}
//             data={cartProduct}
//             renderItem={({ item, index }) => {
//                 return (
//                     <RenderItem item={item} index={index} updatedArray={updatedArray} handleTotal={handleTotal} />
//                 )
//             }}
//             ListFooterComponent={() => (
//                 <>
//                     <View style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 10 }}>
//                         <ImageBackground style={{ width: 400, height: 130 }} source={require('../../assets/images/offers2.webp')}>
//                             <View style={{ padding: 35, justifyContent: 'center', justifyContent: 'space-around', flexDirection: 'row', }}>
//                                 <View style={{ marginRight: 90 }} >
//                                     <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold', fontWeight: 'bold' }}>40%</Text>
//                                     <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold' }}>OFF</Text>
//                                 </View>
//                                 <View style={{}}>
//                                     <Text style={{ fontSize: 30, fontFamily: 'Lato-Bold' }}>Use Code</Text>
//                                     <Text style={{ fontSize: 21, fontFamily: 'Lato-Italic', backgroundColor: color.primaryGreen, borderRadius: 15, padding: 1, textAlign: 'center', color: color.white }}>COCO679</Text>
//                                 </View>
//                             </View>
//                         </ImageBackground>
//                     </View>
//                     <Total total={total} charges={charges} />
//                     <CommnButton buttonText={'Proceed to Checkout'} />
//                 </>
//             )}
//         />


//     )
// }

// const RenderItem = ({ item, index, updatedArray, handleTotal }) => {

//     const userId = useSelector((state) => state.userId);
//     const { cartCount } = useSelector(state => state)

//     const dispatch = useDispatch()

//     const navigation = useNavigation()

//     const [quan, setQuan] = useState(item.quantity)

//     useEffect(() => {
//         setQuan(item.quantity)
//     }, [item])


//     // const addTocart = async () => {
//     //     await firestore().collection('Cart').
//     //         where('userId', '==', userId).
//     //         where('prodId', '==', item.prodId).
//     //         get().
//     //         then(snapshot => {
//     //             firestore().collection('Cart').doc(snapshot?.docs[0].id).update({
//     //                 quantity: parseInt(snapshot?.docs[0].data().quantity,10) + 1
//     //             })
//     //             handleTotal('plus',item)
//     //         })
//     // }
//     const addTocart = async () => {
//         await firestore().collection('Cart')
//             .where('userId', '==', userId)
//             .where('prodId', '==', item.prodId)
//             .get()
//             .then(snapshot => {
//                 if (!isNaN(item.quantity) && Number.isInteger(parseFloat(item.quantity))) { // Check if item.quantity is a valid number
//                     firestore().collection('Cart').doc(snapshot?.docs[0].id).update({
//                         quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1
//                     })
//                     handleTotal('plus', item)
//                 } else {
//                     console.error('Invalid quantity:', item.quantity);
//                 }
//             })
//     }



//     const removeItem = async () => {
//         if (quan <= 1) {
//             await firestore().collection('Cart').doc(item.id).delete().then(() => {
//                 updatedArray(item); // This function should be called after successful deletion
//             })
//         } else {
//             setQuan(quan - 1); // Use function to update state based on previous state
//             firestore().collection('Cart').doc(item.id).update({
//                 quantity: parseInt(item.quantity, 10) - 1
//             });
//             handleTotal('minus', item);
//         }
//     }


//     const navigateToProductDetails = () => {
//         navigation.navigate('ProductDetails', { product: item })
//     }

//     return (
//         <TouchableOpacity
//             onPress={navigateToProductDetails}
//             style={{
//                 width: '100%',
//                 borderRadius: 15,
//                 padding: 15,
//                 marginVertical: 15,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginRight: 15,
//                 backgroundColor: color.white,
//             }}>
//             <Image source={{ uri: item.image }} style={{ width: 130, height: 100, resizeMode: 'contain' }} />
//             <View style={{ flex: 1, marginLeft: 10, }}>
//                 <Text numberOfLines={1} style={{ fontFamily: 'Lato-Bold', fontSize: 20, marginVertical: 15 }}>{item.head}</Text>
//                 <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
//                     <Text numberOfLines={1} style={{ fontFamily: 'Lato-Bold', fontSize: 20, marginVertical: 10 }}>₹{item.price}</Text>
//                     <View style={{ backgroundColor: color.primaryGreen, borderWidth: 1, padding: 5, borderRadius: 12 }}>
//                         <Text style={{ color: color.white, fontSize: 15 }}>20%</Text>
//                     </View>
//                     <View style={{
//                         flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderWidth: 1,
//                         borderColor: color.grey,
//                         padding: 10,
//                         borderRadius: 12
//                     }}>
//                         <TouchableOpacity onPress={removeItem}>
//                             <Text style={{ fontSize: 20, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>-</Text>
//                         </TouchableOpacity>

//                         <Text style={{ fontSize: 16, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>{quan}</Text>
//                         <TouchableOpacity onPress={() => { setQuan(quan + 1), addTocart() }}>
//                             <Text style={{ fontSize: 20, color: color.black, fontFamily: 'Lato-Bold', marginHorizontal: 5 }}>+</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     )
// }

// export default Cart


