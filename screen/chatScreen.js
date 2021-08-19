import React, { useState,useEffect } from "react";
import { useLayoutEffect } from "react";
import { TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ProfilePicture from "../components/ProfilePicture";
import { auth,db } from "../firebase";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Keyboard } from "react-native";
// import {  Avatar, Input } from 'react-native-elements'
// import { Button } from 'react-native-elements'

import * as firebase from "firebase"


const chatScreen = ({ navigation, route }) => {
  const [input, setinput] = useState("");
  const [Messages, setMessages] = useState([])
  const [roomimage, setroomimage] = useState('')
 

      useEffect( () => {
          const cleanup=()=>{
          db.collection('chats').doc(route.params.id).get()
      .then(snapshot => setroomimage(snapshot.data().chatRoomPic))
          }
         
       
        
           return  cleanup()
           
         },[])    

  // const[iter,setiter]=useState(1)
  // const [secretCode, setsecretCode] = useState('')
  // const [Code, setCode] = useState('')
//  useEffect(() => {
//   const cleanup=()=>{
//     db.collection('chats').doc(route.params.id).get()
//     .then(snapshot => setsecretCode(snapshot.data().passCode))
//   }
//   localStorage.setItem('display',false)
//    return cleanup()
   
//  },[] )


//   const chatsub=()=>{
//     if (Code===secretCode){
     
//       alert(localStorage.getItem('display'))
//       localStorage.setItem('display',true)
//       alert(localStorage.getItem('display'))
//       setsecretCode('')
//       setiter(iter+1)
//     }
//   }        

  const onSendMessage=()=>{
  
   Keyboard.dismiss()
   db.collection('chats').doc(route.params.id).collection('messages').add({
       timestamp: firebase.firestore.FieldValue.serverTimestamp( ),
       message:input,
       displayName:auth.currentUser.displayName,
       email:auth.currentUser.email,
       photoURL:auth.currentUser.photoURL, 
   })

   setinput('')
  }
  useLayoutEffect(() => {
   
    navigation.setOptions({
      title: route.params.chatName,
      headerTitleAlign: "left",
    
      headerTitle: () => (
        <View style={{ marginLeft: 10, flexDirection: "row", display: "flex" }}>
          <TouchableOpacity activeOpacity={0.5}>
           {
            
            roomimage ? 
            <ProfilePicture src={roomimage} />
            :
            <ProfilePicture src={Messages[0]?.data.photoURL} />
           }
          
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 10,
              color: "white",
            }}
          >
            {route.params.chatName}{" "}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign
            onPress={navigation.goBack}
            name="arrowleft"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation,Messages]);
  useLayoutEffect(()=>{
    const unsubscribe= db
    .collection('chats')
    .doc(route.params.id)
    .collection("messages")
    .orderBy("timestamp","desc")
    .onSnapshot((snapshot)=>setMessages(
        snapshot.docs.map((doc)=>({
            id:doc.id,
            data: doc.data(),
        }))))
        return unsubscribe
  },[route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
     {/* {
         (secretCode && iter==1 )|| !localStorage.getItem('display')?   <View style={styles.container}>
        
         <Input
         placeholder="Enter secret chatRoom code."
         type="password"
         secureTextEntry
         value={Code}
         onChangeText={(text)=>setCode(text)}
         leftIcon={
             <Icon name='lock' type="antdesign" size={24} color='white' />
         }
         onSubmitEditing={chatsub}
         />
         <Button style={styles.button} onPress={chatsub} type="solid" title="Create New Chat Room"/>
     </View>: */}
         <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>

    <>
          <ScrollView contentContainerStyle={{paddingTop:15}}>{
            Messages.map(({id,data})=>
              data.email !==auth.currentUser.email?

               ( 
               
               <View key={id} style={styles.reciever}>
               <View style={{position:'absolute',bottom:-15,left:-2}}>
                 <ProfilePicture   src={data.photoURL} />

                 </View>
                 
                  <Text style={styles.reciverText}>{data.message}</Text>
                  <Text style={styles.name}>{data.displayName}</Text>

                </View>
                
                )
              :
               (
               
              
               <View key={id} style={styles.sender}>
                 <View style={{position:'absolute',bottom:-15,right:-5}}>
                 <ProfilePicture   src={data.photoURL} />

                 </View>
               <Text style={styles.senderText}>{data.message}</Text>
               

                
                    
                
          
                
              </View>
              
           )
              
            )
            
            }</ScrollView>

          <View style={styles.footer}>
            <TextInput
              value={input}
              onChangeText={(text) => setinput(text)}
              onSubmitEditing={onSendMessage}
              placeholder="Signal Chat"
              style={styles.textInput}
            />

            <TouchableOpacity onPress={onSendMessage} activeOpacity={0.5}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
          </>
          </TouchableWithoutFeedback>
     {/* } */}
        
     
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default chatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  name:{
  fontSize:10,
  left:10,
  paddingRight:10,
  color:"white"
  },
  textInput: {
   
    bottom:0,
    height: 40,
    flex:1,
    backgroundColor:"#ECECEC",
    marginRight:15,
    padding:10,
    color:"grey",
    borderRadius:30
        
       
      },
  footer: {
    flexDirection: "row",
    alignItems: "center",

    width: "100%",
    padding: 15,
 
  },
  reciverText: {

  },
  senderText: {

  },
  reciever:{
    padding:15,
    backgroundColor:"rgb(133 201 216)",
    alignSelf:"flex-start",
    borderRadius:20,
    margin:15,
   
    maxWidth:"80%",
    position:"relative"
  },
  sender:{
    padding:15,
    backgroundColor:"#ECECEC",
    alignSelf:"flex-end",
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position:"relative"
  },


});
