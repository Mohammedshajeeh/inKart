import React from "react";
import { Image, Text, TouchableOpacity,View } from "react-native";
import Style from "./style";
import color from "../common/color";

const CommnButton = props => {
    return(
        <TouchableOpacity onPress={props.onButtonPress} style={Style.Button}>
            <Text style={Style.Text}>{props.buttonText}</Text>
        </TouchableOpacity>
    )
}


export default CommnButton