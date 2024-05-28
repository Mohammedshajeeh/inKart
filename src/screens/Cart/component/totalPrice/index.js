import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Style from "./style";
import color from "../../../../components/common/color";


const Total = props => {

    const { total, charges } = props

    useEffect(() => {
        console.log('Total:', total);
        console.log('Charges:', charges);
    }, [total, charges]);

    return (
        <View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1 }}>
                <View>
                    <Text style={{ fontSize: 22, fontFamily: 'Lato-Bold', fontWeight: 'bold', lineHeight: 30 }}>Order Details</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Black', lineHeight: 30 }}>Bag Total</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Black', lineHeight: 30 }}>Bag Savings</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Black', lineHeight: 30 }}>Coupon Discount</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Black', lineHeight: 30 }}>Delivery</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text></Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Black', lineHeight: 30 }}>₹50.00</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Black', lineHeight: 30, color: color.lightGreen }}>₹0.00</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Black', lineHeight: 30, color: color.red }}>Apply Coupon</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Black', lineHeight: 30 }}>₹{parseFloat(charges).toFixed(2)}</Text>

                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 15, }}>
                <View>
                    <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold', fontWeight: 'bold', lineHeight: 30 }}>Total</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontFamily: 'Lato-Bold', fontWeight: 'bold', lineHeight: 30 }}>₹{parseFloat(charges + total).toFixed(2)}</Text>
                </View>
            </View>

        </View>





    )
}

export default Total