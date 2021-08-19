import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Image} from 'react-native-elements'

const ProfilePicture = ({src}) => {

    return (
      
    
        <Image source={{uri:src} } style={styles.img}/>
       
    )
}

export default ProfilePicture



const styles = StyleSheet.create({
img:{
    width: 30,
     
            height:30 ,
   
    borderRadius:100,
}
})
