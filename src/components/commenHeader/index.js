import React, { useState } from "react";
import {  Image, Text, TouchableOpacity, View } from "react-native";
import Style from "./style";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = () => {
    const navigation = useNavigation()

    return (
        <View style={Style.container}>
            <TouchableOpacity onPress={()=> navigation.toggleDrawer()}>
            <Image source={require('../../assets/images/drawer.png')} style={Style.drawerImage} />
            </TouchableOpacity>
         <Image source={require('../../assets/images/logo.png')} style={Style.logo} />
        </View>


    )
}

export default CustomHeader