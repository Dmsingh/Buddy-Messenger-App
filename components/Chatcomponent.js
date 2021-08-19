import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet,View,  } from 'react-native'
import { Text,ListItem } from 'react-native-elements'
import { auth,db } from "../firebase";
import ProfilePicture from './ProfilePicture'


const Chatcomponent = ({chatName,id,enterChat}) => {
    const [Messages, setMessages] = useState([])
    useLayoutEffect(()=>{
        const unsubscribe= db
        .collection('chats')
        .doc(id)
        .collection("messages")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>setMessages(
            snapshot.docs.map((doc)=>({
              
                data: doc.data(),
            }))))
            return unsubscribe
      })
    
    return (
        <ListItem onPress={()=>enterChat(id,chatName)} key={id}  bottomDivider>
 
               
                    <ProfilePicture src= {Messages[0]?.data.photoURL || 'data:image/png;base64,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'}  />

            

               
            
            <ListItem.Content >
                <ListItem.Title style={{fontWeight:'bold'}} >
                
                {chatName}
                </ListItem.Title>
             <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
             {Messages?.[0]?.data.displayName}: {Messages?.[0]?.data.message}
             </ListItem.Subtitle>

               </ListItem.Content>
            
        
        </ListItem>
       
    )
}

export default Chatcomponent

const styles = StyleSheet.create({
 
  
})
