import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import Style from "./style";
import firestore from '@react-native-firebase/firestore';
import color from "../../../../components/common/color";
import { useSelector } from "react-redux";



const Trending = () => {

    // const [catagories, setcatagoriesItems] = useState([]);

    // const {catagories} = useSelector(state => state)
    const catagories = useSelector((state) => state.catagories);

   

    return (
        <View style={Style.main}>
            <Text style={Style.title}>Trending Catagory</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={Style.flatlist}
                data={catagories}
                renderItem={({ item, index }) => {
                    const CatagorieColor = index % 4 === 0 ? color.yellow :
                    index % 4 === 1 ? color.orange :
                        index % 4 === 2 ? color.violet :
                            index % 4 === 3 ? color.lightGreen : color.yellow;
                    return (
                        <View style={[Style.imageView,{backgroundColor:CatagorieColor}]}>
                            <Image source={{ uri: item.image }} style={Style.image} />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Trending