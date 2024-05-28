import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, Modal, ScrollView } from "react-native";
import Style from "./style";
import { useNavigation } from "@react-navigation/native";
import CommonHederLeft from "../../components/commonHedaerLeft";
import Snackbar from "react-native-snackbar";
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";
import color from "../../components/common/color";
import { validateEmail, validatePhoneNumber } from "./controller";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../storage/action";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uploadImage from "../../components/common/storage";



const Account = () => {
    const navigation = useNavigation()

    const userId = useSelector((state) => state.userId);
    const cartCount = useSelector((state) => state.cartCount);
    const email = useSelector((state) => state.email);
    const mobilenumber = useSelector((state) => state.mobilenumber);
    const FirstName = useSelector((state) => state.FirstName);
    const LastName = useSelector((state) => state.LastName);


    const [model, setModel] = useState(false)
    const [FName, setFirstName] = useState(FirstName)
    const [LName, setLastName] = useState(LastName)
    const [Email, setEmail] = useState(email)
    const [Mobile, setMobile] = useState(mobilenumber)

    const dispatch = useDispatch()

    useEffect(() => {

        navigation.setOptions({
            headerLeft: () => <CommonHederLeft />,
        })

    }, []);

    const handleImage = () => {
        setModel(!model)
    }
    const handleEdit = () => {
        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 400,
        // }).then(image => {
        //     console.log(image);
        // });

    }

    const handleUpdateProfile = async () => {

        if (Mobile === '' || !validatePhoneNumber(Mobile.trim())) {
            Snackbar.show({
                text: 'Given Phone Number Is Not Valid',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: color.white,
            });
            return;
        }

        if (email === '' || !validateEmail(email.trim())) {
            Snackbar.show({
                text: 'Given Email Is Not Valid',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: color.white,
            });
            return;
        }

        if (FirstName === '' || LastName === '') {
            Snackbar.show({
                text: 'Given Name Is Not Correct',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: color.white,
            });
            return;
        }

        try {
            await firestore().collection('User').doc(userId).update({
                FirstName: FName,
                LastName: LName,
                email: Email,
                mobilenumber: Mobile
            });

            dispatch(updateProfile({
                FirstName: FName,
                LastName: LName,
                email: Email,
                mobilenumber: Mobile
            }));

            Snackbar.show({
                text: 'Profile updated successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'green',
                textColor: color.white,
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            Snackbar.show({
                text: 'Failed to update profile. Please try again later.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
                textColor: color.white,
            });
        }

    };



    return (
        <View style={Style.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={Style.head}>{FirstName} {LastName}</Text>
                <View style={Style.imageView}>
                    <TouchableOpacity onPress={handleImage}>
                        <Image style={Style.image1} source={require('../../assets/images/user.jpg')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                    //  onPress={handleEdit} 
                    >
                        <Image style={Style.edit} source={require('../../assets/images/edit.png')} />
                    </TouchableOpacity>
                </View>
                <CustomTextInput type='name'
                    value={FName}
                    handleText={text => setFirstName(text)}
                    placeholder="First Name"
                />
                <CustomTextInput type='name'
                    value={LName}

                    handleText={text => setLastName(text)}
                    placeholder="Last Name"
                />
                <CustomTextInput type='email'
                    value={Email}
                    handleText={text => setEmail(text)}
                    placeholder="email"
                />
                <CustomTextInput type='Phone'
                    value={Mobile}
                    handleText={text => setMobile(text)}
                    placeholder="Phone Number"
                />
                <CustomButton type='secondary'
                    handleButton={handleUpdateProfile}
                    ButtonText={'Update Profile'}
                />

                <Modal visible={model} onRequestClose={() => setModel(false)} transparent>
                    <View style={Style.modeBack}>
                        <TouchableOpacity onPress={() => setModel(false)}>
                            <Text style={{ color: color.white, fontSize: 30, fontWeight: 'bold' }}>Close</Text>
                        </TouchableOpacity>

                        <Image style={Style.bigimage} source={require('../../assets/images/user.jpg')} />
                    </View>
                </Modal>

            </ScrollView>

        </View>
    )

}

export default Account