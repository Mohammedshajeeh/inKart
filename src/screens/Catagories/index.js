import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, ScrollView, FlatList, Image, ImageBackground } from "react-native";
import Style from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomHeader from "../../components/commenHeader";
import CustomFooter from "../../components/CustomFooter";
import CustomSearch from "../../components/CustomSearch";
import firestore from '@react-native-firebase/firestore';
import color from "../../components/common/color";
import CommonHederLeft from "../../components/commonHedaerLeft";


const Catagories = () => {
    const navigation = useNavigation()
    const [catagories, setcatagoriesItems] = useState([]);
    const [active, setActive] = useState(0);
    const [productScroll, setproductScrolltems] = useState([]);
    const route = useRoute()

    const { catIndex = 0 } = route?.params??{}

    useEffect(()=>{
        setActive(catIndex)
    },[catIndex])

    const handleCatagory = index => {
        setActive(index)
    }

    useEffect(() => {
        getcatagories();
        getproductScroll();

        navigation.setOptions({
            headerLeft: () => <CommonHederLeft />,
        })

    }, []);

    const getcatagories = async () => {
        try {
            const snapshot = await firestore().collection('Catagory').get();
            if (snapshot.empty) {
                console.log('No banners found');
            } else {
                const result = snapshot.docs.map(doc => doc.data()); // Retrieve data from documents
                setcatagoriesItems(result);
                setActive(0)
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    };

    const getproductScroll = async () => {
        try {
            const snapshot = await firestore().collection('Products').get();
            if (snapshot.empty) {
                console.log('No banners found');
            } else {
                const result = snapshot.docs.map(doc => doc.data()); // Retrieve data from documents
                setproductScrolltems(result);
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    };

    const handleProducts = (item) => {
        navigation.navigate('ProductDetails', { product: item })
    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}>
                <CustomSearch />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {/* sidbar */}
                    <View>
                        <FlatList
                            data={catagories}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => String(index)}
                            contentContainerStyle={Style.flatlist}
                            renderItem={({ item, index }) => {
                                return (

                                    <TouchableOpacity style={[Style.touch, { backgroundColor: index === active ? color.white : 'transparent' }]}
                                        onPress={() => handleCatagory(index)}
                                    >
                                        <Image style={Style.image} source={{ uri: item.image }} />
                                    </TouchableOpacity>

                                )
                            }}
                        />
                    </View>
                    {/* content */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <ImageBackground
                            source={require('../../assets/images/mufc.webp')}
                            style={Style.clickImage}
                        >
                            <Text style={{ color: color.white, fontSize: 22, fontWeight: 'bold', padding: 13 }}>{catagories[active]?.head}</Text>
                        </ImageBackground>


                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={productScroll}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                                const CatagorieColor = index % 4 === 0 ? color.yellow :
                                    index % 4 === 1 ? color.orange :
                                        index % 4 === 2 ? color.violet :
                                            index % 4 === 3 ? color.lightGreen : color.yellow;
                                return (
                                    <TouchableOpacity
                                        onPress={() => handleProducts(item)}
                                        style={Style.flatListItem}>
                                        <View>
                                            <View style={[Style.imageView, { backgroundColor: CatagorieColor }]}>
                                                <Image source={{ uri: item.image }} style={Style.underbgImage} />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={[Style.text, { fontSize: 22 }]}>{item.head}</Text>
                                            <Text style={Style.text}>{item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>

    )
}

export default Catagories