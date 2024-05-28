import { Image, View } from "react-native";

const Splash = () => {

    return (
        <View style={{ justifyContent: 'center', alignItems: "center",flex:1 }}>
            <Image style={{ width: 70, height: 70, alignSelf: 'center',resizeMode:'contain' }} source={require('../../assets/images/logo.png')} />
        </View>
    )
}

export default Splash