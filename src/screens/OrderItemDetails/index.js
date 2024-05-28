// import React, { useEffect, useId, useState } from "react";
// import { TouchableOpacity, View, Text, Image, FlatList, ScrollView, ActivityIndicator, Modal } from "react-native";
// import Style from "./style";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import CustomSearch from "../../components/CustomSearch";
// import color from "../../components/common/color";
// import firestore from '@react-native-firebase/firestore';
// import CommonHederLeft from "../../components/commonHedaerLeft";
// import { useSelector } from "react-redux";
// import CommonHederRight from "../../components/commonHeaderRight";
// import CustomButton from "../../components/customButton";
// import Snackbar from "react-native-snackbar";

// const OrderItemDetails = () => {
//     const navigation = useNavigation()
//     const route = useRoute()
//     const { item } = route.params
//     const [ordersItem, setOrdersitem] = useState([])
//     const { userId, cartCount } = useSelector(state => state)
//     const [loading, setLoading] = useState(false)


//     useEffect(() => {
//         navigation.setOptions({
//             headerLeft: () => <CommonHederLeft />,
//             headerRight: () => <CommonHederRight cart={true} />,
//         })
//     }, []);

//     const reOrder = async () => {
//         try {
//             setLoading(true)
//             const smallId = Math.random()
//             await firestore()
//                 .collection('Orders')
//                 .add({
//                     orderId: String(smallId).toUpperCase(),
//                     created: Date.now(),
//                     updated: Date.now(),
//                     orderStatus: 'Ordered',
//                     totalAmount: item.totalAmount,
//                     address: item.address,
//                     userId: userId,
//                     paymentMethod: item.paymentMethod,
//                     cartItems: item.cartItems,
//                     userName: item.userName,
//                     userEmail: item.userEmail,
//                     userPhone: item.userPhone,
//                     expDelDate: '',
//                 })
//                 .then(async resp => {
//                     Snackbar.show({
//                         text: 'Your Order is successfully Placed.',
//                         duration: Snackbar.LENGTH_SHORT,
//                         backgroundColor: color.primaryGreen,
//                         textColor: color.white,
//                     });
//                     setLoading(false)

//                 });
//         } catch (error) {
//             console.log('///////////////////////////////////');
//             console.log(error);
//             console.log('///////////////////////////////////');
//         }

//     };





//     return (
//         <View>
//             <Modal animationType="fade" transparent={true} visible={loading}>
//                 <View
//                     style={{
//                         height: '100%',
//                         width: '100%',
//                         backgroundColor: 'rgba(0,0,0,0.7)',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}>
//                     <ActivityIndicator size={'large'} color={color.white} />
//                 </View>
//             </Modal>
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 style={{ padding: 15 }}
//                 contentContainerStyle={{ paddingBottom: 150 }}
//             >
//                 <View
//                     style={{
//                         backgroundColor: color.primaryGreen,
//                         borderRadius: 15,
//                         padding: 15,
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'flex-start'
//                     }}
//                 >
//                     {/* image */}
//                     <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/box.png')} />
//                     <View style={{ marginLeft: 15 }}>
//                         <Text
//                             style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 18,
//                                 color: color.white
//                             }}>orderId : #{item.orderId ?? '7473878'}</Text>
//                         <Text
//                             style={{
//                                 fontFamily: 'Lato-Bold',
//                                 fontSize: 22,
//                                 color: color.white
//                             }}>
//                             {item.orderStatus ?? 'nothing'}
//                         </Text>
//                     </View>
//                 </View>

//                 <View style={{ marginVertical: 15 }}>
//                     <Text style={{
//                         fontFamily: 'Lato-Bold',
//                         fontSize: 22,
//                         color: color.primaryGreen
//                     }}>items</Text>
//                     {item.cartItems && item.cartItems.map((ele, index) => {
//                         return (
//                             <View key={index} style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 marginVertical: 5,
//                                 justifyContent: 'space-between'
//                             }}>
//                                 <View style={{
//                                     backgroundColor: color.primaryGreen,
//                                     padding: 15,
//                                     borderRadius: 15,
//                                 }}>
//                                     <Text style={{
//                                         fontFamily: 'Lato-Bold',
//                                         fontSize: 20,
//                                         color: color.white
//                                     }}>{ele.quantity}</Text>
//                                 </View>
//                                 <View></View>
//                                 <View style={{ width: '50%', overflow: 'hidden' }}>
//                                     <Text style={{
//                                         fontFamily: 'Lato-Bold',
//                                         fontSize: 20,
//                                         color: color.primaryGreen
//                                     }}>{ele.head}</Text>
//                                 </View>
//                                 <Text style={{
//                                     fontFamily: 'Lato-Bold',
//                                     fontSize: 20,
//                                     color: color.primaryGreen
//                                 }}>₹{ele.price}</Text>

//                             </View>
//                         )
//                     })}
//                 </View>

//                 <View style={{ marginVertical: 15 }}>
//                     <Text style={{
//                         fontFamily: 'Lato-Bold',
//                         fontSize: 22,
//                         color: color.primaryGreen
//                     }}>Payment Details</Text>
//                     <View style={{
//                         borderRadius: 15,
//                         padding: 15,
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         borderBottomWidth: 1
//                     }}>
//                         <View>
//                             <Text style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 20,
//                                 color: color.black,
//                                 lineHeight: 35
//                             }}>Bag Total</Text>
//                             <Text style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 20,
//                                 color: color.black,
//                                 lineHeight: 35
//                             }}>Discound Coupon</Text>
//                             <Text style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 20,
//                                 color: color.black,
//                                 lineHeight: 35
//                             }}>Delivery</Text>
//                         </View>
//                         <View style={{ alignItems: 'flex-end' }}>
//                             <Text style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 20,
//                                 color: color.black,
//                                 lineHeight: 35
//                             }}>₹134</Text>
//                             <Text style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 20,
//                                 color: color.red,
//                                 lineHeight: 35
//                             }}>Apply Coupon</Text>
//                             <Text style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 20,
//                                 color: color.black,
//                                 lineHeight: 35
//                             }}>₹50.00</Text>
//                         </View>
//                     </View>
//                     <View style={{
//                         justifyContent: 'space-between',
//                         flexDirection: 'row',
//                         alignItems: 'center'
//                     }}>
//                         <Text style={{
//                             fontFamily: 'Lato-Bold',
//                             fontSize: 22,
//                             color: color.black,
//                             lineHeight: 25
//                         }}>Total Amount</Text>
//                         <Text style={{
//                             fontFamily: 'Lato-Bold',
//                             fontSize: 22,
//                             color: color.black,
//                             lineHeight: 25
//                         }}>{item.totalAmount}</Text>
//                     </View>
//                 </View>

//                 <View style={{ marginVertical: 15 }}>
//                     <Text style={{
//                         fontFamily: 'Lato-Bold',
//                         fontSize: 22,
//                         color: color.primaryGreen,
//                         lineHeight: 45
//                     }}>Address</Text>
//                     <Text style={{
//                         fontFamily: 'Lato-Regular',
//                         fontSize: 20,
//                         color: color.black,
//                         lineHeight: 35
//                     }}>sdhghshshjsjsjk</Text>
//                     <Text style={{
//                         fontFamily: 'Lato-Regular',
//                         fontSize: 20,
//                         color: color.black,
//                         lineHeight: 35
//                     }}>sjandjsnjdsdjkdsnkjs</Text>
//                     <Text style={{
//                         fontFamily: 'Lato-Regular',
//                         fontSize: 20,
//                         color: color.black,
//                         lineHeight: 35
//                     }}>jdjksjdkjskkdslkdsklk</Text>
//                 </View>
//                 <View style={{ marginVertical: 15 }}>
//                     <Text style={{
//                         fontFamily: 'Lato-Bold',
//                         fontSize: 22,
//                         color: color.primaryGreen
//                     }}>Payment Method</Text>
//                     <View style={{
//                         justifyContent: 'flex-start',
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         marginVertical: 15
//                     }}>
//                         {/* image */}
//                         <Image style={{ width: 45, height: 55, resizeMode: 'contain' }} source={require('../../assets/images/visa.png')} />

//                         <View style={{ marginLeft: 15 }}>
//                             <Text style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 18,
//                                 color: color.black,
//                                 lineHeight: 25
//                             }}>**** **** **** 7040</Text>
//                             <Text style={{
//                                 fontFamily: 'Lato-Regular',
//                                 fontSize: 18,
//                                 color: color.black,
//                                 lineHeight: 25
//                             }}>{item.paymentMethod}</Text>
//                         </View>
//                     </View>

//                 </View>

//             </ScrollView>
//             <View style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 width: '100%',
//                 padding: 15,
//                 backgroundColor: color.white
//             }}>
//                 <CustomButton
//                     type='primary'
//                     handleButton={reOrder}
//                     ButtonText={'ReOrder'}
//                 />
//             </View>
//         </View>
//     )
// }

// export default OrderItemDetails

import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, FlatList, ScrollView, ActivityIndicator, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import Snackbar from "react-native-snackbar";
import Style from "./style";
import CustomSearch from "../../components/CustomSearch";
import color from "../../components/common/color";
import CommonHederLeft from "../../components/commonHedaerLeft";
import CommonHederRight from "../../components/commonHeaderRight";
import CustomButton from "../../components/customButton";

const OrderItemDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    const [ordersItem, setOrdersitem] = useState([]);
    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CommonHederLeft type='back' action={() => navigation.navigate('Orders')} />,
            headerRight: () => <CommonHederRight cart={true} />,
        });
    }, []);

    const reOrder = async () => {
        try {
            setLoading(true);
            const smallId = Math.random().toString().toUpperCase();
            await firestore().collection('Orders').add({
                orderId: smallId,
                created: Date.now(),
                updated: Date.now(),
                orderStatus: 'Ordered',
                totalAmount: item.totalAmount,
                address: item.address,
                userId: userId,
                paymentMethod: item.paymentMethod,
                cartItems: item.cartItems,
                userName: item.userName,
                userEmail: item.userEmail,
                userPhone: item.userPhone,
                expDelDate: '',
            });
            Snackbar.show({
                text: 'Your Order is successfully Placed.',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: color.primaryGreen,
                textColor: color.white,
            });
        } catch (error) {
            console.error('Error placing order:', error);
            Snackbar.show({
                text: 'Failed to place order. Please try again.',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: color.red,
                textColor: color.white,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Modal animationType="fade" transparent={true} visible={loading}>
                <View style={Style.modalContainer}>
                    <ActivityIndicator size="large" color={color.white} />
                </View>
            </Modal>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 15 }}
                contentContainerStyle={{ paddingBottom: 150 }}
            >
                <View style={Style.orderHeader}>
                    <Image style={Style.orderImage} source={require('../../assets/images/box.png')} />
                    <View style={Style.orderDetails}>
                        <Text style={Style.orderIdText}>orderId: #{item.orderId ?? '7473878'}</Text>
                        <Text style={Style.orderStatusText}>{item.orderStatus ?? 'nothing'}</Text>
                    </View>
                </View>
                <View style={Style.itemsSection}>
                    <Text style={Style.sectionTitle}>items</Text>
                    {item.cartItems && item.cartItems.map((ele, index) => (
                        <View key={index} style={Style.itemRow}>
                            <View style={Style.quantityBox}>
                                <Text style={Style.quantityText}>{ele.quantity}</Text>
                            </View>
                            <View style={Style.itemDetails}>
                                <Text style={Style.itemName}>{ele.head}</Text>
                            </View>
                            <Text style={Style.itemPrice}>₹{ele.price}</Text>
                        </View>
                    ))}
                </View>
                <View style={Style.paymentDetailsSection}>
                    <Text style={Style.sectionTitle}>Payment Details</Text>
                    <View style={Style.paymentDetailsRow}>
                        <View>
                            <Text style={Style.paymentDetailText}>Bag Total</Text>
                            <Text style={Style.paymentDetailText}>Discount Coupon</Text>
                            <Text style={Style.paymentDetailText}>Delivery</Text>
                        </View>
                        <View style={Style.paymentDetailAmounts}>
                            <Text style={Style.paymentDetailText}>₹134</Text>
                            <Text style={Style.discountText}>Apply Coupon</Text>
                            <Text style={Style.paymentDetailText}>₹50.00</Text>
                        </View>
                    </View>
                    <View style={Style.totalAmountRow}>
                        <Text style={Style.totalAmountText}>Total Amount</Text>
                        <Text style={Style.totalAmountText}>₹{item.totalAmount}</Text>
                    </View>
                </View>
                <View style={Style.addressSection}>
                    <Text style={Style.sectionTitle}>Address</Text>
                    <Text style={Style.addressText}>{item.address}</Text>
                </View>
                <View style={Style.paymentMethodSection}>
                    <Text style={Style.sectionTitle}>Payment Method</Text>
                    <View style={Style.paymentMethodRow}>
                        <Image style={Style.paymentMethodImage} source={require('../../assets/images/visa.png')} />
                        <View style={Style.paymentMethodDetails}>
                            <Text style={Style.paymentMethodText}>**** **** **** 7040</Text>
                            <Text style={Style.paymentMethodText}>{item.paymentMethod}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={Style.footer}>
                <CustomButton
                    type='primary'
                    handleButton={reOrder}
                    ButtonText={'ReOrder'}
                />
            </View>
        </View>
    );
};

export default OrderItemDetails;
