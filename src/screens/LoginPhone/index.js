import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Style from "./style";
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import Snackbar from "react-native-snackbar";


const LoginPhone = () => {
    const [mobile, setMobile] = useState('')
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtpField] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [error, setError] = useState(null);



    const navigation = useNavigation()

    const handleSignInMobile = async () => {
        try {
            setError(null);
            const confirmation = await auth().signInWithPhoneNumber(mobile);
            if (confirmation) {
                Snackbar.show({
                    text: 'Verification Code Is Send,Please Verify',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.white,
                });
                setConfirm(confirmation);
                setShowOtpField(true);
            }
        } catch (error) {
            setError('Given phone number is incorrect.', error);
        }

    }

    const handleVerifyOtp = async () => {
        if (otp.trim() !== '' && validateOtp(otp.trim())) {
            const res = await confirm.confirm(otp.trim());
            if (res) {
                Snackbar.show({
                    text: 'Verification Is Success',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.white,
                });
                navigation.navigate('Home')
            }
        } else {
            setError('Given otp is incorrect.', error);
        }
    }

    const handleGoBackLogin = () => {
        navigation.goBack()
    }
    return (
        <View style={Style.container}>
            <Image source={require('../../assets/images/bg.webp')} style={Style.tobg} />
            <ScrollView style={Style.scrollView}>
                <Image source={require('../../assets/images/logo.png')} style={Style.logo} />
                <View>
                    <Text style={Style.loginText}>Login With Phone</Text>

                    <CustomTextInput type='Phone'
                        handleText={text => setMobile(text)}
                        placeholder="Phone Number"

                    />
                    {showOtp ? (
                        <CustomTextInput
                            type="phone"
                            handleText={text => setOtp(text)}
                            placeholder="Enter OTP"
                        />
                    ) : null}


                    <CustomButton ButtonText={showOtp ? 'Verify OTP' : 'Sign In With Phone'} type='primary' handleButton={showOtp ? handleVerifyOtp : handleSignInMobile} />

                    <Text style={Style.Create} onPress={handleGoBackLogin}>Go To Login</Text>


                </View>

            </ScrollView>

            <View style={Style.footer}>
                <Text >Login as a guest</Text>
            </View>

        </View>


    )
}

export default LoginPhone

