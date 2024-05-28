import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Style from "./style";
import { useNavigation } from "@react-navigation/native";
import color from "../common/color";

// const CustomSearch = props => {
const CustomSearch = ({ filter, placeholder, mic = true, onChangeText }) => {

    // const { filter, placeholder, mic = true, onChangeText = {} } = { ...props }
    const navigation = useNavigation()

    return (
        <View style={[filter ? Style.container1 : Style.container]}>
            <View style={[filter ? Style.search1 : Style.search]} >
                <Image style={Style.icon} source={require('../../assets/images/search1.png')} />
                <TextInput
                    placeholder={placeholder ? placeholder : "Text Here"}
                    placeholderTextColor={color.white}
                    style={Style.textInput}
                    onChangeText={text => onChangeText(text)}
                />
                {mic ? (<Image style={Style.icon} source={require('../../assets/images/mic.png')} />) : null}
            </View>
            {filter ? <Text style={Style.filter}>Filter</Text> : null}
        </View>


    )
}

export default CustomSearch