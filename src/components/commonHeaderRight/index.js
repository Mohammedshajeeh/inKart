import React from "react";
import { Image, Share, Text, TouchableOpacity, View } from "react-native";
import Style from "./style";
import color from "../common/color";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CommonHederRight = props => {
    const navigation = useNavigation()

    const cartCount = useSelector((state) => state.cartCount);

    const handleRight = async (type) => {
        if (type === 'cart') {
            navigation.navigate('Cart')
        } else if (type === 'share') {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }

        };
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            {props.share ? (
                <TouchableOpacity onPress={() => handleRight('share')} style={{ position: 'relative', right: 15, top: 10 }}>
                    <Image source={require('../../assets/images/share.png')} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
                </TouchableOpacity>
            ) : null}
            {props.plus ? (
                <TouchableOpacity onPress={props.handlePlusIcon} style={{ position: 'relative', right: 15, top: 10 }}>
                    <Image source={require('../../assets/images/plus.png')} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
                </TouchableOpacity>
            ) : null}
            {props.cart ? (
                <TouchableOpacity onPress={() => handleRight('cart')}>

                    <View style={{ position: 'relative', right: 20 }}>
                        <Text style={[Style.Text, { backgroundColor: color.secondryGreen, padding: 3, borderRadius: 45, color: color.white, textAlign: 'center', }]}>{cartCount}</Text>
                    </View>
                    <Image source={require('../../assets/images/cart1.png')} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
                </TouchableOpacity>
            ) : null}

        </View>
    )
}



export default CommonHederRight