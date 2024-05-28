import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import Style from "./style";
import color from "../../../../components/common/color";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { updatecatagories } from "../../../../storage/action";
import { useNavigation } from "@react-navigation/native";


const ShopCatagory = () => {

    const navigation = useNavigation()

    const [shopCatogory, setshopCatogoryItems] = useState([]);

    useEffect(() => {
        getshopCatogory();
    }, []);

    const dispatch = useDispatch()

    const getshopCatogory = async () => {
            try {
                const snapshot = await firestore().collection('Catagory').get();
                if (snapshot.empty) {
                    console.log('No categories found');
                } else {
                    const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Retrieve data from documents
                    setshopCatogoryItems(result);
                    dispatch(updatecatagories(result));
                }
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }        
    };

    const handleNavigate = (index) => {
        navigation.navigate('Catagories',{catIndex : index})
        console.log('//////////////////',index);
    }
    
   
    return (
        <View style={Style.container}>
            <Text style={Style.head}>Shop Categories</Text>
            <FlatList
                data={shopCatogory}
                numColumns={4}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={Style.flatlist}
                renderItem={({ item, index }) => {
                    const CatagorieColor = index % 4 === 0 ? color.yellow :
                     index % 4 === 1 ? color.orange :
                      index % 4 === 2 ? color.violet :
                       index % 4 === 3 ? color.lightGreen:color.yellow;
                    return (
                        <TouchableOpacity
                        onPress={() => handleNavigate(index)}
                        style={Style.innerView}> 
                            <View style={[Style.imageView,
                            {backgroundColor:CatagorieColor}
                            ]} >
                                <Image style={Style.image} source={{ uri: item.image }} />
                            </View>
                            <Text style={Style.itemName}>{item.head}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>

    )
}

export default ShopCatagory