import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import color from "../common/color";
import Style from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updatecartCount } from "../../storage/action";
import firestore from '@react-native-firebase/firestore';


const CustomFooter = ({ state, navigation }) => {
    // const navigation = useNavigation();

    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);
    const dispatch = useDispatch() 


    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const snapshot = await firestore().collection('Cart').where('userId', '==', userId).get();
            dispatch(updatecartCount(snapshot.size));
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };


    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: 80,
            backgroundColor: color.white,
        }}>
            {state.routes.map((route, index) => {
                const isFocused = state.index == index
                const icon = route.name === 'Home' ? require('../../assets/images/home4.png') :
                    route.name === 'Catagories' ? require('../../assets/images/category.png') :
                        route.name === 'Search' ? require('../../assets/images/search1.png') :
                            route.name === 'Offers' ? require('../../assets/images/offer.png') :
                                route.name === 'Cart' ? require('../../assets/images/cart1.png') :
                                    require('../../assets/images/cart1.png');

                return (
                    <TouchableOpacity
                        key={index} // Add unique key prop
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => navigation.navigate(route.name)}>
                        {isFocused ? <Text style={Style.dot}>.</Text> : null}
                        {route.name === 'Cart' ? <View style={{ position: 'relative', right: 20 }}>
                            <Text style={[Style.Text, {
                                backgroundColor: color.secondryGreen,
                                padding: 5,
                                borderRadius: 45,
                                color: color.black,
                                textAlign: 'center',
                            }]}>{cartCount}</Text>
                        </View> : null}
                        <Image source={icon} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        <Text style={{ fontSize: 15, fontFamily: 'Lato-Bold' }}>{route.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default CustomFooter;

// import React, { useEffect } from "react";
// import { Image, Text, TouchableOpacity, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import color from "../common/color";
// import Style from "./style";
// import { useDispatch, useSelector } from "react-redux";
// import { updatecartCount } from "../../storage/action";
// import firestore from '@react-native-firebase/firestore';


// const CustomFooter = ({ state }) => {
//     const navigation = useNavigation(); // Moved useNavigation hook inside the component

//     const { cartCount, userId } = useSelector(state => state)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         getCart();
//     }, []);

//     const getCart = async () => {
//         try {
//             const snapshot = await firestore().collection('Cart').where('userId', '==', userId).get();
//             dispatch(updatecartCount(snapshot.size));
//         } catch (error) {
//             console.error('Error fetching cart:', error);
//         }
//     };


//     return (
//         <View style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-around',
//             height: 80,
//             backgroundColor: color.white,
//         }}>
//             {state.routes.map((route, index) => {
//                 const isFocused = state.index === index; // Corrected comparison operator
//                 const icon = route.name === 'Home' ? require('../../assets/images/home4.png') :
//                     route.name === 'Catagories' ? require('../../assets/images/category.png') :
//                         route.name === 'Search' ? require('../../assets/images/search1.png') :
//                             route.name === 'Offers' ? require('../../assets/images/offer.png') :
//                                 require('../../assets/images/cart1.png');

//                 return (
//                     <TouchableOpacity
//                         key={route.name} // Changed key to use route name
//                         style={{ justifyContent: 'center', alignItems: 'center' }}
//                         onPress={() => navigation.navigate(route.name)}>
//                         {isFocused ? <Text style={Style.dot}>.</Text> : null}
//                         {route.name === 'Cart' ? <View style={{ position: 'relative', right: 20 }}>
//                             <Text style={[Style.Text, {
//                                 backgroundColor: color.secondryGreen,
//                                 padding: 5,
//                                 borderRadius: 45,
//                                 color: color.black,
//                                 textAlign: 'center',
//                             }]}>{cartCount}</Text>
//                         </View> : null}
//                         <Image source={icon} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
//                         <Text style={{ fontSize: 15, fontFamily: 'Lato-Bold' }}>{route.name}</Text>
//                     </TouchableOpacity>
//                 )
//             })}
//         </View>
//     )
// }

// export default CustomFooter;
