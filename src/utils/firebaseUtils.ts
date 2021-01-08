import firebase from "firebase";

const config = firebase.initializeApp({
  apiKey: "AIzaSyD4bOryWUU0jmtMvP5_2-iml0bk3mhsIzg",
  authDomain: "orizonquestions.firebaseapp.com",
  databaseURL: "https://orizonquestions-default-rtdb.firebaseio.com/",
  projectId: "orizonquestions",
  storageBucket: "orizonquestions.appspot.com",
  messagingSenderId: "833005171059",
  appId: "1:833005171059:web:5b7d45f04e1baaac1c9506",
  measurementId: "G-7DWWBE3PBT",
});

const db = config.firestore();

export default db;
