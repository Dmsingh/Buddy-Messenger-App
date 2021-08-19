import { NavigationHelpersContext } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {  Input } from 'react-native-elements/'
import { Button } from 'react-native-elements'
import { db ,auth} from '../firebase'

import Icon from 'react-native-vector-icons/FontAwesome'
import { useLayoutEffect } from 'react'

const AddChatScreen = ({navigation,route}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Add new group chat",
            // headerBackTitle:" Chats"
        })
     
    }, [navigation])
    const [chat, setchat] = useState("")
    const [passCode, setpassCode] = useState("")
    const [chatRoomPic, setchatRoomPic] = useState(auth.currentUser.photoURL)
    const [chatRoom, setchatRoom] = useState()



    const chatsub= async()=>{
    await db
          .collection("chats")
          .add({chatName: chat,passCode: passCode,chatRoomPic:chatRoomPic})
          .then(()=>{navigation.goBack()})
          .catch(err=>alert(err))
       
    }
    
    return (
        <View style={styles.container}>
            <Input
            placeholder="Enter your chatName"
            value={chat}
            onChangeText={(text)=>setchat(text)}
            leftIcon={
                <Icon name='wechat' type="antdesign" size={24} color='black' />
                
            }
         
            />
            {/* <Input
            placeholder="Enter your secret passcode. Don't share this passcode with !stranger"
            value={passCode}
            type="password"
            secureTextEntry
            onChangeText={(text)=>setpassCode(text)}
            leftIcon={
                <Icon name='lock' type="antdesign" size={24} color='black' />
            }
          
            /> */}
              <Input
            placeholder="Enter  imageUrl() for chat room. "
            value={chatRoom}
            onChangeText={(text)=>{setchatRoom(text); setchatRoomPic(text)}}
            leftIcon={
                <Icon name='photo' type="antdesign" size={24} color='black' />
            }
            onSubmitEditing={chatsub}
            />
            <Button disabled={!chat} style={styles.button} onPress={chatsub} type="solid" title="Create New Chat Room"/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        padding:30,
        backgroundColor:'#fff',
        height:'100%'
    },
  
})
