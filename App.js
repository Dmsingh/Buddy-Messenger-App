import React from "react";
import { StyleSheet} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator, } from '@react-navigation/stack'
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import HomeScreen from "./screen/HomeScreen";
import AddChatScreen from "./screen/AddChatScreen";
import chatScreen from "./screen/chatScreen";



const Stack= createStackNavigator()

const glbscreen={
  headerStyle:{backgroundColor:'#2090EA'},
  headerTitleStyle:{ color:'white'},
  headerTintColor:"white",
  headerTitleAlign:'center',


}

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={glbscreen}>
      <Stack.Screen name='Login'  component={LoginScreen}/>
      <Stack.Screen name='Register'  component={RegisterScreen}/>
      <Stack.Screen name='Home'  component={HomeScreen}/>
      <Stack.Screen name="Chat" component={AddChatScreen}/>
      <Stack.Screen name="Chatscreen" component={chatScreen}/>




      </Stack.Navigator>
     
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
