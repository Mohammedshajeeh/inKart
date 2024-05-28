import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import Style from "./style";
import color from "../common/color";
import { useNavigation } from "@react-navigation/native";

const CommonHederLeft = props => {
    const navigation = useNavigation()

    const handleLeft = () => {
        if (props.type === 'back') {
            if(props.action){
                props.action()
            }else{
                navigation.goBack()
            }
        } else {
            navigation.toggleDrawer()
        }
    }
    return (
        <TouchableOpacity style={{ padding: 15 }}
            onPress={handleLeft}
        >
            <Image source={
                props.type === 'back' ?
                    require('../../assets/images/arrowLeft.png')
                    : require('../../assets/images/drawer.png')


            }
                style={{ width: 35, height: 35, resizeMode: "contain" }} />
        </TouchableOpacity>
    )
}


export default CommonHederLeft