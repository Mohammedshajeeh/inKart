import { Text, View } from "react-native"
import color from "../../../components/common/color"
import CustomTextInput from "../../../components/customTextInput"


const DeliveryInfo = () => {
    return (
        <View>
            <Text style={{ fontFamily: 'Lato-Bold', fontSize: 22, color: color.black ,lineHeight:30 }}>Check Delivery</Text>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: color.shadow,lineHeight:30  }}>Enter PinCode Check Delivery Date/Pickup Option</Text>
            <CustomTextInput type={'default'} handleText={() => console.log('hi')} placeholder={'PinCode'} check={true} />
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: color.shadow,lineHeight:30 }}>Free Delivery On Order Above 200</Text>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: color.shadow,lineHeight:30 }}>Cash On Delivery Available</Text>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: color.shadow,lineHeight:30 }}>Easy 21 Days Return And Exchange</Text>

        </View>
    )
}

export default DeliveryInfo