import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Style from "./style";
import color from "../common/color";

const CustomTextInput = props => {
    const { type, handleText, placeholder, value, check = false } = props
    const [show, setShow] = useState(false)
    const keyboardType = type === 'email' ? 'email-address' : type === 'password' ? 'default' : type === 'Phone' ? 'phone-pad' : 'default'
    const secureTextEntry = type === 'password' ? (show ? false : true) : false
    const icon = type === 'email' ? require('../../assets/images/email.png') : type === 'password' ? show ? require('../../assets/images/view.png') : require('../../assets/images/hide.png') : false
    const handlePassword = () => {
        setShow(!show)
    }
    return (
        // <View style={Style.container}>
        <View style={Style.container}>
            <TextInput placeholder={placeholder} placeholderTextColor={color.grey}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                style={Style.textInput}
                selectionColor={color.lightGreen}
                onChangeText={handleText}
                value={value}
            />

            <TouchableOpacity onPress={handlePassword} disabled={type !== 'password' ? true : false}>
                {!icon ? null : (
                    <Image style={Style.icon} source={icon} />
                )}
                {check ? (
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 18, color: color.primaryGreen, justifyContent: 'flex-end' }}>
                        Check
                    </Text>
                ) : null}
            </TouchableOpacity>

        </View>
    )
}

export default CustomTextInput