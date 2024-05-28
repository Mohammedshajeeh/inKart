import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/customButton";
import CustomTextInput from "../../components/customTextInput";
import { useDimensionContext } from "../../context";
import { login } from "../../storage/action";
import color from "../../components/common/color";

const Login = () => {
  const dimensions = useDimensionContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight
  );

  function onAuthStateChanged(user) {
    console.warn(user, "authenticated user");
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleGoToSignUp = () => {
    navigation.navigate("signUp");
  };

  const handleGoToLoginPhone = () => {
    navigation.navigate("LoginPhone");
  };

  const handleLogin = async () => {
    if (email.trim() !== "" && password.trim() !== "") {
      await firestore()
        .collection("User")
        .where("email", "==", email.trim())
        .get()
        .then(async (snapShot) => {
          if (snapShot.empty) {
            Snackbar.show({
              text: "This email is not registered. Please create a new account.",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.red,
              textColor: color.white,
            });
          } else {
            snapShot.forEach((documentSnapshot) => {
              const respData = documentSnapshot.data();
              if (password.trim() === respData.password && respData?.active) {
                Snackbar.show({
                  text: "Login Successful",
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: color.primaryGreen,
                });
                dispatch(
                  login({
                    userId: documentSnapshot.id,
                    FirstName: respData.FirstName,
                    LastName: respData.LastName,
                    email: respData.email,
                    mobilenumber: respData.mobilenumber,
                  })
                );
              } else {
                Snackbar.show({
                  text: "The password you entered is wrong.",
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: color.red,
                });
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      Snackbar.show({
        text: "Fill up the fields to continue..",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.red,
      });
    }
  };

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require("../../assets/images/bg.webp")}
        style={responsiveStyle.topBg}
      />
      <ScrollView
        style={responsiveStyle.scrollview}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={responsiveStyle.logo}
        />
        <Text style={responsiveStyle.loginText}>Login Account</Text>

        <CustomTextInput
          type="email"
          handleText={(text) => setEmail(text)}
          placeholder="Email Address"
        />
        <CustomTextInput
          type="password"
          handleText={(text) => setPassword(text)}
          placeholder="Password"
        />

        <CustomButton
          type="primary"
          handleButton={handleLogin}
          ButtonText={"Sign In"}
        />

        <Text onPress={handleGoToSignUp} style={responsiveStyle.createNew}>
          If you are new, Create Here
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={responsiveStyle.dashedLine} />
          <View>
            <Text style={responsiveStyle.dashedText}>Or Login with</Text>
          </View>
          <View style={responsiveStyle.dashedLine} />
        </View>

        <CustomButton
          type="primary"
          handleButton={handleGoToLoginPhone}
          ButtonText={"Sign In with Phone"}
          icon={require('../../assets/images/smartphone.png')}
        />
        <CustomButton
          type="primary"
          handleButton={() => { }}
          ButtonText={"Sign In with Google"}
          icon={require("../../assets/images/google.png")}
        />
      </ScrollView>
      <View style={responsiveStyle.footer}>
        <Text style={responsiveStyle.footerText}>Login as a Guest</Text>
      </View>
    </View>
  );
};

export default Login;
