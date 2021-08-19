import React,{useState,} from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from "expo-status-bar";
import {Button, Image, Input} from 'react-native-elements'
import {auth} from '../firebase';
import { useEffect } from 'react';


const LoginScreen = ({ navigation }) => {
    const [email, setemail] = useState("")
const [password, setpassword] = useState("")

useEffect(() => {
 const cleaner = auth.onAuthStateChanged((authUser) => {

    if(authUser){
        navigation.replace('Home')

    }
             
    }) 
  return cleaner
}, [])
const SignIn= ()=>{
   auth.signInWithEmailAndPassword(email,password)
   .catch(err => alert(err))


}
const Register= ()=>{
    
}
    return (
        <KeyboardAvoidingView  behavior={Platform.OS === 'android' ? 'height':'padding'} style={styles.container}>
            <StatusBar style="light"/>
            {/* <Text> Hey Buddy! I am Login Screen </Text> */}

           
            <Image source={require('./../assets/android.png')}

             style={{width:100, height:100}} />

            <View style={styles.inputcontainer}>
            <Input
            placeholder="Email"
            autoFocus
            value={email}
            type="email"
            onChangeText={(text)=>setemail(text)}
            />
            <Input
            placeholder="Password"
            value={password}
            type="password"
            secureTextEntry
            onSubmitEditing={SignIn}
            onChangeText={(text)=>setpassword(text)}
        
            />
             </View>
            <Button containerStyle={styles.button} onPress={SignIn} title="Login"/>
            <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')}  type="outline" title="Register"/>

             <View style={{height:50}}/>
           
            
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor:'#fff'
 
    },
    inputcontainer:{
width:300
    },
    button:{
 width:200,
 marginTop:10
    }
})


