



///////////////////////////////////////////////////////////////////////////////

// / eslint-disable react/no - unstable - nested - components /
//     / eslint-disable react/react -in -jsx - scope /
import { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Image,
} from 'react-native';
import style from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Snackbar from 'react-native-snackbar';
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import CommonHederLeft from '../../components/commonHedaerLeft';
import { updatecartCount } from '../../storage/action';
import { useDimensionContext } from '../../context';
import color from '../../components/common/color';
import CommnButton from '../../components/commonButton';

const AddAddress = () => {
    const dimensions = useDimensionContext();
    const route = useRoute();
    const navigation = useNavigation();
    const { cartProducts, total } = route.params;
    const responsiveStyle = style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait,
    );
    const [newPosition, setNewPosition] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);
    const email = useSelector((state) => state.email);
    const mobilenumber = useSelector((state) => state.mobilenumber);
    const FirstName = useSelector((state) => state.FirstName);
    const LastName = useSelector((state) => state.LastName);


    const dispatch = useDispatch();

    useEffect(() => {
        getCurrentLocation();
        navigation.setOptions({
            headerLeft: () => <CommonHederLeft type={'back'} />,
        });
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(info => {
            setNewPosition({
                latitude: info.coords?.latitude ?? 0,
                longitude: info.coords?.longitude ?? 0,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            });
            setAddress(null);
        });
        Snackbar.show({
            text: 'Current location is fetched',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: color.primaryGreen,
            textColor: color.white,
        });
    };

    const handleCreateOrder = async paymentID => {
        const smallId = paymentID.slice(4, 12);
        await firestore()
            .collection('Orders')
            .add({
                orderId: String(smallId).toUpperCase(),
                created: Date.now(),
                updated: Date.now(),
                orderStatus: 'Ordered',
                totalAmount: total,
                address: address,
                userId: userId,
                paymentMethod: 'online',
                cartItems: cartProducts,
                userName: FirstName + ' ' + LastName,
                userEmail: email,
                userPhone: mobilenumber,
                expDelDate: '',
            })
            .then(async resp => {
                await firestore()
                    .collection('Cart')
                    .where('userId', '==', userId)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            doc.ref
                                .delete()
                                .then(() => {
                                    setLoading(false);
                                    dispatch(updatecartCount(0));
                                    Snackbar.show({
                                        text: 'Your Order is successfully Placed.',
                                        duration: Snackbar.LENGTH_SHORT,
                                        backgroundColor: color.primaryGreen,
                                        textColor: color.white,
                                    });
                                    setTimeout(() => {
                                        navigation.goBack();
                                    }, 2000);
                                })
                                .catch(err => {
                                    console.warn(err);
                                });
                        });
                    });
            });
    };

    const onButtonPress = () => {
        var options = {
            description: 'Inkart Products purchase',
            // image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            //   key: 'rzp_test_CXo5HbmQ83IYL0',
            key: 'rzp_test_OURUZl3RVlJwwa',
            amount: parseInt(total, 10) * 100,
            name: 'Inkart',
            prefill: {
                email: email,
                contact: mobilenumber,
                name: `${FirstName} ${LastName}`,
            },
            theme: { color: color.primaryBlue },
        };
        RazorpayCheckout.open(options)
            .then(data => {
                setLoading(true);
                handleCreateOrder(data.razorpay_payment_id);
            })
            .catch(error => {
                Snackbar.show({
                    text: 'Your Order is Failed.',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: color.red,
                    textColor: color.white,
                });
                navigation.goBack();
            });
    };

    console.log(newPosition);
    console.log(address);


    return (
        <View style={responsiveStyle.container}>
            <Modal animationType="fade" transparent={true} visible={loading}>
                <View
                    style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator size={'large'} color={color.white} />
                </View>
            </Modal>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}>
                <GooglePlacesAutocomplete
                    placeholder="Search Location"
                    currentLocation={true}
                    fetchDetails={true}
                    currentLocationLabel="Current Location"
                    query={{
                        key: 'AIzaSyBxr99617iBz0j-ao6GzTTl_Kq0TuvZwg4',
                        language: 'en',
                    }}
                    styles={{
                        textInput: responsiveStyle.textInput,
                        predefinedPlacesDescription: responsiveStyle.description,
                    }}
                    onPress={(data, details) => {
                        console.warn(data, details);
                        const location =
                            data?.geometry?.location ?? details?.geometry?.location;
                        const positionData = {
                            latitude: location?.lat ?? 0,
                            longitude: location?.lng ?? 0,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                        };
                        setNewPosition(positionData);
                        setAddress(data?.name ?? data?.description);
                    }}
                />

                {newPosition && (
                    <MapView
                        style={responsiveStyle.mapView}
                        initialRegion={newPosition}
                        region={newPosition}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={true}
                        scrollEnabled={true}
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton={true}>
                        {address && (
                            <Marker
                                title={address ?? ''}
                                description="This is your marker"
                                coordinate={newPosition}
                            />
                        )}
                    </MapView>
                )}

                {address && (
                    <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
                        <Text
                            style={{
                                color: color.black,
                                fontFamily: 'Lato-Regular',
                                fontSize: 18,
                            }}>
                            {address}
                        </Text>
                    </View>
                )}
                <TouchableOpacity
                    style={responsiveStyle.TouchView}
                    onPress={getCurrentLocation}>
                    <View style={responsiveStyle.iconView}>
                        <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/location.png')} />
                    </View>
                    <Text style={responsiveStyle.touchText}>Your Current Location</Text>
                </TouchableOpacity>


                <CommnButton
                    buttonText={'Confirm location & Proceed'}
                    onButtonPress={onButtonPress}
                />
            </ScrollView>
        </View>
    );
};

export default AddAddress;
