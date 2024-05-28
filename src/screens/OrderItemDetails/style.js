// import { StyleSheet, Dimensions } from "react-native";
// import color from "../../components/common/color";


// const { width, height } = Dimensions.get('screen')
// const Style = StyleSheet.create({
//     container: {
//         height:height,
//         backgroundColor:color.white_level3
//     },
  
// })

// export default Style

import { StyleSheet } from "react-native";
import color from "../../components/common/color";

const Style = StyleSheet.create({
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderHeader: {
        backgroundColor: color.primaryGreen,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    orderImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    orderDetails: {
        marginLeft: 15,
    },
    orderIdText: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: color.white,
    },
    orderStatusText: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: color.white,
    },
    itemsSection: {
        marginVertical: 15,
    },
    sectionTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: color.primaryGreen,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    quantityBox: {
        backgroundColor: color.primaryGreen,
        padding: 15,
        borderRadius: 15,
    },
    quantityText: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.white,
    },
    itemDetails: {
        width: '50%',
        overflow: 'hidden',
    },
    itemName: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.primaryGreen,
    },
    itemPrice: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.primaryGreen,
    },
    paymentDetailsSection: {
        marginVertical: 15,
    },
    paymentDetailsRow: {
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    paymentDetailText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: color.black,
        lineHeight: 35,
    },
    discountText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: color.red,
        lineHeight: 35,
    },
    paymentDetailAmounts: {
        alignItems: 'flex-end',
    },
    totalAmountRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalAmountText: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: color.black,
        lineHeight: 25,
    },
    addressSection: {
        marginVertical: 15,
    },
    addressText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: color.black,
        lineHeight: 35,
    },
    paymentMethodSection: {
        marginVertical: 15,
    },
    paymentMethodRow: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    paymentMethodImage: {
        width: 45,
        height: 55,
        resizeMode: 'contain',
    },
    paymentMethodDetails: {
        marginLeft: 15,
    },
    paymentMethodText: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: color.black,
        lineHeight: 25,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 15,
        backgroundColor: color.white,
    },
});

export default Style;
