import React, { useState } from "react";
import { Button, Text, TextInput, View ,TouchableOpacity} from "react-native"; // Import View component
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// Define your screens or components to be used within the stack navigator



const Waw = () => {

    const  [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handle = () => {
       if(username === 'shajeeh' && password === '123'){
        console.log('success');
       }else{
        console.log('invalid');
       }
    }
    return (
        <View style={{marginTop:10}}>
            <TextInput style={{backgroundColor:'red',padding:15,margin:10,fontSize:30}} placeholder="username" onChangeText={text=> setUsername(text)} value={username} />
            <TextInput style={{backgroundColor:'red',padding:15,margin:10,fontSize:30}} placeholder="password" onChangeText={text => setPassword(text)} value={password} />

           <TouchableOpacity onPress={handle}>
            <Text>Submit</Text>
           </TouchableOpacity>
        </View>
    )
}

export default Waw;
