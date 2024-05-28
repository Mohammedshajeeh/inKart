// // ///////////////////////////////////////////////////////////////////////////////



// import React, { useEffect, useState } from "react";
// import { Image, ScrollView, Text, View } from "react-native";
// import Style from "./style";
// import CustomTextInput from "../../components/customTextInput";
// import CustomButton from "../../components/customButton";
// import { useNavigation } from "@react-navigation/native";
// import firestore from '@react-native-firebase/firestore';
// import { ValidateEmail, validateMobileNumber } from "../../components/common/validation";
// import Snackbar from "react-native-snackbar";
// import color from "../../components/common/color";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";



// const SignUp = () => {
//     const [userName, setUserName] = useState('')
//     const [email, setEmail] = useState('')
//     const [mobile, setMobile] = useState('')
//     const [password, setPassword] = useState('')
//     const [cpassword, setCpassword] = useState('')
//     const [FirstName, setFirstName] = useState('')
//     const [LastName, setLastName] = useState('')
//     const [error, setError] = useState('')

//     const navigation = useNavigation()

//     useEffect(() => {
//         GoogleSignin.configure({
//             webClientId: '899212642637-ve42so29bl52kc03i59mt46i7lp9rorp.apps.googleusercontent.com',
//         });
//     }, [])

//     const handleButton = async () => {
//         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
//     }

//     const handleGoBackLogin = () => {
//         navigation.goBack()
//     }

//     //////////////////////////////////////////////////////
//     const handleSignup = async () => {
//         try {
//             if (
//                 userName.trim() !== '' &&
//                 FirstName.trim() !== '' &&
//                 LastName.trim() !== '' &&
//                 email.trim() !== '' &&
//                 mobile.trim() !== '' && // Add missing !== '' here
//                 password.trim() !== '' && // Add missing !== '' here
//                 cpassword.trim() !== '' // Add missing !== '' here
//             ) {
//                 if (password.trim() === cpassword.trim()) {
//                     await firestore()
//                         .collection('User')
//                         .where('username', '==', userName.trim())
//                         .where('email', '==', email.trim())
//                         .get()
//                         .then(async snapShot => {
//                             if (snapShot.empty) {
//                                 if (ValidateEmail(email.trim())) {
//                                     if (validateMobileNumber(mobile.trim())) {
//                                         const userData = {
//                                             active: true,
//                                             FirstName: FirstName.trim(),
//                                             LastName: LastName.trim(),
//                                             username: userName.trim(),
//                                             email: email.trim(),
//                                             mobilenumber: mobile.trim(),
//                                             password: password.trim(),
//                                             created: String(new Date()),
//                                             updated: String(new Date()),
//                                         };


//                                         await firestore()
//                                             .collection('User')
//                                             .add(userData)
//                                             .then(res => {
//                                                 console.log(res);
//                                                 Snackbar.show({
//                                                     text: 'A New Account Is Created',
//                                                     duration: Snackbar.LENGTH_LONG,
//                                                     backgroundColor: color.primaryGreen,
//                                                     textColor: color.white,
//                                                 });
//                                                 navigation.navigate('Home')
//                                             })
//                                             .catch((error) => {
//                                                 console.log(error);
//                                             });
//                                     } else {
//                                         setError('Please Fill 10 digits Number');
//                                     }
//                                 } else {
//                                     setError('Your Email is InValid');
//                                 }
//                             } else {
//                                 Snackbar.show({
//                                     text: 'This Email Is Already Existing,Please Try Another Email',
//                                     duration: Snackbar.LENGTH_LONG,
//                                     backgroundColor: 'red',
//                                     textColor: color.white,
//                                 });
//                             }
//                         });
//                 } else {
//                     setError('Given Passwords Do Not Match');
//                 }
//             } else {
//                 setError('Please Fill Up All Fields');
//             }
//         } catch (error) {
//             console.log(error);
//         }

//     };

//     return (
//         <View style={Style.container}>
//             <Image source={require('../../assets/images/bg.webp')} style={Style.tobg} />
//             <ScrollView style={Style.scrollView}>
//                 <Image source={require('../../assets/images/logo.png')} style={Style.logo} />
//                 <View>
//                     <Text style={Style.loginText}>SignUp</Text>

//                     {error !== null ? (
//                         <View>
//                             <Text style={Style.errorText}>{error}</Text>
//                         </View>
//                     ) : null}

//                     <CustomTextInput type='name'
//                         handleText={text => setUserName(text)}
//                         placeholder="username"
//                     />
//                     <CustomTextInput type='name'
//                         handleText={text => setFirstName(text)}
//                         placeholder="first name"
//                     />
//                     <CustomTextInput type='name'
//                         handleText={text => setLastName(text)}
//                         placeholder="last name"
//                     />
//                     <CustomTextInput type='email'
//                         handleText={text => setEmail(text)}
//                         placeholder="email"
//                     />

//                     <CustomTextInput type='Phone'
//                         handleText={text => setMobile(text)}
//                         placeholder="Phone Number"
//                     />
//                     <CustomTextInput type='password'
//                         handleText={text => setPassword(text)}
//                         placeholder="password"
//                     />
//                     <CustomTextInput type='password'
//                         handleText={text => setCpassword(text)}
//                         placeholder="conform password"
//                     />

//                     <CustomButton ButtonText='SignUp' type='primary' handleButton={() => handleSignup()} />


//                     <View style={Style.containerr}>
//                         <View style={Style.dashedLine} />
//                         <Text style={Style.text}>or Sign up With</Text>
//                         <View style={Style.dashedLine} />
//                     </View>

//                     <CustomButton ButtonText='Sign Up With Google' type='secondary'
//                         handleButton={() => handleButton()}
//                         icon={require('../../assets/images/google.png')} />


//                     <Text style={Style.Create} onPress={handleGoBackLogin}>Go To Login</Text>


//                 </View>

//             </ScrollView>

//         </View>


//     )
// }

// export default SignUp

import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Style from "./style";
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import Snackbar from "react-native-snackbar";
import color from "../../components/common/color";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ValidateEmail, validateMobileNumber } from "../../components/common/validation";

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '899212642637-ve42so29bl52kc03i59mt46i7lp9rorp.apps.googleusercontent.com',
        });
    }, []);

    const handleButton = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    };

    const handleGoBackLogin = () => {
        navigation.goBack();
    };

    const handleSignup = async () => {
        setError(''); // Clear any previous errors
        console.log("Signup process started");

        if (userName.trim() && email.trim() && mobile.trim() && password.trim() && cpassword.trim()  && firstName.trim()  && lastName.trim()) {
            console.log("All fields are filled");

            if (password.trim() === cpassword.trim()) {
                console.log("Passwords match");

                try {
                    const userSnapshot = await firestore()
                        .collection('User')
                        .where('username', '==', userName.trim())
                        .where('email', '==', email.trim())
                        .get();

                    if (userSnapshot.empty) {
                        console.log("No existing user found");

                        if (ValidateEmail(email.trim())) {
                            console.log("Email is valid");

                            if (validateMobileNumber(mobile.trim())) {
                                console.log("Mobile number is valid");

                                const userData = {
                                    active: true,
                                    username: userName.trim(),
                                    FirstName:firstName.trim(),
                                    LasttName:lastName.trim(),
                                    email: email.trim(),
                                    mobilenumber: mobile.trim(),
                                    password: password.trim(),
                                    created: String(new Date()),
                                    updated: String(new Date()),
                                };

                                await firestore().collection('User').add(userData);

                                Snackbar.show({
                                    text: 'A New Account Is Created',
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor: color.primaryGreen,
                                    textColor: color.white,
                                });
                                navigation.navigate('Home');
                            } else {
                                setError('Please Fill 10 digits Number');
                            }
                        } else {
                            setError('Your Email is Invalid');
                        }
                    } else {
                        Snackbar.show({
                            text: 'This Email Is Already Existing, Please Try Another Email',
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: 'red',
                            textColor: color.white,
                        });
                    }
                } catch (error) {
                    console.error("Error adding document: ", error);
                    setError('Error adding document');
                }
            } else {
                setError('Given Passwords Do Not Match');
            }
        } else {
            setError('Please Fill Up All Fields');
        }
    };

    return (
        <View style={Style.container}>
            <Image source={require('../../assets/images/bg.webp')} style={Style.tobg} />
            <ScrollView style={Style.scrollView}>
                <Image source={require('../../assets/images/logo.png')} style={Style.logo} />
                <View>
                    <Text style={Style.loginText}>SignUp</Text>

                    {error !== '' && (
                        <View>
                            <Text style={Style.errorText}>{error}</Text>
                        </View>
                    )}

                    <CustomTextInput
                        type="name"
                        handleText={text => setUserName(text)}
                        placeholder="first Name"
                    />
                    <CustomTextInput
                        type="name"
                        handleText={text => setFirstName(text)}
                        placeholder="last Name"
                    />
                    <CustomTextInput
                        type="name"
                        handleText={text => setLastName(text)}
                        placeholder="Username"
                    />
                    <CustomTextInput
                        type="email"
                        handleText={text => setEmail(text)}
                        placeholder="Email"
                    />
                    <CustomTextInput
                        type="phone"
                        handleText={text => setMobile(text)}
                        placeholder="Phone Number"
                    />
                    <CustomTextInput
                        type="password"
                        handleText={text => setPassword(text)}
                        placeholder="Password"
                    />
                    <CustomTextInput
                        type="password"
                        handleText={text => setCpassword(text)}
                        placeholder="Confirm Password"
                    />

                    <CustomButton ButtonText="SignUp" type="primary" handleButton={handleSignup} />

                    <View style={Style.containerr}>
                        <View style={Style.dashedLine} />
                        <Text style={Style.text}>or Sign up With</Text>
                        <View style={Style.dashedLine} />
                    </View>

                    <CustomButton
                        ButtonText="Sign Up With Google"
                        type="secondary"
                        handleButton={handleButton}
                        icon={require('../../assets/images/google.png')}
                    />

                    <Text style={Style.Create} onPress={handleGoBackLogin}>
                        Go To Login
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default SignUp;
