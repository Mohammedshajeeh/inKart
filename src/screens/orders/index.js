import React, { useEffect, useId, useState } from "react";
import { TouchableOpacity, View, Text, Image, FlatList } from "react-native";
import Style from "./style";
import { useNavigation } from "@react-navigation/native";
import CustomSearch from "../../components/CustomSearch";
import color from "../../components/common/color";
import firestore from '@react-native-firebase/firestore';
import CommonHederLeft from "../../components/commonHedaerLeft";
import { useSelector } from "react-redux";
import CommonHederRight from "../../components/commonHeaderRight";

const Orders = () => {
    const navigation = useNavigation()
    const [ordersItem, setOrdersitem] = useState([])
    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);



    useEffect(() => {
        getOrders()
        navigation.setOptions({
            headerLeft: () => <CommonHederLeft />,
            headerRight: () => <CommonHederRight cart={true} />,

        })

    }, []);

    const getOrders = async () => {
        try {
            const snapshot = await firestore().collection('Orders').where('userId', '==', userId).get();
            if (snapshot.empty) {
                setOrdersitem([]);
            } else {
                const ordersArray = snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
                setOrdersitem(ordersArray);
            }
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    };

    const handleSearch = async text => {
        await firestore()
        .collection('Orders')
        .where('userId','==',userId)
        .orderBy('orderId')
        .startAt(String(text))
        .endAt(String(text) + '\uf8ff')
        .get()
        .then(snapshot => {
            if(snapshot.empty){
                setOrdersitem([])
            }else{
                const onjArray = []
                snapshot?.docs.forEach(document => {
                    if(document.exists){
                        const result = { id: document.id, ...document.data() }
                        onjArray.push(result)
                    }
                })
                setOrdersitem(onjArray);
            }
        })
    }

    const handleProducts = item => {
            navigation.navigate('OrderItemDetails', { item: item })
    }
    return (
        <View>
            < CustomSearch filter={true}
                placeholder={'serach using orderId'}
                mic={false}
                onChangeText={handleSearch}
            />
            <FlatList
                data={ordersItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 30 }}>
                        <Text style={{ fontFamily: 'Lato-Black', color: color.black, fontSize: 25 }}>
                            Orders is empty
                        </Text>
                        <TouchableOpacity>
                            <Text>Go to Home</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={()=> handleProducts(item)} style={{
                            backgroundColor: color.white_level3,
                            padding: 15,
                            borderRadius: 15,
                            overflow: 'hidden',
                            margin: 15
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: color.black,
                                paddingBottom: 15
                            }}>
                                <View>
                                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: color.black, lineHeight: 20 }}>{item.orderId}</Text>
                                    <Text style={{ fontFamily: 'Lato-Regular', color: color.primaryGreen, lineHeight: 20, fontSize: 15 }}>order on : {item.created}</Text>
                                    <Text style={{ fontFamily: 'Lato-Regular', lineHeight: 20, fontSize: 15 }}>{item.address} </Text>
                                    <Text >paid : <Text style={{ fontFamily: 'Lato-Regular', color: color.primaryGreen, lineHeight: 20, fontSize: 15 }}>{item.totalAmount}</Text> items : <Text style={{ fontFamily: 'Lato-Regular', color: color.primaryGreen, lineHeight: 20, fontSize: 15 }}>{item.cartItems.length}</Text></Text>
                                </View>
                                <View>
                                    <Image source={require('../../assets/images/map.png')} style={Style.image} />
                                </View>
                            </View>
                            {/* //////////// */}

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: 25
                            }}>
                                <Text style={{ fontFamily: 'Lato-Regular', lineHeight: 20, fontSize: 15 }}>Order Shipped</Text>
                                <Text style={{ fontFamily: 'Lato-Regular', lineHeight: 20, fontSize: 15 }}>Rtae & Review Products</Text>



                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    )
}

export default Orders
