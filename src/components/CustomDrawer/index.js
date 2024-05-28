import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Style from "./style";
import { useNavigation } from "@react-navigation/native";
import color from "../common/color";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../storage/action";

const CustomDrawer = () => {

    const navigation = useNavigation()

    const FirstName = useSelector((state) => state.FirstName);
    const LastName = useSelector((state) => state.LastName);
    const email = useSelector((state) => state.email);


    const dispatch = useDispatch()

    const content = [
        {
            itemId: 0,
            itemName: 'Home',
            icon: require('../../assets/images/home4.png'),
            navogateTo: 'Home'
        },
        {
            itemId: 1,
            itemName: 'Catagories',
            icon: require('../../assets/images/category.png'),
            navogateTo: 'Catagories'
        },
        {
            itemId: 2,
            itemName: 'Wishlist',
            icon: require('../../assets/images/wishlist.png'),
            navogateTo: 'Wishlist'
        },
        {
            itemId: 3,
            itemName: 'Cart',
            icon: require('../../assets/images/cart1.png'),
            navogateTo: 'Cart'
        },
        {
            itemId: 4,
            itemName: 'Orders',
            icon: require('../../assets/images/orders.png'),
            navogateTo: 'Orders'
        },
        {
            itemId: 5,
            itemName: 'Account',
            icon: require('../../assets/images/account.png'),
            navogateTo: 'Account'
        }
    ]

    const handleSignout = () => {
        dispatch(signout())
    }

    return (
        <View style={{ padding: 10, marginVertical: 20, overflow: 'hidden' }}>
            {/* profile */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", borderBottomWidth: 1, borderColor: color.black }}
            onPress={()  => navigation.navigate('Account')}
             >
                <View style={{
                    backgroundColor: color.primaryBlue,
                    padding: 30,
                    borderRadius: 75 / 2,
                    width: 85, height: 85,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 20
                }}>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 25 }}>X</Text>
                </View>
                <View style={{ marginLeft: 18, width: 130 }}>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20,color:color.black }}>{FirstName} {LastName}</Text>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 15,color:color.black }}>{email}</Text>
                </View>
            </TouchableOpacity>
            {/* drawerContents */}
            <View>
                <View>
                    {content.map((item, index) => {
                        return (
                            <TouchableOpacity key={item.itemId}
                                onPress={() => navigation.navigate(item.navogateTo)}
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.icon} style={{ width: 30, height: 30, resizeMode: 'contain', marginVertical: 1 }} />
                                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, margin: 10,color:color.black }}>{item.itemName}</Text>
                                </View>
                                <Image source={require('../../assets/images/arrow1.jpg')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        )
                    })}

                </View>
            </View>
            {/* LOgout */}
            <View style={{ marginVertical: 20 }}>
                <TouchableOpacity
                    onPress={handleSignout}
                    style={{ backgroundColor: color.primaryBlue, borderWidth: 2, padding: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, }}>SignOut</Text>
                </TouchableOpacity>
            </View>

            {/* Contact */}

            <View>
                <View style={{ backgroundColor: color.primaryBlue, borderRadius: 15 }}>
                    <Text style={{ padding: 10 }}>Contact Support</Text>
                    <Text style={{ padding: 10 }}>if you have any problem with the app,feel free contact in 24 hour in our contact support</Text>
                    <View style={{ backgroundColor: color.primaryBlue, borderWidth: 2, padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginVertical: 5 }}>
                        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, }}>Contact</Text>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default CustomDrawer