// import React, { useEffect, useRef } from "react";
// import { ScrollView, Text, View } from "react-native";
// import Style from "./style";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import CustomHeader from "../../components/commenHeader";
// import CustomSearch from "../../components/CustomSearch";
// import Banner from "../../components/banner";
// import RecentyBought from "./components/recentlyBought";
// import ShopCatagory from "./components/shopCatogory";
// import ProductScroll from "../../components/productScroll";
// import OfferProducts from "../../components/offerProducts";
// import color from "../../components/common/color";
// import firestore from '@react-native-firebase/firestore';
// import { useDispatch, useSelector } from "react-redux";
// import { updateWishId } from "../../storage/action";

// const Home = () => {
//     const navigation = useNavigation();
//     const userId = useSelector((state) => state.userId);
//     const dispatch = useDispatch();
//     const scrollRef = useRef(null)
//     const isFocused = useIsFocused()

//     useEffect(() => {
//         scrollRef.current.scrollTo({ y: 0, animated: true })
//     }, [isFocused])

//     useEffect(() => {
//         getToWishlist();
//     }, [userId]);  // Add userId as a dependency to fetch wishlist when userId changes

   
//     const getToWishlist = async () => {
//         await firestore()
//             .collection('Wishlist')
//             .where('userId', '==', userId)
//             .get()
//             .then(snapshot => {
//                 if (snapshot.empty) {
//                     dispatch(updateWishId([]));
//                 } else {
//                     const idArray = []
//                     snapshot?.docs.forEach(document => {
//                         idArray.push(document?.data().prodId)
//                     })
//                     dispatch(updateWishId(idArray));
//                 }
//             })
//     };

//     return (
//         <View>
//             <CustomHeader />
//             <ScrollView
//                 ref={scrollRef}
//                 showsVerticalScrollIndicator={false}>
//                 <CustomSearch />
//                 <Banner />
//                 <RecentyBought />
//                 <ShopCatagory />
//                 <ProductScroll />
//                 <OfferProducts />
//                 <Text style={{ fontFamily: 'Lato-Bold', fontSize: 25, padding: 15 }}>Did't find another content</Text>
//                 <View style={{ backgroundColor: color.primaryBlue, padding: 15, width: '40%', justifyContent: 'center', alignItems: 'center', marginBottom: 90, marginLeft: 15 }}>
//                     <Text style={{ color: color.white }}>Browse Catagory</Text>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// }

// export default Home;


import React, { useEffect, useRef } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import Style from "./style";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/commenHeader";
import CustomSearch from "../../components/CustomSearch";
import Banner from "../../components/banner";
import RecentyBought from "./components/recentlyBought";
import ShopCatagory from "./components/shopCatogory";
import ProductScroll from "../../components/productScroll";
import OfferProducts from "../../components/offerProducts";
import color from "../../components/common/color";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { updateWishId } from "../../storage/action";

const Home = () => {
    const navigation = useNavigation();
    const userId = useSelector((state) => state.userId);
    const dispatch = useDispatch();
    const scrollRef = useRef(null)
    const isFocused = useIsFocused()

    // useEffect(() => {
    //     scrollRef.current.scrollTo({ y: 0, animated: true })
    // }, [isFocused])

    useEffect(() => {
        getToWishlist();
    }, [userId]);  // Add userId as a dependency to fetch wishlist when userId changes

    const getToWishlist = async () => {
        await firestore()
            .collection('Wishlist')
            .where('userId', '==', userId)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    dispatch(updateWishId([]));
                } else {
                    const idArray = []
                    snapshot?.docs.forEach(document => {
                        idArray.push(document?.data().prodId)
                    })
                    dispatch(updateWishId(idArray));
                }
            })
    };

    const renderContent = () => {
        return (
            <View>
                <CustomSearch />
                <Banner />
                <RecentyBought />
                <ShopCatagory />
                <ProductScroll />
                <OfferProducts />
                <Text style={{ fontFamily: 'Lato-Bold', fontSize: 25, padding: 15 }}>Did't find another content</Text>
                <View style={{ backgroundColor: color.primaryBlue, padding: 15, width: '40%', justifyContent: 'center', alignItems: 'center', marginBottom: 90, marginLeft: 15 }}>
                    <Text style={{ color: color.white }}>Browse Category</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader />
            <FlatList
                ref={scrollRef}
                ListHeaderComponent={renderContent}
                data={[]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={null}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default Home;
