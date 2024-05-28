import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login";
import SignUp from "../signUp";
import LoginPhone from "../LoginPhone";
import Home from "../Home";
import { DimensionContextProvider } from "../../context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Catagories from "../Catagories";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "../Cart";
import CustomDrawer from "../../components/CustomDrawer";
import CustomFooter from "../../components/CustomFooter";
import Search from "../Search";
import Wishlist from "../Wishlist";
import Offers from "../Offers";
import Account from "../accounts";
import Orders from "../orders";
import { Provider, useSelector } from "react-redux";
import { store } from "../../storage/store";
import Splash from "../Splash";
import Products from "../Products";
import ProductDetails from "../productDetails";
import Review from "../review";
import AddAddress from "../AddAddress";
import OrderItemDetails from "../OrderItemDetails";

const Drawer = createDrawerNavigator()

const AppDrawer = () => {
    const navigation = useNavigation()
    return (
        <Drawer.Navigator
            initialRouteName="AppFooter"
            drawerContent={() => <CustomDrawer />}
            screenOptions={{
                headerTitleAlign: 'left',
                headerTitleStyle: { fontFamily: 'Lato-Bold', fontSize: 30 }
            }}
        >
            <Drawer.Screen name='AppFooter' component={AppFooter} options={{ headerShown: false }} />
            <Drawer.Screen name='Catagories' component={Catagories} />
            <Drawer.Screen name='Cart' component={Cart} />
            <Drawer.Screen name='Wishlist' component={Wishlist} />
            <Drawer.Screen name='Account' component={Account} />
            <Drawer.Screen name='Orders' component={Orders} />
            <Drawer.Screen name='Products' component={Products} />
            <Drawer.Screen name='ProductDetails' component={ProductDetails} />
            <Drawer.Screen name='Review' component={Review} />
            <Drawer.Screen name='AddAddress' component={AddAddress} />
            <Drawer.Screen name='OrderItemDetails' component={OrderItemDetails} />
        </Drawer.Navigator>
    )
}

const Footer = createBottomTabNavigator()

const AppFooter = () => {
    return (
        <Footer.Navigator
            tabBar={props => <CustomFooter {...props} />}
            screenOptions={{
                // headerLeft: () => {
                //     return (
                //         <TouchableOpacity style={{ padding: 15 }}>
                //             <Image source={require('../../assets/images/arrowLeft.png')}
                //                 style={{ width: 30, height: 30, resizeMode: "contain" }} />
                //         </TouchableOpacity>
                //     )
                // },
                headerTitleAlign: 'left',
                headerTitleStyle: { fontFamily: 'Lato-Bold', fontSize: 30 }
            }}
        >
            <Footer.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Footer.Screen name='Catagories' component={Catagories} />
            <Footer.Screen name='Search' component={Search} />
            <Footer.Screen name='Offers' component={Offers} />
            <Drawer.Screen name='Cart' component={Cart} />


        </Footer.Navigator>
    )
}

const AppStack = createNativeStackNavigator();


const AppNavigation = () => {

    const [loading, setLoading] = useState(true)
    // const { isLoggedIN } = useSelector(state => state)
    const isLoggedIN = useSelector((state) => state.isLoggedIN);

    console.log('isLogged', isLoggedIN);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);

    }, [isLoggedIN])

    return (

        <DimensionContextProvider>
            <NavigationContainer>
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    {loading ? (
                        <AppStack.Screen name="Splash" component={Splash} />
                    ) : (
                        <>
                            {isLoggedIN ? (
                                <AppStack.Screen name="AppDrawer" component={AppDrawer} />
                            ) : (
                                <>
                                    {/* <AppStack.Screen name='Home' component={Home} options={{ headerShown: false }} /> */}
                                    <AppStack.Screen name='Login' component={Login} />
                                    <AppStack.Screen name='signUp' component={SignUp} />
                                    <AppStack.Screen name='LoginPhone' component={LoginPhone} />
                                </>
                            )}
                        </>
                    )}

                </AppStack.Navigator>
            </NavigationContainer>
        </DimensionContextProvider>
    );
}

const App = () => {
    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    )
}

export default App;
