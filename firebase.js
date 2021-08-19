// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZR44XVVKH87Qw0LDQ3IPTC37LkArelY8",
  authDomain: "signal-clone-with-dm.firebaseapp.com",
  projectId: "signal-clone-with-dm",
  storageBucket: "signal-clone-with-dm.appspot.com",
  messagingSenderId: "622176703857",
  appId: "1:622176703857:web:9b7e2a5241daf4d78352d0",
  measurementId: "G-X9PREE9QE7",
};
let app;

const firebaseApp = firebase.initializeApp(firebaseConfig);
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export {db,auth}