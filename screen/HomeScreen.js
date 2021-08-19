import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "react-native-vector-icons";
import ProfilePicture from "../components/ProfilePicture";
import { StatusBar } from "expo-status-bar";
// import { TouchableOpacity } from "react-native-gesture-handler";
import Chatcomponent from "../components/Chatcomponent";
import { auth, db } from "../firebase";
const ChatScreen = ({ navigation }) => {
const [gchat, setgchat] = useState([])
useEffect(() => {
    const unsubscribe=db.collection("chats").onSnapshot((snapshot)=>
    setgchat(
      snapshot.docs.map(doc =>({
        id:doc.id,
        data:doc.data()
      })))
    
    )

    return unsubscribe;
   
}, [])


  const signOutUser= () => {
   auth.signOut().then(() =>{
       navigation.replace("Login")
   })
   
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal House",
      headerTitleStyle: { color: "black", justifyContent: "center" },
      headerTintColor: "black",
      headerLeft: () => (

       <View style={{marginLeft:10}}>
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}  >
          <ProfilePicture    src={auth?.currentUser?.photoURL} />
        </TouchableOpacity>

       </View>  
       
      ),
      headerCenter: () => (
        <TouchableOpacity  activeOpacity={0.5}>
          <ProfilePicture
            src={
              "data:image/png;base64,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"
            }
          />
        </TouchableOpacity>
      ),
      headerLeftContainerStyle: { marginLeft: 10 },
      headerStyle: { backgroundColor: "#fff" },
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
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons
              onPress={() => {
                navigation.navigate("Chat");
              }}
              name="pencil"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
 

  const enterChat= (id,chatName)=>{
    navigation.navigate('Chatscreen',{
      id,
      chatName,
    })
  }
  return (
    <SafeAreaView>
      <ScrollView  style={styles.container}>
        {
          gchat.map(({id,data:{chatName}})=>(
        <Chatcomponent key={id} id={id} chatName={chatName} enterChat={enterChat} />
            
           ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
  height: '100%',

    // backgroundColor:'#fff'
  },
});
