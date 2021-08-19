import React, { useState,useLayoutEffect } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet,  View } from 'react-native'
import {Button, Input,Text} from 'react-native-elements'
import { StatusBar } from "expo-status-bar";
// const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
import {auth} from '../firebase';
const Register = ({navigation}) => {
    const [fullname, setfullname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [imgurl, setimgurl] = useState("")
    // const [cpass, setcpass] = useState("")
 

    const register=()=>{
      
     auth
     .createUserWithEmailAndPassword(email, password)
     .then((authUser) => {
        
         authUser.user.updateProfile({
             displayName:fullname,
             photoURL: imgurl || "https://example.com/jane-q-user/profile.jpg"
         })
     }).catch((err) => {
        alert(err.message) 
     });
    //   alert(Platform.OS)  
      navigation.navigate('Login')
    }
useLayoutEffect(() => {
    navigation.setOptions({
         title:`Register Here`,
      
        

    })

 
 
}, [navigation])
    return (
        // <ScrollView style = {{flex:1, backgroundColor: 'white',}} useref = 'scroll'>
        <KeyboardAvoidingView behavior={!Platform.OS === 'android' ? 'padding':'height'} style={styles.container}>
     

        <StatusBar style="light"/>

        <Text h3 style={{marginBottom:40}} >
        Create a Signal account

        </Text>

           <View style={styles.inputcontainer}>
           <Input   placeholder="Full Name" type="text" autoFocus  value={fullname} onChangeText={(text)=>setfullname(text)} />
           <Input   placeholder=" Email Id" type= "email"   value={email}   onChangeText={(text)=>setemail(text)} />
           <Input   secureTextEntry placeholder="Password" type= "password"  value={password}   onChangeText={(text)=>setpassword(text)} />
           {/* <Input   secureTextEntry placeholder="Confirm Password" type= "password"   value={cpass}  onChangeText={(text)=>setcpass(text)} /> */}
           <Input  placeholder="Enter Image Url() Optional" type="text"  value={imgurl} onChangeText={(text)=>setimgurl(text)} 
           onSubmitEditing={register} />
           </View>
           <Button raised containerStyle={styles.button} onPress={() => register()}  title="Register Here"/>
           <View style={{height:80}}/>
        </KeyboardAvoidingView>
        // </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:"white",
    
        },
        inputcontainer:{
    width:300
        },
        button:{
     width:200,
     marginTop:10
        }
})
